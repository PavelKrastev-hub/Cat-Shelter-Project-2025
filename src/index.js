import http from 'http';
import fs from 'fs/promises';
import { homeView } from './views/home/homeView.js';
import { addBreedView } from './views/addBreedView.js';
import { addCatView } from './views/addCatView.js';
import cats from './views/cats.js';

const server = http.createServer(async (req, res) => {
   let html;

   if(req.method === 'POST') {
      console.log('POST HAS BEEN MADE');
      let data = '';

      req.on('data', (chunk) => {
         data += chunk.toString();
      });

      req.on('end', () => {
         const searchParams = new URLSearchParams(data);
         const newCat = Object.fromEntries(searchParams.entries());

         cats.push(newCat);

         //Redirect to home page
      })
   };

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

server.listen(5200);

console.log('Server is listening on http://localhost:5200...');

'https://static.vecteezy.com/system/resources/thumbnails/022/963/918/small_2x/ai-generative-cute-cat-isolated-on-solid-background-photo.jpg'