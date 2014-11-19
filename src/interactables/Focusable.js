if (!r) var r = {};

r.Focusable = function(element) {
    this.element = element;
};

// Inheritance
r.Focusable.prototype = new r.Interactable();
r.Focusable.prototype.constructor = r.Focusable;

r.Focusable.prototype.execute = function () {
    this.element.focus();
};