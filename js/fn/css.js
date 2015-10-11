// require('$', 'each', 'fn.init');

$.fn.css = function(name, value){
    var i, temp = {};
    if($.isString(name)) {
        if(value) {
            getComputedStyle(this, null).getPropertyValue(name); // 返回css值
        }
        else {
            temp[name] = value;
            name = temp;
        }
    }
    for(i in name) {
        $.each(this, function(){
            var key = i.replace(/^-/, "").replace(/-([a-z])/g, function(match1, match2){
                return match2.toUpperCase();
            });
            this.style[key] = name[i];
        })
    }
    return this;
}