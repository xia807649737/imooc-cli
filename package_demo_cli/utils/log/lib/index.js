'use strict';

//log定制
const log = require('npmlog');
// 判断debug模式
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';

//修改前缀
log.heading = 'imooc';
log.headingStyle = { fg: 'blue' };

log.addLevel('say', 2000, { fg: 'green' });

//添加自定义模式
log.addLevel('success', 2000, { fg: 'red', bold: true }); 

module.exports = log;
