'use strict';

module.exports = core;
//外部依赖在前面
const semver = require('semver');
const colors = require('colors/safe');

// require支持.js .json ,其他有js代码的文件
const pkg = require('../package.json');
const log = require('@package_demo_cli/log');
const lowVersion = require('./version');

//用户主目录
const userHome = require('user-home'); 
const pathExists = require('path-exists').sync;
function core() {
    try {
        checkPkgVersion();
        checkNodeVersion();
        checkUserHome();
        // checkRoot();
    } catch (e) {
        log.error(e.message);
    }
}

function checkPkgVersion() {
    // log.say('test', 'go');
    // log.success('haha', 'success...');
    // log.verbose('debug', 'debug...');
    // log.info('core', pkg.name);
    log.notice('core', pkg.version);
}

function checkNodeVersion() {
    // 第一步,获取当前版本号
    const currentVersion = process.version;
    // console.log(currentVersion);
    // 第二步,对比最低版本号(设置12.0.0)
    const lowestVersion = lowVersion.LOWEST_NODE_VERSION;
    // console.log(lowestVersion);
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`package_demo_cli 需要安装 v${lowestVersion} 及以上版本的 Node.js`));
    }
}

function checkRoot() {
    let rootCheck = require('root-check');
    rootCheck();
    // console.log(process.geteuid());
}

function checkUserHome(){
    // console.log(userHome);
    if(!userHome || !pathExists(userHome)){
        throw new Error(colors.red('当前用户住主目录不存在!'));
    }
}