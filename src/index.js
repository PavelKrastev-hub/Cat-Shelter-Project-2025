import http from 'http';
import fs from 'fs/promises';
import { homeView } from './views/home/homeView.js';
import { addBreedView } from './views/addBreedView.js';
import { addCatView } from './views/addCatvView.js';

const server = http.createServer(async (req, res) => {
   let html;

   switch (req.url) {
      case '/':
         html = await homeView();
         break;
      case '/cats/add-breed':
         html = await addBreedView();
         break;
      case '/cats/add-cat':
         html = await addCatView();
         break;
      case '/styles/site.css':
         const siteCss = await fs.readFile('./src/styles/site.css', { encoding: 'utf-8' });

         res.writeHead(200, {
            "content-type": 'text/css',
         });

         res.write(siteCss);
         return res.end();
      default:
         return res.end();
   }

   res.writeHead(200, {
      'content-type': 'text/html',
   });

   res.write(html);

   res.end();
});

export function catTemplate(cat) {
   return `
      <li>
         <img src="${cat.imageUrl}" alt="${cat.name}">
         <h3></h3>
         <p><span>Breed: </span>${cat.breed}</p>
         <p><span>Description: </span>${cat.description}</p>
         <ul class="buttons">
            <li class="btn edit"><a href="">Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
         </ul>
      </li>
   `
};

server.listen(5200);

console.log('Server is listening on http://localhost:5200...');