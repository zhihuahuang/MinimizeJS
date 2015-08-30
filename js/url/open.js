// require('$', 'url');

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

$.url.open = function(arg) {
    if (!arg.url) {
        throw new Error('"url" argument does not allow to null!');
    }

    if (arg.method.toUpperCase() != "POST") {
        if (arg.params) {
            arg.url = encodeURI(u.spliceURL(arg.url, arg.params));
        }

        if (arg.target.toLowerCase() == "self") {
            window.location.href = arg.url;
        } else {
            window.open(arg.url);
        }
    } else {
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