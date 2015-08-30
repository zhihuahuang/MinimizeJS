var W = window,
    D = document,
    $ = W.$ = function(){
    if($.fn.init) {
        return $.fn.init.apply(this, arguments);
    }
}; 