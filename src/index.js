import http from 'http';
import fs from 'fs/promises';
import { homeView } from './views/home/homeView.js';
import { addBreedView } from './views/addBreedView.js';
import { addCatView } from './views/addCatView.js';
import { saveCat } from './data.js';

const server = http.createServer(async (req, res) => {
   let html;

   if(req.method === 'POST') {
      let data = '';

      req.on('data', (chunk) => {
         data += chunk.toString();
      });

      req.on('end', async () => {
         const searchParams = new URLSearchParams(data);
         const newCat = Object.fromEntries(searchParams.entries());

         await saveCat(newCat);
         // TODO Redirect to home page
         res.writeHead(302, {
            'location': '/',
         });

         res.end();
      })
      return;
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