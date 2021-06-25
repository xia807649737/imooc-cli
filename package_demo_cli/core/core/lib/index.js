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

const commander = require('commander');
//debug模式启动
let args;
// let config;
const program = new commander.Command();

async function core() {
    try {
        checkPkgVersion();  // 检查当前运行版本
        checkNodeVersion(); // 检查 node 版本
        // checkRoot();     // 检查是否为 root 启动
        checkUserHome();    // 检查用户主目录
        // checkInputArgs();   // 检查用户输入参数
        checkEnv();         // 检查环境变量
        registerCommand();
        await checkGlobalUpdate(); // 检查工具是否需要更新
    } catch (e) {
        log.error(e.message);
    }
}

//脚手架的启动过程
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
    let rootCheck = require('root-check');
    rootCheck(colors.red('请避免使用 root 账户启动本应用'));
    // console.log(process.geteuid);
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

async function checkGlobalUpdate() {
    // 1.获取当前版本号和模块名
    const currentVersion = pkg.version;
    const npmName = pkg.name;
    // 2.调用npm API,获取所有版本号
    const { getNmpSemverVersion } = require('@package_demo_cli/get-npm-info');
    const lastVersion = await getNmpSemverVersion(currentVersion, npmName);
    // 3.提取所有版本号,对比哪些版本号是大于当前版本号
    if (lastVersion && semver.gt(lastVersion, currentVersion)) {
        // 4.获取最新版号,提示用户更新到该版本号
        log.warn(colors.yellow(`请手动更新${npmName},当前版本:${currentVersion},最新版本:${lastVersion}
        更新命令: npm install -g ${npmName}`));
    }
}

//脚手架的注册
function registerCommand() {
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d, --debug', '是否开启调试模式', false)

    //开启debug模式
    program.on('option:debug', () => {
        if (program._optionValues.debug) {
            process.env.LOG_LEVEL = 'verbose';
        } else {
            process.env.LOG_LEVEL = 'info';
        }
        log.level = process.env.LOG_LEVEL;
        // log.verbose('test');
    })

    // 对未知命令监听
    program.on('command:*', obj => {
        const availableCommands = program.commands.map(cmd => cmd.name());
        console.log(colors.red(`未知命令: ${obj[0]}`));
        if(availableCommands.length >0) {
            console.log(colors.red(`可用命令: ${availableCommands.join(',')}`));
        } else {
            console.log(colors.red(`可用命令: none`));
        }
    })
    program.parse(process.argv);

    if(process.argv && process.argv.length <1) {
        program.outputHelp();
        console.log()
    }

}