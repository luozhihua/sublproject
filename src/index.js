/*global require,process,console*/

'use strict';

var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var conf = require('./config');
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

var projFileName = projName + '.sublime-project';
var projFilePath = path.resolve(process.cwd(), projFileName);

if (!fs.existsSync(projFilePath)) {
    var projContent = JSON.stringify({
        "folders" : [
            {
                "follow_symlinks": true,
                "file_exclude_patterns": [".fuse_hidden*"],
                "path": "."
            }
        ]
    });

    fs.writeFileSync(projFilePath, projContent);
}

cp.exec('subl --project '+ projFilePath);
