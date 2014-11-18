var DOMParser = {
    findInteractables: function () {
        var interactables = [];

        function map(selector, constructor) {
            var nodeList = document.querySelectorAll(selector);
            var list = [];

            for (var i = 0; i < nodeList.length; ++i) {
                list.push(new constructor(nodeList[i]));
            }

            return list;
        }

        interactables = interactables.concat(map('a, button, option', Clickable));
        interactables = interactables.concat(map('audio, video', Playable));
        interactables = interactables.concat(map('input, select, textarea', Focusable));

        return interactables;
    }
};