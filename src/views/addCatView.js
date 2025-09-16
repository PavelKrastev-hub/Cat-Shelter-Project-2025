import fs from 'fs/promises';
import { getBreeds } from '../data.js';

export async function addCatView() {
   const html = await fs.readFile('./src/views/addCat.html', { encoding: 'utf-8' });
   const breeds = await getBreeds();

   let breedsHtml = '';

   if (breeds.length > 0) {
      breedsHtml = breeds.map(breed => breedTemplate(breed));
   } 

   const result = html.replaceAll('{{breeds}}', breedsHtml);

   return result;
};

function breedTemplate(breed) {
   return `<option value="${breed.name}">${breed.name}</option>`;
}