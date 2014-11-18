if (!r) var r = {};

r.Playable = function(element) {
    this.element = element;
};

// Inheritance
r.Playable.prototype = new r.Interactable();
r.Playable.prototype.constructor = r.Playable;

r.Playable.prototype.play = function () {
    this.element.play();
};

r.Playable.prototype.pause = function () {
    this.element.pause();
};