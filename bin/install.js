#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

var packagePath = path.resolve(process.cwd(), 'package.json');
var package = require(packagePath);
let packages = Object.keys(package.localDependencies);

for (var i = 0; i < packages.length; i++) {
    link(packages[i], package.localDependencies[packages[i]]);
}

function link(name, target) {
    console.log('linking ' + name);
    target = path.resolve(process.cwd(), target);
    let link = path.resolve(process.cwd(), 'node_modules', name);

    prepareDirectory(link);
    createSymlink(target, link);
}

function createSymlink(target, link) {
    if (fs.existsSync(link)) {
        fs.unlinkSync(link);
    }
    fs.symlinkSync(target, link, 'dir');
}

function prepareDirectory(targetPath) {
    let dirsToCreate = targetPath.split(path.sep);
    dirsToCreate.pop();
    targetPath = dirsToCreate.join(path.sep);

    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
    }
}
