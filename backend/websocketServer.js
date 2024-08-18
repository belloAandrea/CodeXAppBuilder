
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', ws => {
  ws.on('message', message => {
    console.log('received:', message);
    ws.send(`Echo: ${message}`);
  });

  ws.send('Connected to WebSocket server');
});

console.log('WebSocket server is running on ws://localhost:8080');
