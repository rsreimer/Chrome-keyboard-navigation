function isElementInViewport (element) {
    var rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getElementDepth (element) {
	var depth = 0;
	
	do {
		element = element.parentNode;
		depth++;
	}
	while(element.nodeName != "BODY")

	return depth;
}

function ActionElement (element) {
	this.rating = 0;

	this.setCandidate = function () {
		$(element).addClass('candidate');
	}

	this.removeCandidate = function () {
		$(element).removeClass('candidate');
		$(element).removeClass('primary');
	}

	this.setPrimary = function () {
		$(element).addClass('candidate');
		$(element).addClass('primary');
	}

	this.removePrimary = function () {
		$(element).removeClass('primary');
	}

	this.getIdentifier = function () {
		if (element.tagName == "A")
			return element.innerText;	
	}

	this.execute = function () {
		if (element.tagName == "A")
			window.location.href = element.href;
	}

	this.moveTo = function () {
		var top =  $(element).offset().top - $( window ).height() / 2 - $(element).height() / 2;
		if (top < 0) top = 0;

		$(window).scrollTop(top);
	}

	this.calcRating = function () {
		this.rating = 0;

		if (!this.isCandidate()) return;

		// Rate elements in viewport higher
		if (isElementInViewport(element)) this.rating += 1000;

		// Rate elements after depth in DOM tree
		this.rating += 100 - getElementDepth(element);

		// TODO: Rate element for how good target fits
	}

	this.isCandidate = function () {
		var hasClass = $(element).hasClass('candidate');
		return $(element).hasClass('candidate');
	}

	this.isPrimary = function () {
		return $(element).hasClass('primary');
	}

	this.handle = function (target) {
		var isCandidate = this.getIdentifier().toLowerCase().indexOf(target.toLowerCase()) > -1;
		
		if (isCandidate) {
			this.setCandidate();
		} else {
			this.removeCandidate();
		}

		this.calcRating();
	}
}

function navigationService(actionElements) {
	var active = false,
		mode = "",
		primary = 0;

	this.candidates = [];

	this.close = function () {
		active = false;

		$(this.candidates).each(function (index, candidate) {
			candidate.removeCandidate();
		});
	}

	this.execute = function(element) {
		this.candidates[primary].execute();
	}

	this.navigate = function () {
		active = true;
		mode = "navigate";
	}

	this.open = function () {
		active = true;
		mode = "open";
	}

	this.isActive = function () {
		return active;
	}

	this.removePrimary = function () {
		if (this.candidates[primary])
			this.candidates[primary].removePrimary();
	}

	this.setPrimary = function (newPrimary) {
		this.removePrimary();
		primary = newPrimary;
		this.candidates[primary].setPrimary();
		this.candidates[primary].moveTo();
	}

	this.movePrimary = function (amount) {
		var newPrimary = primary + amount;		
		newPrimary = newPrimary % this.candidates.length;
		if (newPrimary < 0) newPrimary += this.candidates.length;

		this.setPrimary(newPrimary);		
	}

	this.findBestPrimary = function () {
		var max = 0;
		var value = 0;

		this.candidates.each(function (key, candidate) {
			if (candidate.rating <= value) return;

			max = key;
			value = candidate.rating;
		})

		return max;
	}

	this.handle = function (target) {
		if (!this.isActive() || target == "") return;

		this.removePrimary();

		actionElements.each(function (index, actionElement) {
			actionElement.handle(target);
		});

		this.candidates = actionElements.filter(function (key, actionElement) {
			return actionElement.isCandidate()
		});

		this.setPrimary(this.findBestPrimary());

		if (this.candidates.length == 1)
			this.execute();
	}
}

$(document).ready(function () {
	$('body').append('<div id="keyboard-nav"><input><span></span></div>');

	// All visible links, buttons, checkbox, radio
	var actionElements = $('a').map(function (key, element) {
		return new ActionElement(element);
	});

	var Navigation = new navigationService(actionElements);

	var control = $('#keyboard-nav');
	var input = $(control.find('input')[0]);
	var statusbar = $(control.find('span')[0]);

	$(document).keydown(function (e) {
		// Alt + Q
		if (e.keyCode == 81 && e.altKey) {
			if (document.activeElement.tagName.toLowerCase() != "body") return;

			Navigation.navigate();
			control.show(0, function () { input.focus() });
		}

		// Esc
		else if (e.keyCode == 27) {
			Navigation.close();
			control.hide();
			input.val("");
		}
	});

	input.keydown(function (e) {
		// Arrow up
		if (e.keyCode == 38) {
			Navigation.movePrimary(-1);
			e.preventDefault();
		}

		// Arrow down
		else if (e.keyCode == 40) {
			Navigation.movePrimary(1);
			e.preventDefault();
		}

		// Enter
		else if (e.keyCode == 13) {
			Navigation.execute();
			e.preventDefault();
		}
	});

	input.on('input', function () {
		Navigation.handle(input.val());
		statusbar.html(Navigation.candidates.length);
	});
});