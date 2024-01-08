const socket = io();

let players = {};
let balls = {};
let shake = 0;

socket.on('update', (server_players, server_balls) => {
    players = server_players;
    balls = server_balls;
})

socket.on('death', () => {
    shake += 4;
})
