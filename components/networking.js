const socket = io();

let paddles = {};

socket.on('updatePlayers', (players) => {
    paddles = {};
    let vertices = calculateVertices(Object.keys(players).length, 400, 400, 400);

    let i = 0
    for (const id in players) {
        let nextI = parseInt(i) + 1;
        if (Object.keys(vertices).length <= nextI) {
            nextI = 0;
        }
        paddles[id] = new Paddle({ x: vertices[i].x, y: vertices[i].y }, { x: vertices[nextI].x, y: vertices[nextI].y }, players[id].pos, vertices[i].rotation, players[id].number);
        i++;
    }

    for (const id in paddles) {
        if (!players[id]) {
            delete players[id];
        }
    }
})
