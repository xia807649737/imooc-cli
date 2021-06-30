'use strict';

const path = require('path');

const formatPath = (p) => {
    const sep = path.sep;
    if (p && typeof p === 'string') {
        if (sep === '/') {
            return p;
        } else {
            return p.replace(/\\/g, '/');
        }
    }
    return p;
}


module.exports = formatPath;
