const socket = io();

let paddles = {};
let paddleNumber = 0;
let pucks = {};

socket.on('update', (players, balls) => {
    paddles = players;
    pucks = balls;

    let i = 0
    for (const id in players) {
        if (players[id].dead) continue;
        if (id === socket.id) {
            paddleNumber = i;
        }
        i++;
    }
})
