// require('$');

$.each = function(elements, callback) {
    for(var i=0; i<elements.length; ++i) {
        callback.call(elements[i], elements[i], i)
    }
    return elements;
}