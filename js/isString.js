// require('$');

$.isString = function(value){
    return toString.apply(value) === "[object String]";
}