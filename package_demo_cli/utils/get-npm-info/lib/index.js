'use strict';
const axios = require('axios');
const urlJoin = require('url-join');
const semver = require('semver');

function getNpmInfo(npmName, registry) {
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

function getSemverVersions(baseVersion, versions) {
    return versions.filter(version =>
        semver.satisfies(version, `^${baseVersion}`)
    ).sort((a, b) => semver.gt(b, a));
}

async function getNmpSemverVersion(baseVersion, npmName, registry) {
    const versions = await getNpmVersions(npmName, registry);
    const newVersions = getSemverVersions(baseVersion, versions);
    if (newVersions && newVersions.length > 0) {
        return newVersions[0];
    }
}

async function getNpmLatestVersion(npmName, registry) {
    const versions = await getNpmVersions(npmName, registry);
    if (versions) {
        return versions.sort((a, b) => semver.gt(b, a))[0];
    }
    return null;
}

module.exports = {
    getNmpSemverVersion,
    getDefaultRegitry,
    getNpmLatestVersion
};