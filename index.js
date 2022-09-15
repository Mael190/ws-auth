const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      socket.broadcast.emit('chat message', msg);
    });
  socket.on('write', (write) => {
    socket.broadcast.emit('write', write);
    });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});