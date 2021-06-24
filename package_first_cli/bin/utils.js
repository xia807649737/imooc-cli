import pathExits from 'path-exists';

export function exits(p) {
    return pathExits.sync(p);
}