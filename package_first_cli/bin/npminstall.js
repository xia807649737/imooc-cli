const npminstall = require('npminstall');
const path = require('path');
const userHome = require('user-home');
// console.log('userHome',userHome);

npminstall({
    root: path.resolve(userHome, '.package_demo_cli'),
    storeDir: path.resolve(userHome, '.package_demo_cli', 'node_modules'),
    registry: "https://registry.npmjs.org",
    pkgs: [
        { name: 'foo', version: '~1.0.0'},
    ],
})