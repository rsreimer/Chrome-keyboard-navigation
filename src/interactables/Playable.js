if (!r) var r = {};

r.Playable = function(element) {
    this.element = element;
};

// Inheritance
r.Playable.prototype = new r.Interactable();
r.Playable.prototype.constructor = r.Playable;

r.Playable.prototype.execute = function () {
    if (this.element.paused || this.element.ended)
        this.element.play();
    else
        this.element.pause();
};