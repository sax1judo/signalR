'use strict';
process.stdout.write('\u001B[2J\u001B[0;0f');
const fs = require('fs');

if (fs.existsSync('public')) {
    try {
        removeFolder('public');
    } catch (error) {}
}

function removeFolder(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                removeFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};