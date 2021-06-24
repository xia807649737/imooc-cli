#!/usr/bin/env node

const commander = require('commander');
const { option, describe, command } = require('yargs');

const pkg = require('../package.json');

//获取commander的单例
// const { program } = commander;
const program = new commander.Command();

program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .option('-e, --envName <envName>', '获取环境变量名称')

// console.log(program._optionValues.debug); 
// console.log(program._optionValues.envName);    
// program.outputHelp();
// console.log(program.opts());

// ***command 注册命令,在外部指定指令和参数
const clone = program.command('clone <source> [destination]');
// const clone = program.command('clone <source> <destination>');
clone
    .description('clone a repository')
    .option('-f, --force', '是否强制克隆')
    .action((source, destination, cmdObj) => {
        console.log('do clone', source, destination, cmdObj.force);
    });

//***addCommand 注册子命令,在内部指定指令和参数
const service = new commander.Command('service');
service
    .command('start [port]')
    .description('start service at some port')
    .action(port => {
        console.log('do service start', port)
    });
service
    .command('stop')
    .description('stop service')
    .action(() => {
        console.log('please stop service');
    });


program.addCommand(service);

//强制用户要输入一个参数
// program
//     .arguments('<cmd> [options]')
//     .description('test command', {
//         cmd: 'command to run',
//         option: 'options for command'
//     })
//     .action((cmd, env) => { 
//         console.log(cmd, env);
//     });

//自定义help信息
// program.helpInformation = () => { 
//     return ''
// }

// program.on('--help', () => { 
//     console.log('your helpful information');
// })

//实现debug模式
program.on('option:debug', () => {
    if (program._optionValues.debug) {
        process.env.LOG_LEVEL = 'verbose';
    }
    console.log(process.env.LOG_LEVEL);
})

//对未知命令监听
program.on('command:*', obj => { 
    // console.log(obj);
    console.error(`未知的命令: ${obj[0]}`);
    // console.log(program.commands[0].name());
    const availableCommands = program.commands.map(cmd => cmd.name());
    console.log(availableCommands);
    console.log(`可用命令: ${availableCommands.join(',')}`)
})

program
    .parse(process.argv);