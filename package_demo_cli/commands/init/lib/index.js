'use strict';

const Command = require('@package_demo_cli/command');
class InitCommand extends Command { 
    
}

// function init(projectName, cmdObj) {
//     console.log('init', projectName, cmdObj.force, process.env.CLI_TARGET_PATH);
// }

function init(argv) {
    return new InitCommand(argv);
}

module.exports = init;
module.exports.InitCommand = InitCommand;