// (function (exports, require, module, __filename, __dirname) {  


// Sync
const http = require('http')
const events = require('./events');


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

events(server)


// Async
server.listen({
  host: '127.0.0.1',
  port: process.env.PORT || 3000
});




// Sync
// Limitar para evitar o 'Hash Collision Attack'
server.maxHeadersCount = 1000;

// Sync
// Limitar para evitar o 'Denial-of-Service Attack'
server.requestTimeout = 1000;

// Sync
server.setTimeout(1000);
  
// Sync
// Keep-Alive: timeout=1
server.keepAliveTimeout = 1000; // ms 
  
server.headersTimeout = 1000; // ms
  
  
  
  // });