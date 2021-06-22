'use strict';

module.exports = core;
const path = require('path');
//外部依赖在前面
const semver = require('semver');
const colors = require('colors/safe');

// require支持.js .json ,其他有js代码的文件
const pkg = require('../package.json');
const log = require('@package_demo_cli/log');
const constant = require('./common');

//用户主目录
const userHome = require('user-home');
const pathExists = require('path-exists').sync;

//debug模式启动
let args;
let config;

function core() {
    try {
        checkPkgVersion();
        checkNodeVersion();
        checkRoot();
        checkUserHome();
        checkInputArgs();
        checkEnv();
    } catch (e) {
        log.error(e.message);
    }
}

function checkPkgVersion() {
    // log.say('test', 'go');
    // log.success('haha', 'success...');
    // log.verbose('debug', 'debug...');
    // log.notice('core', pkg.name);
    log.info('core', pkg.version);
}

function checkNodeVersion() {
    // 第一步,获取当前版本号
    const currentVersion = process.version;
    // console.log(currentVersion);
    // 第二步,对比最低版本号(设置12.0.0)
    const lowestVersion = constant.LOWEST_NODE_VERSION;
    // console.log(lowestVersion);
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`package_demo_cli 需要安装 v${lowestVersion} 及以上版本的 Node.js`));
    }
}

function checkRoot() {
    const rootCheck = require('root-check');
    rootCheck(colors.red('请避免使用 root 账户启动本应用'));
}

function checkUserHome() {
    // console.log(userHome);
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors.red('当前用户住主目录不存在!'));
    }
}

function checkInputArgs() {
    let minimist = require('minimist');
    args = minimist(process.argv.slice(2));
    // console.log(args);
    checkArgs()
    // log.verbose('debug', 'test debug log');
}

function checkArgs() {
    if (args.debug) {
        process.env.LOG_LEVEL = 'verbose';
    } else {
        process.env.LOG_LEVEL = 'info';
    }
    log.level = process.env.LOG_LEVEL;
}

function checkEnv() {
    // log.verbose('开始检查环境变量');
    let dotenv = require('dotenv');
    dotenv.config({
        path: path.resolve(userHome, '.env'),
    });
    // config = createCliConfig(); // 准备基础配置
    // log.verbose('环境变量', config);
    createCliConfig(); // 准备基础配置
    log.verbose('环境变量', process.env.CLI_HOME_PATH);
}

function createCliConfig() {
    let cliConfig = {
        home: userHome,
    };
    if (process.env.CLI_HOME) {
        cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME);
    } else {
        cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME);
    }
    process.env.CLI_HOME_PATH = cliConfig.cliHome;
    // return cliConfig;
}