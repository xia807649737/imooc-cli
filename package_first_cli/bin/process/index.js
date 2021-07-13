const cp = require('child_process');
// console.log(cp);
cp.exec('dir', function (err, stdout, stderr) { 
    console.log(err);
    console.log(stdout);
    console.log(stderr);
})
// const child = cp.exec('dir');
// console.log(child);
cp.execFile('dir')