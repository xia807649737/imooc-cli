const cp = require('child_process');
const path = require('path');

//fork:Node(main) -> Node(child)
const child = cp.fork(path.resolve(__dirname, 'child.js'));
console.log('main process');

console.log('main pid:', process.pid);

// 主进程向子进程中发送消息
child.send('hello child process!', () => { 
    // 通信后可断开进程,通信结束,否则2遍出现等待
    // child.disconnect();
});
// 主进程接收子进程的信息
child.on('message', msg => { 
    console.log(msg);
})