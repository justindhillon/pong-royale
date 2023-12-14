const socket = io();

let players = {};
let paddleNumber = 0;
let balls = {};

socket.on('update', (server_players, server_balls) => {
    players = server_players;
    balls = server_balls;

    let i = 0
    for (const id in players) {
        if (players[id].dead) continue;
        if (id === socket.id) {
            paddleNumber = i;
        }
        i++;
    }
})
