// require('$', 'each', 'fn.init');

$.fn.on = function(type, listener, useCapture){
    if($.isString) {
        var temp = {};
        temp[type] = listener;
        type = temp;
    }
    var i;
    for(i in type) {
        $.each(this, function(){
            this.addEventListener(i, type[i], useCapture);
        })
    }
    return this;
}