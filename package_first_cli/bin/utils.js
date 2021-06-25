import pathExits from 'path-exists';

export function exists(p) {
    return pathExits.sync(p);
}