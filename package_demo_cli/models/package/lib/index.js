'use strict';

class Package {
    constructor(options) {
        if (!options) {
            throw new Error('Package类的options参数不能为空!')
        }
        // package的路径
        this.targetPath = options.targetPath;
        // package的存储路径
        this.storePath = options.storePath;
        // package的name
        this.packageName = options.name;
        // package的version
        this.packageVersion = options.version;
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

