if (!r) var r = {};

r.SearchNavigator = function(rootElement, searchField, crawler) {
    this.rootElement = rootElement;
    this.searchField = searchField;
    this.crawler = crawler;

    this.candidates = [];
    this.target = 0;
};

r.SearchNavigator.prototype.next = function () {

};

r.SearchNavigator.prototype.previous = function () {

};

r.SearchNavigator.prototype.execute = function() {
    this.candidates[this.target].execute();
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
    });
};

r.SearchNavigator.prototype.search = function () {
    var search = this.searchField.getSearchString();
    this.setCandidates(this.crawler.search(search));

    if (this.candidates.length == 1) this.execute();

    this.searchField.setResultCount(this.candidates.length);
};

r.SearchNavigator.prototype.open = function () {
    this.rootElement.classList.add('r-navigating');
    this.searchField.focus();
};

r.SearchNavigator.prototype.close = function () {
    this.rootElement.classList.remove('r-navigating');
};