// Code From socket.io Docs
// https://socket.io/docs/v4/

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

let players = {}

app.use(express.static(__dirname + "/"));

io.on('connection', (socket) => {
  players[socket.id] = {
    x: 0,
    y: 0,
  };

  io.emit('updatePlayers', players);
  console.log(players);
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
