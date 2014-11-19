if (!r) var r = {};

r.Interactable = function(element) {
    this.element = element;
    this.relevance = 0;
};

r.Interactable.prototype.moveTo = function () {
    /*var top =  $(element).offset().top - $( window ).height() / 2 - $(element).height() / 2;
    if (top < 0) top = 0;

    $(window).scrollTop(top);*/
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

r.Interactable.prototype.isVisible = function () {
    return 1; // TODO Is the element visible? Look for css (display: none;)
};

r.Interactable.prototype.contextMatchesSearch = function (search) {
    // TODO Look for how parent elements match
    // TODO Any text that starts/ends with search should be rated higher
    return this.element.innerText.toLowerCase().indexOf(search.toLowerCase()) > -1;
};

r.Interactable.prototype.findRelevance = function (search) {
    this.relevance = 0;

    // TODO Use context value in relevance value.
    if (!this.contextMatchesSearch(search)) return;

    // Rate elements in viewport higher
    if (this.isInViewport()) this.relevance += 100;

    // Rate elements after depth in DOM tree
    this.relevance += 10 - this.getDepth();
};