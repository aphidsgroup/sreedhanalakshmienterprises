const { spawn } = require('child_process');
const http = require('http');

console.log('Starting Next.js server to test sitemap.xml...');
const server = spawn('npm', ['run', 'start'], { shell: true });

let isStarted = false;

server.stdout.on('data', (data) => {
  const str = data.toString();
  if (!isStarted && (str.includes('Ready in') || str.includes('Listening on'))) {
    isStarted = true;
    console.log('Server is ready. Fetching sitemap.xml...');
    setTimeout(() => {
      http.get('http://localhost:3000/sitemap.xml', (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          console.log(`\n=== Response (Status: ${res.statusCode}) ===\n${body}\n==================`);
          
          const expectedUrls = [
            '/',
            '/today-cement-price',
            '/today-steel-price',
            '/today-bricks-and-blocks-price',
            '/today-sand-and-aggregates-price',
            '/today-fabrication-materials-price',
            '/construction-materials-supplier-in-chennai',
            '/construction-materials-supplier-in-kilpauk',
            '/construction-materials-supplier-in-mangadu'
          ];
          
          let allFound = true;
          for (const url of expectedUrls) {
            if (!body.includes(url)) {
              console.error(`ERROR: Missing URL: ${url}`);
              allFound = false;
            }
          }
          
          if (allFound) {
             console.log("SUCCESS: All expected URLs are present in the sitemap.");
          }
          
          server.kill();
          process.exit(0);
        });
      }).on('error', (err) => {
        console.error('Error fetching file:', err.message);
        server.kill();
        process.exit(1);
      });
    }, 2000);
  }
});

server.stderr.on('data', (data) => {
  // console.error(data.toString());
});
