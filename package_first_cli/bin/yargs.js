
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { alias } = require('yargs');

const arg = hideBin(process.argv);
// console.log(hideBin(process.argv));

yargs(arg)
    .usage('Usage: package_first_cli[command] <options>')
    .strict()
    .alias('h','help')
    .alias('v', 'version')
    // .alias('r', 'registry')
    // .alias('d','debug')
    .options({
        debug:{
            type: "boolean",
            decribe: "Bootstrap debug node",
            alias: "d"
        }
    })
    .option('registry', {
        type: "string",
        decribe: "Define blobel registry",
        alias: "r"
    })
    .group(['debug'], 'Dev Options:')
    .group(['registry'], 'Dev Options:')
    .argv;
