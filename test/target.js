(function(){
var $ = window.$ = function(){
    if($.fn.init) {
        return $.fn.init.apply(this, arguments);
    }
}; 
$.fn = {};

// require('$');

$.each = function(elements, callback) {
    for(var i=0; i<elements.length; ++i) {
        callback.call(elements[i], elements[i], i)
    }
    return elements;
}

// require('$');

$.isString = function(value){
    return toString.apply(value) === "[object String]";
}

// require('$');

$.isElement = function(value){
    return (value && value.nodeType === 1) ? true : false
}

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

// require('$', 'isString', 'isElement', 'map');

$.fn.init = function(selector, context){
    var $object = [];
    
    // 字符串 则调用选择器
    if($.isString(selector)){ 
        selector = (context || document).querySelectorAll(selector);
        
    }
    
    if(selector.length != null) {
        $object = $.map(selector, function(element){
            return element;
        });
    }
    else if($.isElement(selector)){
        $object = [selector];
    }
    
    $object.__proto__ = $.fn;

    return $object
}

// require('$', 'each', 'fn.init');

$.fn.on = function(type, listener, useCapture){
    if($.isString) {
        var temp = {};
        temp[type] = listener;
        type = temp;
    }
    for(i in type) {
        $.each(this, function(){
            this.addEventListener(i, type[i], useCapture);
        });
    }
    return this;
}

// reuqire('$', 'each', 'fn.init');

$.fn.attr = function(attribute, value){
    if($.isString(attribute)) {
        if(value) {
            var temp = {};
            temp[attribute] = value ;
            attribute = temp;
        }
        else {
            return this[0].getAttribute(attribute);
        }
    }
    
    $.each(this, function(){
        for(i in attribute) {
            this.setAttribute(i, attribute[i]);
        }
    });
    return this;
}
}())