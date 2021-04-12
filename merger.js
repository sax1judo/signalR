'use strict';
process.stdout.write('\u001B[2J\u001B[0;0f');
const fs = require('fs');
const path = require('path');
const ignored = [];

if (!fs.existsSync('public')) {
	console.log(`Folder "public" not found!`);
	return;
}
try {
	copyDir('./src/assets', `./public/assets`);
	copy('./src/index.html', `./public/index.html`);
	console.log(`✔ MERGER DONE`);
} catch (error) {
	console.log(`❌ ${error}`);
}

function copyDir(src, dest) {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest);
	}
	var files = fs.readdirSync(src);
	for (var i = 0; i < files.length; i++) {
		if (contains(files[i], ignored)) continue;
		var current = fs.lstatSync(path.join(src, files[i]));
		if (current.isDirectory()) {
			copyDir(path.join(src, files[i]), path.join(dest, files[i]));
		} else if (current.isSymbolicLink()) {
			var symlink = fs.readlinkSync(path.join(src, files[i]));
			fs.symlinkSync(symlink, path.join(dest, files[i]));
		} else {
			copy(path.join(src, files[i]), path.join(dest, files[i]));
		}
	}
}

function copy(src, dest) {
	var oldFile = fs.createReadStream(src);
	var newFile = fs.createWriteStream(dest);
	oldFile.pipe(newFile);
}

function contains(string, content) {
	if (Array.isArray(content)) {
		for (let item of content) {
			if (string.includes(item)) return true;
		}
		return false;
	} else {
		return string.includes(content);
	}
}
