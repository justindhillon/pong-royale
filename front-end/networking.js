const socket = io();

let players = {};
let balls = {};

socket.on('update', (server_players, server_balls) => {
    players = server_players;
    balls = server_balls;
})

socket.on('death', () => {
    death.play();
})

socket.on('hit', () => {
    hit.play();
})
