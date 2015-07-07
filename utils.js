(function(){
    var u = window.utils = {
        /**
        * size(obj, proto)
        *     检测对象的属性个数
        * 
        * Parameter:
        *     obj: 要检测的对象
        *     proto: 是否检查原型链属性，默认为true
        *
        * Return:
        *     返回属性个数
        */
        size: function (obj, proto) {
            proto = proto | true;

            var s = obj.length;
            if (!s) {
                s = 0;
                for (i in obj) {
                    if(!proto && !obj.hasOwnProperty(i)){
                        continue;
                    }
                    s++;
                }
            }
            return s;
        },

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
        copy: function(obj, proto){
            proto = proto | true;

            var newObj = {};
            for (i in obj) {
                if (!proto && !obj.hasOwnProperty(i)) {
                    continue;
                }
                if (typeof obj[i] == "object") {
                    newObj[i] = arguments.callee(obj[i]);
                }
                else {
                    newObj[i] = obj[i];
                }
            }
            return newObj;
        },

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
        spliceURL: function(host, params){
            host += '?';
            for(i in params) {
                host += (i + '=' + params[i] + '&');
            }
            return encodeURIComponent(host.substring(0, str.length-1));
        },

        /**
        * openURL(obj)
        *     打开请求的URL
        *     Open Requset URL
        * 
        * Parameter:
        *     arg: 传入的参数，应该具备以下的形式
        *          {
        *              url: "",                     必选
        *              params: "",                  可选
        *              target: ["blank"|"self"]     可选
        *              method: ["GET" | "POST"],    可选
        *              charset: "utf-8"             可选,只有当方法为POST时有效
        *          }
        *
        */
        openURL: function(arg) {
            if (!arg.url) {
                 throw new Error('"url" argument does not allow to null!');
            }
            
            if(arg.method.toUpperCase() != "POST") {
                if (arg.params) {
                    arg.url = encodeURI(u.spliceURL(arg.url, arg.params));
                }
                
                if (arg.target.toLowerCase() == "self") {
                    window.location.href = arg.url;
                }
                else{
                    window.open(arg.url);
                }
            }
            else {
                var form = document.createElement("form");
                form.action = arg.url;
                form.method = arg.method || "GET";
                form.target = "_" + (arg.target || "blank");
                form.acceptCharset = arg.charset || "utf-8";

                for (i in arg.params) {
                     var input = document.createElement("input");
                     input.setAttribute("name", i);
                     input.setAttribute("value", arg.params[i]);
                     form.appendChild(input);
                }

                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
            }
        },

        /**
        * 获取URL参数
        */
        getParameter: function(key, defaultValue){
            if(arguments.length == 0) {
                if (window.location.search.indexOf('?') != -1) {
                    var pairs = {};
                    var params = window.location.search.substr(1).split('&');
                    for(i in params) {
                        var tmp = params[i].split('=');
                        pairs[tmp[0]] = tmp[1];
                    }
                    return pairs;
                } 
            }
            else{
                var match = RegExp('[?|&]'+key+'=([^&]*)').exec(window.location.search);
                return match[1] ? match[1] : defaultValue;
            }
        },
    }
}());