'use strict';

const cp = require('child_process');
const path = require('path');
const Package = require('@package_demo_cli/package');
const log = require('@package_demo_cli/log');

const SETTINGS = {
    // 只能安置一个已经push到npm的包的地址
    init: '@imooc-cli/init',
}
const CACHE_DIR = 'dependencies';

async function exec() {
    let targetPath = process.env.CLI_TARGET_PATH;
    const homePath = process.env.CLI_HOME_PATH;
    // log.verbose('targetPath', targetPath);
    // log.verbose('homePath', homePath);
    let storeDir = '';
    let pkg;
    // log.verbose('arguments',arguments);
    const cmdObj = arguments[arguments.length - 1];
    const cmdName = cmdObj.name();
    const packageName = SETTINGS[cmdName];
    const packageVersion = 'latest';

    if (!targetPath) {
        // 生成缓存存路径
        targetPath = path.resolve(homePath, CACHE_DIR);
        storeDir = path.resolve(targetPath, 'node_modules');
        log.verbose('targetPath', targetPath);
        log.verbose('storeDir', storeDir);

        pkg = new Package({
            targetPath,
            storeDir,
            packageName,
            packageVersion
        });
        if (await pkg.exists()) {
            // 更新package
            // log.verbose('update', '更新pacakge');
            await pkg.update();
        } else {
            // 安装package
            await pkg.install();
        }
    } else {
        pkg = new Package({
            targetPath,
            packageName,
            packageVersion
        });
    }
    // log.verbose('exists', await pkg.exists());
    const rootFile = pkg.getRootFilePath();
    // log.verbose('rootFilePath', rootFile);
    if (rootFile) {
        try {
            // 当前进程中调用
            // require(rootFile).apply(null, arguments);
            // require(rootFile).call(null, Array.from(arguments));
            // 在node子进程中调用,获得更多cpu资源
            const args = Array.from(arguments);
            const cmd = args[args.length - 1];
            const obj = Object.create(null);
            Object.keys(cmd).forEach(key => {
                if (cmd.hasOwnProperty(key) && !key.startsWith('_') && key !== 'parent') {
                    obj[key] = cmd[key];
                }
            })
            // console.log(obj);
            args[args.length - 1] = obj;
            const code = `require('${rootFile}').call(null, ${JSON.stringify(args)})`;
            // cp.spawn('cmd', ['/c', 'node', '-e', code]);
            const child = spawn('node', ['-e', code], {
                cws: process.cwd(),
                stdio: 'inherit'
            });
            child.on('error', e => {
                log.error(e.message);
                process.exit(1);
            })
            child.on('exit', e => {
                log.verbose(`命令执行成功:${e}`);
                process.exit(e);
            })
        } catch (e) {
            log.error(e.message);
        }

    }
}

function spawn(command, args, options) {
    const win32 = process.platform === 'win32';
    const cmd = win32 ? 'cmd' : command;
    const cmdArgs = win32 ? ['/c'].concat(command, args) : args;
    return cp.spawn(cmd, cmdArgs, options || {});
}

module.exports = exec;