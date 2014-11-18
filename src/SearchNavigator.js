if (!r) var r = {};

r.SearchNavigator = function(rootElement, searchField, crawler) {
    this.rootElement = rootElement;
    this.searchField = searchField;
    this.crawler = crawler;

    this.interactables = [];
    this.target = 0;
};

r.SearchNavigator.prototype.next = function () {

};

r.SearchNavigator.prototype.previous = function () {

};

r.SearchNavigator.prototype.execute = function() {

};

r.SearchNavigator.prototype.search = function () {
    var search = this.searchField.getSearchString();
    this.interactables = this.crawler.search(search);
    this.searchField.setResultCount(this.interactables.length);
};

r.SearchNavigator.prototype.open = function () {
    this.rootElement.classList.add('r-navigating');
};

r.SearchNavigator.prototype.close = function () {
    this.rootElement.classList.remove('r-navigating');
};