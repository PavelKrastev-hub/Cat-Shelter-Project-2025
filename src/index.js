import http from 'http';
import fs from 'fs/promises';

async function homeView(params) {
   const homeHtml = await fs.readFile('./src/views/home/index.html', { encoding: 'utf-8' });
   
   return homeHtml;
};

async function addBreedView(params) {
   const addBreedHtml = await fs.readFile('./src/views/addBreed.html', {encoding: 'utf-8'});
   
   return addBreedHtml;
};

async function addCatView(params) {
   const addCatHtml = await fs.readFile('./src/views/addCat.html', {encoding: 'utf-8'});
   
   return addCatHtml;
}

const server = http.createServer(async (req, res) => {

   switch (req.url) {
      case '/':
         const homeHtml = await homeView();

         res.writeHead(200, {
            'content-type': 'text/html',
         })

         res.write(homeHtml);
      break;
      case '/styles/site.css':
         const siteCss = await fs.readFile('./src/styles/site.css', {encoding: 'utf-8'});

      res.writeHead(200, {
         "content-type": 'text/css',
      });

      res.write(siteCss)
      break;
      case '/cats/add-breed':
         const addBreedHtml = await addBreedView();

         res.writeHead(200, {
            "content-type": 'text/html',
         });

         res.write(addBreedHtml);
      break;
      case '/cats/add-cat':
         const addCatHtml = await addCatView();

         res.writeHead(200, {
            "content-type": 'text/html',
         });

         res.write(addCatHtml);
      break;
      default:
      break;
   }
   res.end();
});

server.listen(5200);

console.log('Server is listening on http://localhost:5200...');