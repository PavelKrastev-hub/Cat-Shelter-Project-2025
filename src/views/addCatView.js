import fs from 'fs/promises';

export function addCatView() {
   return fs.readFile('./src/views/addCat.html', { encoding: 'utf-8' });
};