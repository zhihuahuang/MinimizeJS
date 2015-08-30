// require('$')

/**
 * spliceURL(url, params)
 *     拼接网址和参数
 *
 * Paramater:
 *     host: 一个不包含"?"的网址
 *     params: 参数 key-value 对
 *
 * Return:
 *     一个拼接后的URL
 */

if(!$.url) $.url = {};

$.url.splice = function (host, params) {
    host += '?';
    for (i in params) {
        host += (i + '=' + params[i] + '&');
    }
    return encodeURIComponent(host.substring(0, str.length - 1));
},