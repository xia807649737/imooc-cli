'use strict';


const exec = () => {
    console.log('exec');
    console.log(process.env.CLI_TARGET_PATH);
    console.log(process.env.CLI_HOME_PATH);
}

module.exports = exec;
