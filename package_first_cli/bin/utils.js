import pathExits from 'path-exists';

export const exists = (p) => {
    return pathExits.sync(p);
}