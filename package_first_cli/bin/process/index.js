const cp = require('child_process');
const path = require('path');
// console.log(cp);

const child = cp.spawn(path.resolve(__dirname, 'test.shell'), ['dir'], {
    cwd: path.resolve('..')
})

child.stdout.on('data', function(chunk){
    console.log('stdout', chunk.toString());
})

child.stderr.on('data', function (chunk) { 
    console.log('stderr', chunk.toString());
})