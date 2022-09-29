const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const messagesRouter = require('./src/routes/messages.route');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

//middleware
app.use(morgan(':date[iso] :remote-addr :method :url :status - :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/messages', messagesRouter);


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