// (function (exports, require, module, __filename, __dirname) {  


// Sync
const http = require('http')


// Sync
// Class: http.Server
const server = new http.Server((message, response) => {
  response.writeHead(200, { 
    'Content-Type': 'text/plain',
    'Trailer': 'Content-MD5' 
  });

  switch (message.url) {
    case '/': {
      response.write(`${message.method} ${message.url}`)
      break;
    }
    case '/a': {
      response.write(`${message.method} ${message.url}`)
      break;
    }
  }
  // TODO
  //response.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });

  response.end(()=> {
    console.log(`\t[http.ServerResponse] Reposta concluída...`)
  });

  // Async
  // Class: http.ServerResponse
  // Event: 'close'
  response.on('close', () => {
    console.log(`\t[http.ServerResponse] [Event] close...`)
    
  })

  // console.log(message.headers)
  // console.log(message.httpVersion)
  //console.log(message.rawHeaders)
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
// Class: http.Server
// Event: 'clientError'
server.on('clientError', (exception, socket) => {
  console.log('\t[http.Server] [Event] clientError...')
  
  let message;
  switch (exception.code) {
    case 'HPE_HEADER_OVERFLOW': {
        message = 'HTTP/1.1 431 Request Header Fields Too Large'
      break;
    }
    case 'ERR_HTTP_REQUEST_TIMEOUT': {
        message = 'HTTP/1.1 408 Request Timeout';
      break;
    }
    default: {
        message = 'HTTP/1.1 400 Bad Request';
      break;
    }
  }
 
  // Verifica se o socket aida é gravável
  if (socket.writable)
    socket.end(message + '\r\n\r\n',() => {
      console.log(`\t[Socket] Envio o pacote FIN`);
    });
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
  console.log(`\t[Event] ${request}`) 
});

// Async
// Event: 'upgrade'
server.on('upgrade', (request, socket, head) => {
  console.log('\t[Event] upgrade...')
});


setTimeout(() => {
  // Async
  server.close(() => {
    console.log('\t[htpp.Server] Todas as conexões forão encerradas')
    console.log('--- FIM ---')
  })
}, 1000);

// Async
// Class: http.ClientRequest
// Event: 'timeout'
server.on('timeout', () => {
  console.log('\t[Event] timeout...')
})


// Async
server.listen({
  host: '127.0.0.1',
  port: process.env.PORT || 3000
});


// Async
// Classe: net.Server
// Event: 'listening'
server.on('listening', () => {
  console.log(' --- Início ---')
  console.log('\t[net.Server] [Event] listening...')
  console.log('\t[http.Server] [Socket] Esperando por conexões...')
  console.log(`\t\tIP: ${server.address().address}`)
  console.log(`\t\tPorta: ${server.address().port}`)
  // console.log(`\t[http.Server] ${server.listening}`);
})

// Sync
// Limitar para evitar o 'Hash Collision Attack'
server.maxHeadersCount = 10000;

// Sync
// Limitar para evitar o 'Denial-of-Service Attack'
server.requestTimeout = 1;

// Sync
server.setTimeout(5000);
  
  // Sync
  // Keep-Alive: timeout=1
  server.keepAliveTimeout = 10000; // ms 
  
  server.headersTimeout = 10000; // ms
  
  
  
  // });