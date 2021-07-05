'use strict';
const path = require('path');
const fse = require('fs-extra');
const pkgDir = require('pkg-dir').sync;
const pathExists = require('path-exists').sync;
const npminstall = require('npminstall');
const formatPath = require('@package_demo_cli/format-path');
const log = require('@package_demo_cli/log');
const { isObject } = require('@package_demo_cli/utils');
const { getDefaultRegitry, getNpmLatestVersion } = require('@package_demo_cli/get-npm-info');

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
        // package的缓存目录前缀
        this.cacheFilePathPrefix = this.packageName.replace('/','_');
    }

     // 获取最后一个版本
    async prepare() {
        if (this.storeDir && !pathExists(this.storeDir)) {
            fse.mkdirpSync(this.storeDir);
            log.verbose('fse', fse.mkdirpSync(this.storeDir));
        }

        // log.verbose('packageVersion1', this.packageVersion);
        if (this.packageVersion === 'latest') {
            this.packageVersion = await getNpmLatestVersion(this.packageName);
            // log.verbose('packageVersion2', this.packageVersion);
        }
        // @imooc-cli_init@1.0.1@@imooc-cli\init
    }

     // 下载到本地的缓存路径
    get cacheFilePath() { 
        return path.resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.packageVersion}@${this.packageName}`);
    }

    // 判断Package是否存在
    async exists() {
    //     log.verbose('123', pathExists(this.cacheFilePath));
    //     log.verbose('234', pathExists(this.targetPath));

    //     if (this.storeDir) { 
    //         await this.prepare();
         // log.verbose('cacheFilePath', this.cacheFilePath);
    //         return pathExists(this.cacheFilePath)
    //     } else {
    //         return pathExists(this.targetPath);
    //     }
    }

    // 安装Package,有问题没解决
    async install() {
        // await this.prepare();
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
    async update() {
        await this.prepare();
    }

    // 获取入口文件路径
    getRootFilePath() {
        //1. 获取package.json所在的目录
        const dir = pkgDir(this.targetPath);
        // log.verbose('dir',dir);
        if (dir) {
            //2. 读取package.json - require()
            const pkgFile = require(path.resolve(dir, 'package.json'));
            // log.verbose('pkgFile', pkgFile);
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