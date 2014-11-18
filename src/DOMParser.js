var DOMParser = {
    // Select elements from DOM and map them into special objects
    findInteractables: function () {
        var mappings = [
            ['a, button, option', Clickable],
            ['audio, video', Playable],
            ['input, select, textarea', Focusable]
        ];

        var interactables = [];

        for (var i = 0; i < mappings.length; i++) {
            var selector = mappings[i][0];
            var constructor = mappings[i][1];

            var nodeList = document.querySelectorAll(selector);

            for (var j = 0; j < nodeList.length; j++) {
                interactables.push(new constructor(nodeList[j]));
            }
        }

        return interactables;
    }
};