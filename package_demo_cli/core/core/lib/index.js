'use strict';

module.exports = core;
//外部依赖在前面
const semver = require('semver');
const colors = require('colors/safe');

// require支持.js .json ,其他有js代码的文件
const pkg = require('../package.json');
const log = require('@package_demo_cli/log');
const constant = require('./version');

function core() {
    try {
        checkPkgVersion();
        checkNodeVersion();
    } catch (e) {
        log.error(e.message);
    }
}

function checkPkgVersion() {
    log.say('test', 'go');
    log.success('haha', 'success...');
    log.verbose('debug', 'debug...');
    log.notice('core', pkg.version);
    log.info('core', pkg.name);
}

function checkNodeVersion() {
    // 第一步,获取当前版本号
    const currentVersion = process.version;
    // 第二步,对比最低版本号
    const lowestVersion = constant.LOWEST_NODE_VERSION;
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`package_demo_cli 需要安装 v${lowestVersion} 及以上版本的 Node.js`));
    }
}