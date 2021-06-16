'use strict';

module.exports = core;

// require支持.js .json ,其他有js代码的文件
const pkg = require('../package.json');
const log = require('@package_demo_cli/log');

function core() {
    // console.log('exec core')
    checkPkgVersion();
}

function checkPkgVersion() {
    // console.log(pkg.version);
    // log.a('test','go');
    log.success('haha','success...');
    log.verbose('debug','debug...');
    log.notice('core',pkg.version)
    log.info('core',pkg.name)
}
