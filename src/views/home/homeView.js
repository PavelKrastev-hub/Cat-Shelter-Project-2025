import fs from 'fs/promises';
import * as data from '../../data.js'

export async function homeView() {
   const html = await fs.readFile('./src/views/home/index.html', { encoding: 'utf-8' });
   const cats = await data.getCats();

   let catsHtml = '';
   if (cats.length > 0) {
      catsHtml = cats.map(cat => catTemplate(cat)).join('\n');
   } else {
      catsHtml = `<h3>There are no cats!</h3>`
   }

   const result = html.replaceAll('{{cats}}', catsHtml);
   
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
            <li class="btn edit"><a href="/cats/edit-cat/${cat.id}">Change Info</a></li>
            <li class="btn delete"><a href="/cats/shelter-cat/${cat.id}">New Home</a></li>
         </ul>
      </li>
   `
};