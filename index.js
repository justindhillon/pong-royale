const express = require('express');
const app = express();
const port = 3030;

const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server);

const { handleConnection } = require('./back-end/handleConnection.js');
const { gameLoop } = require('./back-end/gameLoop.js');

let players = {};

let balls = {
  0: {
    x: 400,
    y: 400,
    r: 12,
    direction: Math.random() * 360,
    speed: 2,
    lastPlayer: undefined,
  },
}

io.on('connection', (socket) => {
  players = handleConnection(socket, players);
});

setInterval(() => {
  io.emit('update', players, balls);
  [players, balls] = gameLoop(players, balls, io);
}, 15)

app.use(express.static('dist'));

server.listen(port, () => {
  console.log('server running at http://localhost:' + port);
});
