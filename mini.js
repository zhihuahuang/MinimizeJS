var fs = require('fs');
var exec = require('child_process').exec;
var argv = process.argv;

var requireList = [];
var requireMap = {};

var outFile = 'out';

/*
* 构造加载模块列表
*/
//var match = /^(.*)\.json$/.exec(argv[2]); // 判断是不是JSON文件
//if(match) {
//    outFile = match[1];
//    requireList = eval(fs.readFileSync(argv[2], 'utf8'));
//}
//else {
//    requireList = [argv[2]];
//}

function parseModules(str) {
    var match = /^(.*)\.json$/.exec(str); // 判断是不是JSON文件
    if(match) {
        outFile = match[1];
        return eval(fs.readFileSync(str, 'utf8'));
    }
    else {
        return [str];
    }
}

/*
* 依次加载模块
*/
function load(path){
    var data = fs.readFileSync(path, 'utf8');
    var match = /require\(([^)]*)\)/.exec(data);
    var i;
    
    if(match) {
        var list = eval('[' + match[1] + ']');
        
        for(i in list) {
            var moduleJS = 'js/' + list[i].replace('.', '/') + '.js';
            if(!requireMap[moduleJS]) {
                load(moduleJS);
            }
        }
    }
    requireMap[path] = data.replace(/\/\/ *require\([^)]*\);? *(\r)?\n/, "");
}

/*
* Print
*/
function printMap(map) {
    for(i in map) {
        console.log(i);
    }
}

// 构建输出文件
function build(file, text) {
    text = text.replace(/window|document|true|false|null|undefined/ig, function(match){
        switch(match.toLowerCase()) {
            case "window":
                return "W";
                
            case "document":
                return "D";
                
            case "true":
                return "T";
                
            case "false":
                return "F";
                
            case "null":
                return "N";
                
            case "undefined":
                return "U";
        }
    });
    
    var base = fs.readFileSync(__dirname + '/base.js', 'utf8').replace("/*MAIN*/", text);
    
    fs.writeFileSync(file+'.js', base, 'utf8');
}

// 压缩
function uglify(file) {
    exec('node ' + __dirname + '/node_modules/uglifyjs/bin/uglifyjs ' + file + '.js -m -o ' + file + '.min.js');
}



(function() {
    requireList = parsetModules(argv[2]);
    
    for(var i=0; i<requireList.length; i++){
        load(requireList[i]);
    }
    
    printMap(requireMap);
    
    /*
    * 构造输出文件内容
    */
    var jsText = [];
    for(i in requireMap){
        console.log(requireMap[i]);
        jsText.push(requireMap[i]);
    }
    build(outFile, jsText.join('\n\n'));

    console.log('Uglify...');

    uglify(outFile);

    console.log('Done!');
}());