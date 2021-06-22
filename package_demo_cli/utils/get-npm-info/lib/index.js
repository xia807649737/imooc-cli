'use strict';
const axios = require('axios');
const urlJoin = require('url-join');
const semver = require('semver');

function getNpmInfo(npmName, registry) {
    // TODO
    // console.log(npmName);
    if (!npmName) return null;
    const regitryUrl = registry || getDefaultRegitry();
    const npmInfoUrl = urlJoin(regitryUrl, npmName);
    // console.log(npmInfoUrl);
    return axios.get(npmInfoUrl).then(res => {
        if (res.status === 200) {
            return res.data;
        }
        return null;
    }).catch(err => {
        return Promise.reject(err);
    });
}

function getDefaultRegitry(isOriginal = false) {
    return isOriginal ? 'http://registry.npmmjs.org' : 'http://registry.npm.taobao.org';
}

async function getNpmVersions(npmName, registry) {
    // return getNpmInfo(npmName, registry);
    const data = await getNpmInfo(npmName, registry);
    if (data) {
        return Object.keys(data.versions);
    } else {
        return [];
    }
}

module.exports = { getNpmInfo, getNpmVersions };