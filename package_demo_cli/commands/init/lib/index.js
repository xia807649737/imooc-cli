'use strict';

const Command = require('@package_demo_cli/command');
const log = require('@package_demo_cli/log');
class InitCommand extends Command { 
    init(){
        this.projectName = this._argv[0] || "";
        this.force = !!this._force.force;
        // console.log(this.projectName, this.force)
    }
    exec() { 
        console.log('init的业务逻辑')
    }
}

// function init(projectName, cmdObj) {
//     console.log('init', projectName, cmdObj.force, process.env.CLI_TARGET_PATH);
// }

function init(argv) {
    // console.log('argv', argv)
    return new InitCommand(argv);
}

module.exports = init;
module.exports.InitCommand = InitCommand;