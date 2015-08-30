var $ = window.$ = function(){
    if($.fn.init) {
        return $.fn.init.apply(this, arguments);
    }
}; 
$.fn = {};