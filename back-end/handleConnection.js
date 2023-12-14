let playerNumber = 0;

function handleConnection(socket, players) {
    players[socket.id] = {
        x: 400,
        y: 400,
        rotation: 0,
        number: playerNumber,
        height: 0,
        width: 0,
        pos: 1 / 2,
        moveLeft: false,
        moveRight: false,
        dead: false,
    };

    playerNumber++;

    socket.on('disconnect', () => {
        delete players[socket.id];
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
    
    return players;
}

module.exports = { handleConnection };
