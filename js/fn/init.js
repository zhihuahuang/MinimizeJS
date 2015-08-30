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