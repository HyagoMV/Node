// (function (exports, require, module, __filename, __dirname) {  


// Sync
const http = require('http')


// Sync
// Class: http.Server
const server = new http.Server((req, res) => {
  switch (req.url) {
    case '/': {
      res.write(`${req.method} ${req.url}`)
      break;
    }
    case '/a': {
      res.write(`${req.method} ${req.url}`)
      break;
    }
  }
  res.end();
});

// Async
// Event: 'checkContinue'
server.on('checkContinue', (request, response) => {
  console.log('\t[Event] checkContinue...')
});

// Async
// Event: 'checkExpectation'
server.on('checkExpectation', (request, response) => {
  console.log('\t[Event] checkExpectation...')
});

// Async
// Evento: 'clientError'
server.on('clientError', (exception, socket) => {
  console.log('\t[Event] clientError...')
});

// Async
// Event: 'close'
server.on('close', () => {
  console.log('\t[Event] close...')
});

// Async
// Event: 'connection'
server.on('connection', (socket) => {
  console.log('\t[Event] connection...')
});

// Async
// Event: 'request'
server.on('request', (request, response) => {
  console.log('\t[Event] request...')
});

// Async
// Event: 'upgrade'
server.on('upgrade', (request, socket, head) => {
  console.log('\t[Event] upgrade...')
});


setTimeout(()=>{
  // Async
  server.close(() => {
    console.log('\t[Servidor] Todas as conexão forão encerradas')
  })
}, 10000); 

// Async
// Class: http.ClientRequest
// Event: 'timeout'
server.on('timeout', () => {
  console.log('\t[Event] timeout...')
})

server.headersTimeout  = 1; // ms

// Async
server.listen({
  host: '127.0.0.1',
  port:  process.env.PORT || 3000
});

// Classe: net.Server
// Event: 'listening'
server.on('listening', () => {
  console.log('\t[net.Server] [Event] listening...')
  console.log('\t[Servidor] Está em execução...')
  console.log(`\t[Servidor] IP: ${server.address().address}`)
  console.log(`\t[Servidor] Porta: ${server.address().port}`)
})


// });