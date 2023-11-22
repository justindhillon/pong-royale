// Code From socket.io Docs
// https://socket.io/docs/v4/

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const { calculateVertices } = require('./back-end/calculateVertex.js');
const { paddle } = require('./back-end/paddle.js');

const { System } = require("detect-collisions");
const system = new System();

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

let players = {}
let playerNumber = 0;

let balls = {
  0: {
    x: 400,
    y: 400,
    r: 12,
    direction: Math.random() * 360,
    speed: 4,
    object: system.createCircle({x: 400, y: 400}, 12),
  }
}

system.createCircle({x: 400, y: 400}, 12),

app.use(express.static(__dirname + "/"));

io.on('connection', (socket) => {
  players[socket.id] = {
    x: 400,
    y: 400,
    rotation: 0,
    number: playerNumber,
    height: 0, 
    width: 0,
    pos: 1/2,
    moveLeft: false,
    moveRight: false,
  };

  playerNumber++;

  io.emit('update', players, balls);

  socket.on('disconnect', (reason) => {
    delete players[socket.id];
    io.emit('update', players, balls);
  });

  socket.on('keydown', (direction) => {
    switch (direction) {
      case 'left':
        players[socket.id].moveLeft = true;
        break
      case 'right':
        players[socket.id].moveRight = true;
        break
    }
  })

  socket.on('keyup', (direction) => {
    switch (direction) {
      case 'left':
        players[socket.id].moveLeft = false;
        break
      case 'right':
        players[socket.id].moveRight = false;
        break
    }
  })
});

setInterval(() => {
  const vertices = calculateVertices(Object.keys(players).length, 400, 400, 400);

  i = 0;
  for (const id in players) {
    let nextI = parseInt(i) + 1;
    if (Object.keys(vertices).length <= nextI) {
      nextI = 0;
    }

    [players[id].x, players[id].y] = paddle({ x: vertices[i].x, y: vertices[i].y }, { x: vertices[nextI].x, y: vertices[nextI].y }, players[id].pos);

    players[id].rotation = vertices[i].rotation;

    const xDistance = vertices[nextI].x - vertices[i].x;
    const yDistance = vertices[nextI].y - vertices[i].y;

    // Pythagorean Theorem
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    
    players[id].height = distance/4;
    players[id].width = distance/16;

    if (players[id].moveLeft) {
      if (players[id].pos <= 27/32) {
        players[id].pos += 1/60;
      }
    }
    if (players[id].moveRight) {
      if (5/32 <= players[id].pos) {
        players[id].pos -= 1/60;
      }
    }

    i++;
  }

  for (const id in balls) {
    const direction = balls[id].direction * (180 / Math.PI);
    const moveX = Math.cos(direction) * balls[id].speed;
    const moveY = Math.sin(direction) * balls[id].speed;

    balls[id].x += moveX;
    balls[id].y += moveY;

    balls[id].object.setPosition(balls[id].x, balls[id].y);
  }

  io.emit('update', players, balls);
}, 15)

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
