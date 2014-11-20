if (!r) var r = {};

r.Interactable = function(element) {
    this.element = element;
    this.relevance = 0;
};

r.Interactable.prototype.moveTo = function () {
    var elementTop = this.element.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
    var clientHeight = window.innerHeight;
    var elementHeight = this.element.offsetHeight;

    var top = elementTop - clientHeight/2 + elementHeight/2;
    if (top < 0) top = 0;

    window.scrollTo(0, top);
};

r.Interactable.prototype.isInViewport = function() {
    var rect = this.element.getBoundingClientRect();

    return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

r.Interactable.prototype.getDepth = function() {
    var depth = 0;
    var element = this.element;

    do {
        element = element.parentNode;
        depth++;
    }
    while(element.nodeName != "BODY");

    return depth;
};

r.Interactable.prototype.isHidden = function () {
    return window.getComputedStyle(this.element).display === 'none' || this.element.disabled;
};

r.Interactable.prototype.getContextInfo = function (level) {
    level = level || 0;

    var element = this.element;

    for (var i = 0; i < level; i++) {
        element = element.parentNode;
    }

    var properties = ["innerText", "placeholder", "value", "id", "className", "title", "name", "tagName"];
    var context = [];

    for(var i = 0; i < properties.length; i++) {
        var value = element[properties[i]];

        if (value) context.push(value);
    }

    return context.join(" ").toLowerCase();
};

r.Interactable.prototype.findRelevance = function (search) {
    // Get context of element and elements parent
    var contextInfo = this.getContextInfo()+ ' ' + this.getContextInfo(1);

    this.relevance = 0;

    // Relevance is zero if element is hidden
    if (this.isHidden()) return;

    // Relevance is zero if search string is not in context
    var searchOffset = contextInfo.indexOf(search.toLowerCase());
    if (searchOffset == -1) return;


    // Rate elements in viewport higher
    if (this.isInViewport()) this.relevance += 10000;

    // Look for how good search fits contextinfo.
    this.relevance += 1000 - searchOffset;

    // Rate elements after depth in DOM tree
    this.relevance += 10 - this.getDepth();
};