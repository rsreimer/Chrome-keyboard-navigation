function Focusable(element) {
    this.element = element;
}

Focusable.prototype.focus = function () {
    this.element.focus();
};