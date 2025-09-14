import fs from 'fs/promises';
import { catTemplate } from '../../index.js';
import cats from '../cats.js';

export async function homeView() {
   const html = await fs.readFile('./src/views/home/index.html', {encoding: 'utf-8'});

   const catsHtml = cats.map(cat => catTemplate(cat)).join('\n');

   const result = html.replace('{{cats}}', catsHtml);

   return result;
};