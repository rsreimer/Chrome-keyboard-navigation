if (!r) var r = {};

r.SearchField = function(inputElement, resultCountElement) {
    this.inputElement = inputElement;
    this.resultCountElement = resultCountElement;
}

r.SearchField.prototype.getSearchString = function() {
    return this.inputElement.value;
};

r.SearchField.prototype.setResultCount = function(resultCount) {
    this.resultCountElement.textContent = resultCount;
};

r.SearchField.prototype.open = function() {
    this.setResultCount(0);
    this.inputElement.value = "";
    this.inputElement.disabled = false;

    var x = window.scrollX, y = window.scrollY;
    this.inputElement.focus();
    window.scrollTo(x, y);
};

r.SearchField.prototype.close = function() {
    this.inputElement.disabled = true;
};