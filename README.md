# MinimizeJS 

一个可以自定义最小化 JS 代码的库

代码风格基本兼容 jQuery

##使用方法

###1.载入一个JS模块

像这样载入一个JS模块

    node mini.js module.js

例如载入 attr.js

    node mini.js js/fn/attr.js

会自动加载依赖的库。

###2.载入多个JS模块

将多个模块保存到一个JSON文件中，然后再进行载入

    node mini.js modules.json

例如载入 on.js 和 attr.js

out.json 文件

    [
        'attr.js',
        'on.js'
    ]

JSON文件名可以自定义

    node mini.js out.json