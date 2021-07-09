'use strict';

const semver = require('semver');
const LOWEST_NODE_VERSION = '12.0.0';
const colors = require('colors/safe');
const log = require('@package_demo_cli/log');
// const { isObject } = require('@package_demo_cli/utils');

class Command { 
    constructor(argv) {
        console.log('Command constructor', argv);
        if (!argv) { 
            throw new Error('参数不能为空!');
        }
        if(!Array.isArray(argv)) {
            throw new Error('参数必须为数组!');
        }
        if (argv.length < 1) { 
            throw new Error('参数列表为空!');
        }

        this._argv = argv;
        let runner = new Promise((resolve, reject) => {
            let chain = Promise.resolve();
            chain = chain.then(() => this.checkNodeVersion());
            chain = chain.then(() => this.initArgs());
            chain = chain.then(() => this.init());
            chain = chain.then(() => this.exec());
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

    initArgs() { 
        this._cmd = this._argv[this._argv.length-1];
        this._force = this._argv[this._argv.length-2];
        this._temp = this._argv.slice(0, this._argv.length-1);
        this._argv = this._temp.slice(0, this._temp.length-1);
        // console.log(this._force, this._argv);
    }
    init() { 
        throw new Error('init必须实现');
    }

    exec() {
        throw new Error('exec必须实现');
    }
}
module.exports = Command;

