import fs from 'fs/promises';
import { getBreeds, getCat } from '../data.js';

export async function editCatView(catId) {
   const cat = await getCat(catId);

   let html = await fs.readFile('./src/views/editCat.html', { encoding: 'utf-8' });
   const breeds = await getBreeds();

   const breedHtml= breeds.map(breed => {
      const breedName = breed.name;
      const selected = breedName === cat.breed ? 'selected' : '';
      return `<option value="${breedName}" ${selected}>${breedName}</option>`;
   }).join('');

   html = html.replaceAll('{{name}}', cat.name);
   html = html.replaceAll('{{description}}', cat.description);
   html = html.replaceAll('{{imageUrl}}', cat.imageUrl);
   html = html.replaceAll('{{breeds}}', breedHtml);

   return html;
};

