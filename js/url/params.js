// require('$');

/**
 * 获取URL参数
 */

if(!$.url) $.url = {};

$.url.params = function (key, defaultValue) {
    if (arguments.length == 0) {
        if (window.location.search.indexOf('?') != -1) {
            var pairs = {};
            var params = window.location.search.substr(1).split('&');
            for (i in params) {
                var tmp = params[i].split('=');
                pairs[tmp[0]] = tmp[1];
            }
            return pairs;
        }
    } else {
        var match = RegExp('[?|&]' + key + '=([^&]*)').exec(window.location.search);
        return match[1] ? match[1] : defaultValue;
    }
},