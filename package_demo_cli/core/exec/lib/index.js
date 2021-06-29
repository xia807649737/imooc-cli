'use strict';

const Package = require('@package_demo_cli/package');
const log = require('@package_demo_cli/log');

const exec = () => {
    const targetPath = process.env.CLI_TARGET_PATH;
    const homePath = process.env.CLI_HOME_PATH;
    log.verbose('targetPath', targetPath)
    log.verbose('homePath', homePath)
    const pkg = new Package();
    console.log(pkg);

}

module.exports = exec;