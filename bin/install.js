#! /usr/bin/env node

const execSync = require('child_process').execSync;

var package = require(process.cwd() + '/package.json');
let packages = Object.keys(package.localDependencies);

for (var i = 0; i < packages.length; i++) {
    link(packages[i], package.localDependencies[packages[i]]);
}

function link(name, path) {
    console.log('linking ' + name);
    execSync('npm link', { cwd: path });
    execSync('npm link ' + name, { cwd: __dirname });
}