import fs from 'fs/promises';
import { getCat } from '../data.js';

export async function catShelterView(catId) {
   const cat = await getCat(catId);

    if (!cat) {
      return `<h2>Cat not found!</h2>`;
   }

   let html = await fs.readFile('./src/views/catShelter.html', {encoding: 'utf-8'});

   html = html.replaceAll('{{name}}', cat.name);
   html = html.replaceAll('{{description}}', cat.description);
   html = html.replaceAll('{{imageUrl}}', cat.imageUrl);

   return html;
}