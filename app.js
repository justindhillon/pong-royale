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
const { collisionDetection } = require('./back-end/collisionDetection.js');
const { getDistance } = require('./back-end/getDistance.js');

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
    speed: 2,
    lastPlayer: undefined,
  },
}

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
    dead: false,
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
  let alivePlayerCount = 0;
  for (let id in players) {
    if (players.hasOwnProperty(id)) {
      if (!players[id].dead) {
        alivePlayerCount++;
      }
    }
  }

  // Reset the game
  if (alivePlayerCount === 0) {
    for (let id in players) {
      if (players.hasOwnProperty(id)) {
        players[id].dead = false;
      }
    }
    return;
  }

  const vertices = calculateVertices(alivePlayerCount, 400, 400, 400);
  const gameBoundaryVertices = calculateVertices(alivePlayerCount, 450, 400, 400);

  i = 0;
  for (const id in players) {
    if (players[id].dead) continue;

    let nextI = parseInt(i) + 1;
    if (Object.keys(vertices).length <= nextI) {
      nextI = 0;
    }

    [players[id].x, players[id].y] = paddle({ x: vertices[i].x, y: vertices[i].y }, { x: vertices[nextI].x, y: vertices[nextI].y }, players[id].pos);
    players[id].rotation = vertices[i].rotation;

    const xydistance = getDistance(vertices[nextI].x, vertices[nextI].y, vertices[i].x, vertices[i].y);
    players[id].height = xydistance/4;
    players[id].width = xydistance/16;

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

    // Colision Detection
    const xDistance = vertices[nextI].x - vertices[i].x;
    const yDistance = vertices[nextI].y - vertices[i].y;
    const startX = vertices[i].x + (players[id].pos - 1/8) * xDistance;
    const endX = vertices[i].x + (players[id].pos + 1/8) * xDistance;
    const startY = vertices[i].y + (players[id].pos - 1/8) * yDistance;
    const endY = vertices[i].y + (players[id].pos + 1/8) * yDistance;

    for (const id2 in balls) {
      // Check if player lost
      if (collisionDetection(balls[id2].x, balls[id2].y, balls[id2].r, gameBoundaryVertices[i].x, gameBoundaryVertices[i].y, gameBoundaryVertices[nextI].x, gameBoundaryVertices[nextI].y)) {
        // Resets ball
        balls[id2].x = 400;
        balls[id2].y = 400;
        balls[id2].direction = Math.random() * 360;
        balls[id2].speed = 0.25;
        balls[id2].lastPlayer = undefined;

        // Removes player
        players[id].dead = true;
      }

      // Check for paddle colisions
      if (collisionDetection(balls[id2].x, balls[id2].y, balls[id2].r, startX, startY, endX, endY)) {
        console.log(players[id].rotation, balls[id2].direction);

        // Check for false positive
        if (balls[id2].lastPlayer === id) continue;

        balls[id2].lastPlayer = id

        // let distance = getDistance(balls[id2].x, balls[id2].y, players[id].x, players[id].y);
        // distance = distance / players[id].height * 2;

        const direction = players[id].rotation * 2 + 360 - balls[id2].direction;

        balls[id2].direction = direction;
        balls[id2].speed += 0.5;
      }
    }

    i++;
  }

  for (const id in balls) {
    const direction = balls[id].direction * (Math.PI / 180);
    const moveX = Math.cos(direction) * balls[id].speed;
    const moveY = Math.sin(direction) * balls[id].speed;

    balls[id].x += moveX;
    balls[id].y += moveY;

    // If the ball is ever off screen for some reason
    if (balls[id].x < -100 || 900 < balls[id].x || balls[id].y < -100 || 900 < balls[id].y) {
      // Reset ball
      balls[id].x = 400;
      balls[id].y = 400;
      balls[id].direction = Math.random() * 360;
      balls[id].speed = 2;
      balls[id2].lastPlayer = undefined;
    }
  }

  io.emit('update', players, balls);
}, 15)

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
