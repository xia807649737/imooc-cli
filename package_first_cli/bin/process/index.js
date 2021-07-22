const cp = require('child_process');
const path = require('path');
// console.log(cp);

const child = cp.spawn(process.platform === 'win32' ? 'cnpm.cmd':'cnpm', ['install'], {
    cwd: path.resolve('/Users/v-hongxia.abcft/Desktop/imooc-cli/package_first_lib')
})

child.stdout.on('data', function(chunk){
    console.log('stdout', chunk.toString());
})

child.stderr.on('data', function (chunk) { 
    console.log('stderr', chunk.toString());
})