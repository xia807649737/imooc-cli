'use strict';

const Package = require('@package_demo_cli/package');
const log = require('@package_demo_cli/log');

const SETTINGS = {
    init:'@package_demo_cli/init',
}

const exec = () => {
    const targetPath = process.env.CLI_TARGET_PATH;
    const homePath = process.env.CLI_HOME_PATH;
    log.verbose('targetPath', targetPath);
    log.verbose('homePath', homePath);

    const cmdObj = process.argv[process.argv.length - 5];
    // const cmdObj = arguments[arguments.length - 1];
    const packageName = SETTINGS[cmdObj];
    const packageVersion = 'lastest';
    const pkg = new Package({
        targetPath,
        // storePath,
        packageName,
        packageVersion
      });
    console.log(pkg);

}

module.exports = exec;