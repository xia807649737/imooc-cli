const cp = require('child_process');
const path = require('path');

// console.log(cp);
cp.exec(path.resolve(__dirname, 'test.shell'), {
    timeout: 0,
}, function (err, stdout, stderr) {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
});

cp.execFile(path.resolve(__dirname, 'test.shell'), ['-al', '-bl'], ['-al|grep node_modules'], function (err, stdout, stderr) {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
});