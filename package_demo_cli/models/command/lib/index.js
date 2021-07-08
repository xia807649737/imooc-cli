'use strict';

const semver = require('semver');
const LOWEST_NODE_VERSION = '15.0.0';
const colors = require('colors/safe');
const log = require('@package_demo_cli/log');
class Command { 
    constructor(argv) {
        // console.log('Command constructor', argv);
        this._argv = argv;
        let runner = new Promise((resolve, reject) => {
            let chain = Promise.resolve();
            chain = chain.then(() => this.checkNodeVersion());
            chain.catch(err => { 
            log.error(err.message);
            })
        })
    }

    // 首先校验node版本
    checkNodeVersion() {
        const currentVersion = process.version;
        const lowestVersion = LOWEST_NODE_VERSION;
        if (!semver.gte(currentVersion, lowestVersion)) {
            throw new Error(colors.red(`package_demo_cli 需要安装 v${lowestVersion} 及以上版本的 Node.js`));
        }
    }

    init() { 
        throw new Error('init必须实现')
    }

    exec() {
        throw new Error('exec必须实现')
    }
}
module.exports = Command;

