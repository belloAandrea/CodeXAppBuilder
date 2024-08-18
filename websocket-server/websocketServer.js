
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', ws => {
  ws.on('message', message => {
    console.log('received:', message);
    // Simulate an AI response
    setTimeout(() => {
        ws.send(`AI response for: ${message}`);
    }, 1000); // Simulate delay
  });

  ws.send('Connected to WebSocket server');
});

console.log('WebSocket server is running on ws://localhost:8080');
