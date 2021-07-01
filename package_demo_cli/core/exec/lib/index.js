'use strict';

const path = require('path');
const Package = require('@package_demo_cli/package');
const log = require('@package_demo_cli/log');

const SETTINGS = {
    init: '@package_demo_cli/init',
}
const CACHE_DIR = 'dependcies';

const exec = async () => {
    // console.log(process.env.CLI_TARGET_PATH)
    // console.log(process.env.CLI_HOME_PATH)
    let targetPath = process.env.CLI_TARGET_PATH;
    let storeDir = '';
    let pkg = null;
    const homePath = process.env.CLI_HOME_PATH;
    const cmdObj = arguments[arguments.length - 1];
    const packageName = SETTINGS[cmdObj];
    const packageVersion = 'lastest';
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

        } else {
           await pkg.install();
        }
    } else {
        pkg = new Package({
            targetPath,
            storeDir,
            packageName,
            packageVersion
        });
    }
    console.log(await pkg.exists());

    const rootFile = pkg.getRootFilePath();
    if (rootFile) { 
        require(rootFile).apply(null, arguments); 
    }
}

module.exports = exec;