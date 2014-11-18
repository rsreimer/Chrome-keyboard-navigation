function Playable(element) {
    this.element = element;
}

// Inheritance
Playable.prototype = new Focusable();
Playable.prototype.constructor = Playable;

Playable.prototype.play = function () {
    this.element.play();
};

Playable.prototype.pause = function () {
    this.element.pause();
};