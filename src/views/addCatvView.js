import fs from 'fs/promises';

export async function addCatView(params) {
   const addCatHtml = await fs.readFile('./src/views/addCat.html', { encoding: 'utf-8' });

   return addCatHtml;
};