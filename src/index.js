import http from 'http';
import fs from 'fs/promises';
import { homeView } from './views/home/homeView.js';
import { addBreedView } from './views/addBreedView.js';
import { addCatView } from './views/addCatView.js';
import { getCat, saveCat, editCat } from './data.js';
import { editCatView } from './views/editCatView.js';
import { catShelterView } from './views/catShelterView.js';

const server = http.createServer(async (req, res) => {
   let html;

   if(req.method === 'POST') {
      let data = '';

      req.on('data', (chunk) => {
         data += chunk.toString();
      });

      req.on('end', async () => {
         const searchParams = new URLSearchParams(data);
         const catResult = Object.fromEntries(searchParams.entries());

         if (req.url === '/cats/add-cat') {
            await saveCat(catResult);
         } else if (req.url.startsWith('/cats/edit-cat')) {
            const segments = req.url.split('/');
            const catId = Number(segments[3]);

            await editCat(catId, catResult);
         }

         
         // Redirect to home page
         res.writeHead(302, {
            'location': '/',
         });

         res.end();
      })
      return;
   };

   if (req.url === '/') {
      html = await homeView();
   } else if (req.url === '/cats/add-breed') {
      html = await addBreedView();
   } else if (req.url === '/cats/add-cat') {
      html = await addCatView()
   } else if (req.url.startsWith('/cats/edit-cat')) {
      const segments = req.url.split('/');
      const catId = Number(segments[3]);

      html = await editCatView(catId);
   } else if (req.url.startsWith('/cats/shelter-cat')) {
      const segments = req.url.split('/');
      const catId = Number(segments[3]);

      html = await catShelterView(catId);
   }else if (req.url === '/styles/site.css') {
      const siteCss = await fs.readFile('./src/styles/site.css', { encoding: 'utf-8' });

         res.writeHead(200, {
            "content-type": 'text/css',
            "cache-control": 'max-age=10'
         });

         res.write(siteCss);
         return res.end();
   } else {
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