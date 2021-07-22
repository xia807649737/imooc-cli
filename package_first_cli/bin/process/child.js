console.log('test fork');
console.log('child pid:', process.pid);

process.on('message', msg => { 
    console.log(msg);
})