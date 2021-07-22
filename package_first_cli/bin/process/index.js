const cp = require('child_process');
const path = require('path');
// console.log(cp);

//spwan:耗时任务(比如:npm install),需要不断更新日志
const child = cp.spawn(process.platform === 'win32' ? 'cnpm.cmd':'cnpm', ['install'], {
    cwd: path.resolve('/Users/v-hongxia.abcft/Desktop/imooc-cli/package_first_lib')
})

child.stdout.on('data', function(chunk){
    console.log('stdout', chunk.toString());
})

child.stderr.on('data', function (chunk) { 
    console.log('stderr', chunk.toString());
})

//exec/execFile:开销较小的任务
cp.exec('cnpm install',{
    cwd: path.resolve('/Users/v-hongxia.abcft/Desktop/imooc-cli/package_first_lib'),
}, function (err, stdout, stderr) { 
    console.log(err);
    console.log(stdout);
    console.log(stderr);
})