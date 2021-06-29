'use strict';

const Package = require('@package_demo_cli/package');

const exec = () => {
    const pkg = new Package();
    console.log(pkg)
    console.log('exec');
    console.log(process.env.CLI_TARGET_PATH);
    console.log(process.env.CLI_HOME_PATH);
    //1.targetPath -> modulePath
    //2.modulePath -> Package(npm 模块)
    //3.Package.getRootFile(获取入口文件)
    

    //
}

module.exports = exec;
