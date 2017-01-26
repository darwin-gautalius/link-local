#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

var package = require(process.cwd() + '/package.json');
let packages = Object.keys(package.localDependencies);

for (var i = 0; i < packages.length; i++) {
    link(packages[i], package.localDependencies[packages[i]]);
}

function link(name, target) {
    console.log('linking ' + name);
    target = path.resolve(process.cwd(), target);
    let link = path.resolve(process.cwd(), './node_modules/' + name);

    prepareDirectory(link);
    createSymlink(target, link);
}

function createSymlink(target, link) {
    if (fs.existsSync(link)) {
        fs.unlinkSync(link);
    }
    fs.symlinkSync(target, link, 'dir');
}

function prepareDirectory(path) {
    let dirsToCreate = path.split('/');
    dirsToCreate.pop();
    path = dirsToCreate.join('/');

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}
