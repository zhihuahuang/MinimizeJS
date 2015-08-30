var fs = require('fs');
var argv = process.argv;

var requireList = [];
var requireMap = {};

var outFile = 'out.js';

/*
* 构造加载模块列表
*/
var match = /^(.*)\.json$/.exec(argv[2]); // 判断是不是JSON文件
if(match) {
    outFile = match[1]+'.js';
    requireList = eval(fs.readFileSync(argv[2], 'utf8'));
}
else {
    requireList = [argv[2]];
}

/*
* 依次加载模块
*/

var load = function(path){
    var data = fs.readFileSync(path, 'utf8');
    var match = /require\((.*)\)/.exec(data);

    if(match) {
        var list = eval('[' + match[1] + ']');

        for(i in list) {
            var moduleJS = 'js/' + list[i].replace('.', '/') + '.js';
            if(!requireMap[moduleJS]) {
                load(moduleJS);
            }
        }
    }
    requireMap[path] = data;
}

for(var i=0; i<requireList.length; ++i){
    load(requireList[i]);
}

/*
* Print
*/
var printMap = function(map) {
    for(i in map) {
        console.log(i);
    }
}
printMap(requireMap);

/*
* 构造输出文件内容
*/
var jsText = [];
for(i in requireMap){
    jsText.push(requireMap[i]);
}
fs.writeFileSync(outFile, '(function(){\n' + jsText.join('\n\n') + '\n}())', 'utf8');