// require('$');

$.isArray = function (value) {
    return toString.apply(value) === "[object Array]";
}