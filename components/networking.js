const socket = io();

let paddles = {}

socket.on('updatePlayers', (players) => {
    console.log(players);
    let vertices = calculateVertices(Object.keys(players).length, 400, 400, 400);

    for (let i in vertices) {
        let nextI = parseInt(i) + 1;
        if (Object.keys(vertices).length <= nextI) {
            nextI = 0;
        }
        paddles[i] = new Paddle({ x: vertices[i].x, y: vertices[i].y }, { x: vertices[nextI].x, y: vertices[nextI].y }, vertices[i].rotation, i);
    }
})
