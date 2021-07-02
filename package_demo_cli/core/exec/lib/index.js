'use strict';

const path = require('path');
const Package = require('@package_demo_cli/package');
const log = require('@package_demo_cli/log');

const SETTINGS = {
    // init: '@package-demo-cli/init',
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
        if (pkg.exists()) {
            // 更新package
            pkg.install();
        } else {
            // 安装package
        }
    } else {
        pkg = new Package({
            targetPath,
            packageName,
            packageVersion
        });
    }
    // log.verbose('rootFilePath', pkg.getRootFilePath());
    const rootFile = pkg.getRootFilePath();
    if (rootFile) {
        require(rootFile).apply(null, arguments);
    }

    // log.verbose('exists', await pkg.exists());

}

module.exports = exec;