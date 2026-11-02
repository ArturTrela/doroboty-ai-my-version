import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stat, readFile } from 'node:fs/promises';
const root = path.resolve(fileURLToPath(new URL('../', import.meta.url))); 
const port = Number(process.env.UI_KIT_PORT || 8952);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
const server = http.createServer(async (req,res) => {
  try {
    const requestPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root,'.'+requestPath);
    if(file !== root && !file.startsWith(root+path.sep)) {res.writeHead(403);res.end('Forbidden');return;}
    if((await stat(file)).isDirectory()) file=path.join(file,'index.html');
    const content=await readFile(file);
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(content);
  } catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');}
});
server.listen(port,'127.0.0.1',()=>process.stdout.write(`DoRoboty UI agent kit: http://127.0.0.1:${port}/\n`));
