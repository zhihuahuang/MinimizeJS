// require('$');

$.each = function(elements, callback) {
    var i;
    for(i=0; i<elements.length; ++i) {
        callback.call(elements[i], elements[i], i);
    }
    return elements;
}