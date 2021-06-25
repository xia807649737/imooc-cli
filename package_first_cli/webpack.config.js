const path = require('path');
module.exports = {
    entry: './bin/core.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'core.js'
    },
    mode: 'production',
    target: 'node', // 默认是web,但是在web环境下不会提供内置库path
}