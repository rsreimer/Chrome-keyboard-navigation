if (!r) var r = {};

r.Clickable = function(element) {
    this.element = element;
};

// Inheritance
r.Clickable.prototype = new r.Interactable();
r.Clickable.prototype.constructor = r.Clickable;

r.Clickable.prototype.click = function () {
    this.element.click();
};