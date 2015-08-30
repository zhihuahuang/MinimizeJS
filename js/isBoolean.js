// require('$');

$.isBoolean = function(value) {
    return toString.apply(value) === "[object Boolean]";
}