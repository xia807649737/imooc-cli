import path from 'path';
import { exits } from './utils';

console.log(path.resolve('.'));
console.log(exits(path.resolve('.')));