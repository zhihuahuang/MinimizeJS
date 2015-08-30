// require('$');

$.map = function(elements, callback) {
    var value, values = [];
    for(var i=0; i<elements.length; ++i) {
        value = callback(elements[i], i)
        if (value != null){
            values.push(value);
        }
    }
    return values
}