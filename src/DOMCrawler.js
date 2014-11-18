var DOMCrawler = function (rootElement) {
    this.rootElement = rootElement;

    this.interactables = [];

    this.mappings = [
        ['a, button, option', Clickable],
        ['audio, video', Playable],
        ['input, select, textarea', Interactable]
    ];
};

// Caches interactable elements.
// Uses selector and constructor function pairs to select and map DOM elements into new objects.
DOMCrawler.prototype.cacheInteractables = function () {
    this.interactables = [];

    for (var i = 0; i < this.mappings.length; i++) {
        var selector = this.mappings[i][0];
        var constructor = this.mappings[i][1];

        var nodeList = this.rootElement.querySelectorAll(selector);

        for (var j = 0; j < nodeList.length; j++) {
            this.interactables.push(new constructor(nodeList[j]));
        }
    }
};

// Returns all interactable elements enriched with a relevance property based on a given search string.
DOMCrawler.prototype.search = function (search) {
    for (var i = 0; i < this.interactables.length; i++) {
        this.interactables[i].findRelevance(search);
    }

    return this.interactables;
};