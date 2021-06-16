#! /usr/bin/env node
// const utils = require('@package_demo_cli/utils')
// utils();
// console.log("hello package_demo_cli!")


const importLocal = require('import-local');

if(importLocal(__filename)){
    require('npmlog').info('core','正在使用 package_demo_cli 本地版本')
} else {
    require('../lib/core')(process.argv.slice(2))
}