let canvasSize = 800;

function setup() {
    canvasSize = Math.min(windowWidth, windowHeight)
    createCanvas(canvasSize, canvasSize);
    angleMode(DEGREES);
    rectMode(CENTER);
}

function windowResized() {
    canvasSize = Math.min(windowWidth, windowHeight)
    resizeCanvas(canvasSize, canvasSize);
}

function draw() {    
    // Clear Screen
    background(0);

    // Shake Screen On Death
    if (0 < shake) {
        shake--;
        if (shake % 2 === 0) {
            translate(1, 1);
        } else {
            translate(-1, -1);
        }
    }

    // Check if there are enough players to start the game
    const playerCount = Object.keys(players).length;
    if (!enoughPlayers(playerCount)) return;

    // Rotate Screen So Player Is On Bottom
    const alivePlayers = Object.entries(players)
                               .filter(player => !player[1].dead);

    const playerNumber = alivePlayers.findIndex(object => 
                                      object[0] === socket.id);

    translate(width / 2, height / 2);
    const angle = -360 / alivePlayers.length;
    rotate(angle * playerNumber);
    translate(-width / 2, -height / 2);

    // Scale the screen to diffrent sizes
    scale(canvasSize / 800);

    // Draw Players
    for (let id in players) {
        const player = players[id];
        if (!player.dead) {
            paddle(player.x, player.y, player.rotation, 
                   player.number, player.height, player.width);
        }
    }

    // Draw Balls
    for (let id in balls) {
        fill(255);
        const ball = balls[id];
        ellipse(ball.x, ball.y, ball.r*2);
    }
}
