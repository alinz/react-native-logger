#!/usr/bin/env node
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 7654 });

wss.on('connection', function connection(ws) {
  console.log('logger is connected');
  ws.on('message', function incoming(value) {
    var message = JSON.parse(value);
    switch (message.type) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'function':
        console.log(message.payload);
        break;
      case 'array':
      case 'object':
        console.log(JSON.stringify(message.payload, null, 4));
    }
  });
});
