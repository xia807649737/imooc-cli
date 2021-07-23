console.log('child process');

console.log('child pid:', process.pid);

// 子进程中监听message事件
process.on('message', msg => { 
    console.log(msg);
})
// 子进程向主进程中发送信息
process.send('hello main process!');