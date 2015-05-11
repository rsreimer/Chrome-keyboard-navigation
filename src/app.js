// Search element setup
var inputElement = document.createElement("input");
var resultCountElement = document.createElement("span");

var searchElement = document.createElement("div");
searchElement.appendChild(inputElement);
searchElement.appendChild(resultCountElement);

var containerElement = document.createElement("div");
containerElement.id = "r-search-field";
containerElement.appendChild(searchElement);

var rootElement = document.body;
rootElement.appendChild(containerElement);

// Application setup
var rDOMCrawler = new r.DOMCrawler(rootElement);
var rSearchField = new r.SearchField(inputElement, resultCountElement);
var rSearchNavigator = new r.SearchNavigator(rootElement, rSearchField, rDOMCrawler);

// Keybinding setup
document.addEventListener('keydown', function (event) {
    // Alt+Q
    if (event.keyCode == 81 && event.altKey) {
        rSearchNavigator.open();
    }
    // Esc
    else if (event.keyCode == 27) {
        rSearchNavigator.close();
    }
});

inputElement.addEventListener('keydown', function (event) {
    // Arrow up
    if (event.keyCode == 38) {
        rSearchNavigator.previous();
        event.preventDefault();
    }
    // Arrow down
    else if (event.keyCode == 40) {
        rSearchNavigator.next();
        event.preventDefault();
    }
    // Enter
    else if (event.keyCode == 13) {
        rSearchNavigator.execute();
        event.preventDefault();
    }
});

inputElement.addEventListener('input', function () {
    rSearchNavigator.search();
});