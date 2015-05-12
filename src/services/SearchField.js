if (!r) var r = {};

r.SearchField = function(inputElement, resultCountElement) {
    this.inputElement = inputElement;
    this.resultCountElement = resultCountElement;
    this.target = 0;
    this.resultCount = 0;
}

r.SearchField.prototype.getSearchString = function() {
    return this.inputElement.value;
};

r.SearchField.prototype.setResultCount = function(resultCount) {
    this.resultCount = resultCount;
    
    this.updateDisplay();
};

r.SearchField.prototype.setTarget = function(target) {
    this.target = target;
    
    this.updateDisplay();
};

r.SearchField.prototype.updateDisplay = function () {
    if (this.resultCount === 0)
        this.resultCountElement.textContent = "";
    else
        this.resultCountElement.textContent = (this.target + 1) + " of " + this.resultCount;
}

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