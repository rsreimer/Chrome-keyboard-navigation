if (!r) var r = {};

r.SearchNavigator = function(rootElement, searchField, crawler) {
    this.rootElement = rootElement;
    this.searchField = searchField;
    this.crawler = crawler;

    this.candidates = [];
    this.target = 0;
};

r.SearchNavigator.prototype.next = function () {
    this.moveTarget(1);
};

r.SearchNavigator.prototype.previous = function () {
    this.moveTarget(-1);
};

r.SearchNavigator.prototype.moveTarget = function (amount) {
    var newTarget = this.target + amount;
    newTarget = newTarget % this.candidates.length;
    if (newTarget < 0) newTarget += this.candidates.length;

    this.setTarget(newTarget);
};

r.SearchNavigator.prototype.execute = function() {
    this.candidates[this.target].execute();
    this.close();
};

r.SearchNavigator.prototype.setTarget = function (target) {
    if (this.target < this.candidates.length)
        this.candidates[this.target].element.classList.remove('r-target');

    this.target = target;
    this.searchField.setTarget(target);
    this.candidates[this.target].element.classList.add('r-target');
    this.candidates[this.target].moveTo();
};

r.SearchNavigator.prototype.setCandidates = function (candidates) {
    this.hideCandidates();
    this.candidates = candidates;
    this.showCandidates();
};

r.SearchNavigator.prototype.showCandidates = function () {
    this.candidates.forEach(function (candidate) {
        candidate.element.classList.add('r-candidate');
    });
};

r.SearchNavigator.prototype.hideCandidates = function () {
    this.candidates.forEach(function (candidate) {
        candidate.element.classList.remove('r-candidate');
        candidate.element.classList.remove('r-target');
    });
};

r.SearchNavigator.prototype.search = function () {
    var search = this.searchField.getSearchString();
    var candidates = this.crawler.search(search);
    if (candidates.length == 0) return;

    this.setCandidates(candidates);
    this.searchField.setResultCount(this.candidates.length);

    var target = 0, highest = 0;

    this.candidates.forEach(function(candidate, i) {
        if (candidate.relevance <= highest) return;

        highest = candidate.relevance;
        target = i;
    });

    this.setTarget(target);

    if (this.candidates.length == 1) this.execute();
};

r.SearchNavigator.prototype.open = function () {
    this.crawler.cacheInteractables();
    this.rootElement.classList.add('r-navigating');
    this.searchField.open();
};

r.SearchNavigator.prototype.close = function () {
    this.rootElement.classList.remove('r-navigating');
    this.hideCandidates();
    this.searchField.close();
};