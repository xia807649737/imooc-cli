import path from 'path';
import { exists } from './utils';

console.log(path.resolve('.'));
console.log(exists(path.resolve('.')));