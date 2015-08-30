// require('$', 'each', 'fn.init');

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
        var i;
        for(i in attribute) {
            this.setAttribute(i, attribute[i]);
        }
    })
    return this;
}