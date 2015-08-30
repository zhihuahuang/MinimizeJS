// require('$');

/**
 * copy(obj, proto)
 *     克隆对象
 *
 * Parameter:
 *     obj: 要克隆的对象
 *     proto: 是否克隆原型链属性，默认为true
 *
 * Return:
 *     新对象
 */

$.copy = function (obj, proto) {
    proto = proto || true;

    var newObj = {};
    for (i in obj) {
        if (!proto && !obj.hasOwnProperty(i)) {
            continue;
        }
        if (typeof obj[i] == "object") {
            newObj[i] = arguments.callee(obj[i]);
        } else {
            newObj[i] = obj[i];
        }
    }
    return newObj;
},