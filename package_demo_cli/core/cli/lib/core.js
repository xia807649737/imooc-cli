'use strict';

module.exports = core;

// require支持.js .json ,其他有js代码的文件
const pkg = require('../package.json');

function core() {
    // TODO
    // console.log('exec core')
    checkPkgVersion();
}

function checkPkgVersion() {
    console.log(pkg.version);
}
