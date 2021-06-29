'use strict';


const exec = () => {
    console.log('exec');
    console.log(process.env.CLI_TARGET_PATH);
    console.log(process.env.CLI_HOME_PATH);
    //1.targetPath -> modulePath
    //2.modulePath -> Package(npm 模块)
    //3.Package.getRootFile(获取入口文件)
    

    //
}

module.exports = exec;
