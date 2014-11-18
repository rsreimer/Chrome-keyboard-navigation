var DOMParser = {};



DOMParser.findInteractables = function () {
    var interactables = [];

    function map(selector, constructor) {
        var nodeList = document.querySelectorAll(selector);

        for (var i = 0; i < nodeList.length; i++) {
            return new constructor(nodeList[i]);
        }
    }

    interactables = interactables.concat(map('a, button, option', Clickable));
    interactables = interactables.concat(map('audio, video', Playable));
    interactables = interactables.concat('input, select, textarea', Focusable);

    return interactables;
}