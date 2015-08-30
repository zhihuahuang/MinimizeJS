// require('$');

$.isElement = function(value){
    return (value && value.nodeType === 1) ? true : false
}