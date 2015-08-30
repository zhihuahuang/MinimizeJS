// require('$');

$.isNumber = function(value) {
    return toString.apply(value) === "[object Number]";
}

$.isNumeric = function(value) {
    return (value - parseFloat( value ) + 1) >= 0;
}