// require('$', 'fn.init');

var matchesSelector = D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.matchesSelector;

$.fn.is = function(selector){
    var element = this[0];
    
    if (matchesSelector)
        return matchesSelector.call(element, selector);
    
    var hasParent = !!element.parentNode;
    var div = D.createElement('div');
    
    if(!hasParent) div.appendChild(element);
    
    var match = $(selector, element.parentNode);
    
    for(var i=0; i<match.length; ++i) {
        if(element == match[i]) {
            !hasParent && div.removeChild(element);
            return true;
        }
    }
    
    !hasParent && div.removeChild(element);
    return false;
}