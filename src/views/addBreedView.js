import fs from 'fs/promises';

export async function addBreedView(params) {
   const addBreedHtml = await fs.readFile('./src/views/addBreed.html', { encoding: 'utf-8' });

   return addBreedHtml;
};