module.exports = (server) => {
  // ----------------------------------------------------------

  // Async
  // Event: 'connection'
  server.on('connection', (socket) => {
    console.log('\t[Event] connection...')
  });

// ----------------------------------------------------------

  // Async
  // Event: 'close'
  server.on('close', () => {
    console.log('\t[Event] close...')
  });
  
// ----------------------------------------------------------

// Async
// Event: 'checkContinue'
server.on('checkContinue', (request, response) => {
  console.log('\t[Event] checkContinue...')
});

// ----------------------------------------------------------

// Async
// Event: 'checkExpectation'
server.on('checkExpectation', (request, response) => {
  console.log('\t[Event] checkExpectation...')
});

// ----------------------------------------------------------

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

// ----------------------------------------------------------

// Async
// Event: 'request'
server.on('request', (request, response) => {
  console.log('\t[Event] request...')
  console.log(`\t[Event] ${request}`) 
});

// ----------------------------------------------------------

// Async
// Event: 'upgrade'
server.on('upgrade', (request, socket, head) => {
  console.log('\t[Event] upgrade...')
});

// ----------------------------------------------------------

setTimeout(() => {
  // Async
  server.close(() => {
    console.log('\t[htpp.Server] Todas as conexões forão encerradas')
    console.log('--- FIM ---')
  })
}, 1000);

// ----------------------------------------------------------

// Async
// Class: http.ClientRequest
// Event: 'timeout'
server.on('timeout', () => {
  console.log('\t[Event] timeout...')
})

// ----------------------------------------------------------

// Async
// Classe: net.Server
// Event: 'listening'
server.on('listening', () => {
  const { address, port } = server.address(); 
  console.log(' --- Início ---')
  console.log('\t[net.Server] [Event] listening...')
  console.log('\t[http.Server] [Socket] Esperando por conexões...')
  console.log(`\t\tIP: ${address}`)
  console.log(`\t\tPorta: ${port}`)
  // console.log(`\t[http.Server] ${server.listening}`);
})

// ----------------------------------------------------------
}