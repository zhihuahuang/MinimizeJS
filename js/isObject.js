// require('$');

$.isObject = function(value){
    return toString.apply(value) === "[object Object]";
}