'use strict';
const path = require('path');
const pkgDir = require('pkg-dir').sync;
const npminstall = require('npminstall');
const { isObject } = require('@package_demo_cli/utils');
const formatPath = require('@package_demo_cli/format-path');
const { getDefaultRegitry } = require('@package_demo_cli/get-npm-info');

class Package {
    constructor(options) {
        if (!options) {
            throw new Error('Package类的options参数不能为空!')
        }
        if (!isObject(options)) {
            throw new Error('Package类的options参数必须为对象!')
        }
        // package的目标路径
        this.targetPath = options.targetPath;
        // 缓存package的路径
        this.storeDir = options.storeDir;
        // package的name
        this.packageName = options.packageName;
        // package的version
        this.packageVersion = options.packageVersion;
    }

    // 判断Package是否存在
    exists() {

    }

    // 安装Package
    install() {
        return npminstall({
            root: this.targetPath,
            storeDir: this.storeDir,
            registry: getDefaultRegitry(),
            pkgs: [{
                    name: this.packageName,
                    version: this.packageVersion
                }],
        })
    }

    // 更新Package
    update() {

    }

    // 获取入口文件路径
    getRootFilePath() {
        //1. 获取package.json所在的目录
        const dir = pkgDir(this.targetPath);
        // console.log(dir);
        if (dir) {
            //2. 读取package.json - require()
            const pkgFile = require(path.resolve(dir, 'package.json'));
            // console.log(pkgFile);
            //3. 寻找main/lib
            if (pkgFile && pkgFile.main) {
                //4. 路径的兼容(macOS/window)
                return formatPath(path.resolve(dir, pkgFile.main));
            }
        }
        return null;
    }
}

module.exports = Package;