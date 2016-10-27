/*global require,process,console*/
'use strict';

var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var argv = require('./config');
var pkgPath = path.resolve(process.cwd(), 'package.json');
var bowerPath = path.resolve(process.cwd(), 'bower.json');
var cwd = process.cwd();
var dirName = cwd.split(path.sep).pop();
var projName;

if (fs.existsSync(pkgPath)) {
    var pkg = require(pkgPath);
    projName = pkg.name;
} else if (fs.existsSync(bowerPath)) {
    var pkg = require(bowerPath);
    projName = pkg.name;
} else {
    projName = dirName;
}

function unique(array){
    var n = [];//临时数组
    for(var i = 0; i < array.length; i++){
        if(n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n.sort();
}

var projFileName = projName + '.sublime-project';
var projFilePath = path.resolve(process.cwd(), projFileName);
var configs;

if (!fs.existsSync(projFilePath)) {
    configs = {
        "folders" : [
            {
                "follow_symlinks": true,
                "file_exclude_patterns": [
                    ".fuse_hidden*"
                ],
                "folder_exclude_patterns": [
                    "hide_node_modules"
                ],
                "path": "."
            }
        ]
    };
} else {
    configs = JSON.parse(fs.readFileSync(projFilePath));
}

// exclude files
if (argv.f) {
    var file_patters = argv.f.split(',');
    configs.folders = configs.folders || [];

    configs.folders.forEach(function (dir) {
        dir.file_exclude_patterns = (dir.file_exclude_patterns||[]).concat(file_patters);
        dir.file_exclude_patterns = unique(dir.file_exclude_patterns);
    });
}

// exclude directories
if (argv.d) {
    var dir_patters = argv.d.split(',');
v
    configs.folders = configs.folders || [];
    configs.folders.forEach(function (dir) {
        dir.folder_exclude_patterns = (dir.folder_exclude_patterns||[]).concat(dir_patters);
        dir.folder_exclude_patterns = unique(dir.folder_exclude_patterns);
    });
}

// 写入.sublime-project文件
fs.writeFileSync(projFilePath, JSON.stringify(configs, 0, 4));

console.log('Project configs is writen in ./'+ projFileName + '.');
console.log('Project opened in Sublime Text.');

cp.exec('subl --project '+ projFilePath);

process.exit();
