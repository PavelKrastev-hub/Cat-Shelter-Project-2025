import fs from 'fs/promises';
import cats from '../cats.js';

export async function homeView() {
   const html = await fs.readFile('./src/views/home/index.html', { encoding: 'utf-8' });

   const catsHtml = cats.map(cat => catTemplate(cat)).join('\n');
   let result = '';

   if (cats.length > 0) {
      result = html.replaceAll('{{cats}}', catsHtml);
   } else {
      result = html.replaceAll('{{cats}}', `<h3></>There are no cats!</h3>`);
   }
   
   return result;
};

function catTemplate(cat) {
   return `
      <li>
         <img src="${cat.imageUrl}" alt="">
         <h3>${cat.name}</h3>
         <p><span>Breed: </span>${cat.breed}</p>
         <p><span>Description: </span>${cat.description}</p>
         <ul class="buttons">
            <li class="btn edit"><a href="">Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
         </ul>
      </li>
   `
};