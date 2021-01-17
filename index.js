const http = require('http')

const server = new http.Server();


server.on('connection', () => {
  console.log('novo TCP')    
});

server.setTimeout(3000, () => {
  console.log('TCP END')
});



server.listen({
  hostname: '127.0.0.1',
  port: 3333
}, () => {
  console.log('Server is running...')
});