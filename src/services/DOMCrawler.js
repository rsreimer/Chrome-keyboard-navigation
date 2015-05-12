if (!r) var r = {};

r.DOMCrawler = function (rootElement) {
    this.rootElement = rootElement;

    this.interactables = [];

    this.mappings = [
        ['a, button', r.Clickable],
        ['audio, video', r.Playable],
        ['input, select, textarea', r.Focusable]
    ];
};

// Caches interactable elements.
// Uses selector and constructor function pairs to select and map DOM elements into new objects.
r.DOMCrawler.prototype.cacheInteractables = function () {
    this.interactables = [];

    for (var i = 0; i < this.mappings.length; i++) {
        var selector = this.mappings[i][0];
        var constructor = this.mappings[i][1];

        var nodeList = this.rootElement.querySelectorAll(selector);

        for (var j = 0; j < nodeList.length; j++) {
            if (nodeList[j].id === "r-search-input") continue;

            this.interactables.push(new constructor(nodeList[j]));
        }
    }
};

// Returns interactable elements enriched with a relevance property based on a given search string.
// Only elements with a relevance above 0 is returned.
r.DOMCrawler.prototype.search = function (search) {
    var relevant = [];

    if (!search) return relevant;

    for (var i = 0; i < this.interactables.length; i++) {
        this.interactables[i].findRelevance(search);
        if (this.interactables[i].relevance > 0)
            relevant.push(this.interactables[i]);
    }

    return relevant;
};