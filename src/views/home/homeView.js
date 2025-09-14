import fs from 'fs/promises';

export async function homeView() {
   const html = await fs.readFile('./src/views/home/index.html', {encoding: 'utf-8'});

   return html;
};