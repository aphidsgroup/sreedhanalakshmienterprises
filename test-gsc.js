const { spawn } = require('child_process');
const http = require('http');

console.log('Starting Next.js server...');
const server = spawn('npm', ['run', 'start'], { shell: true });

let isStarted = false;

server.stdout.on('data', (data) => {
  const str = data.toString();
  if (!isStarted && (str.includes('Ready in') || str.includes('Listening on'))) {
    isStarted = true;
    console.log('Server is ready. Fetching Google verification file...');
    setTimeout(() => {
      http.get('http://localhost:3000/google59e8d64e5b0f220e.html', (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          console.log(`\n=== Response (Status: ${res.statusCode}) ===\n${body}\n==================`);
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
