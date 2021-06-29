'use strict';

const { isObject } = require('@package_demo_cli/utils');
class Package {
    constructor(options) {
        if (!options) {
            throw new Error('Package类的options参数不能为空!')
        }
        if (!isObject(options)) {
            throw new Error('Package类的options参数必须为对象!')
        }
        // package的路径
        this.targetPath = options.targetPath;
        // package的存储路径
        this.storePath = options.storePath;
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

    }

    // 更新Package
    update() { 

    }

    // 获取入口文件路径
    getRootFilePath() { 

    }
}

module.exports = Package;

