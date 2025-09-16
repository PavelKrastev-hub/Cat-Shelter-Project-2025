import fs from 'fs/promises';

export function addBreedView() {
   return fs.readFile('./src/views/addBreed.html', { encoding: 'utf-8' });
};

