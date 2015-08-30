// require('$');

$.isFunction = function(value) {
    return toString.apply(value) === "[object Function]";
}