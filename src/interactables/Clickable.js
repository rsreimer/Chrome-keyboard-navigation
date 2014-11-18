function Clickable(element) {
    this.element = element;
}

// Inheritance
Clickable.prototype = new Focusable();
Clickable.prototype.constructor = Clickable;

Clickable.prototype.click = function () {
    this.element.click();
};