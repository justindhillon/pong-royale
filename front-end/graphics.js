let canvasSize = 800;

function setup() {
    canvasSize = Math.min(windowWidth, windowHeight)
    createCanvas(canvasSize, canvasSize);
    background(0);
    angleMode(DEGREES);
}

function windowResized() {
    canvasSize = Math.min(windowWidth, windowHeight)
    resizeCanvas(canvasSize, canvasSize);
}

let i = 0;

function draw() {    
    // Rotate Screen So Player Is On Bottom
    let alivePaddleCount = 0;
    for (let id in players) {
        if (players.hasOwnProperty(id)) {
            if (!players[id].dead) {
                alivePaddleCount++;
            }
        }
    }

    if (3 <= Object.keys(players).length) {
        translate(width / 2, height / 2);
        const angle = -360 / alivePaddleCount;
        rotate(angle * (paddleNumber));
        translate(-width / 2, -height / 2);
    }
    
    // Scale the screen to diffrent sizes
    scale(canvasSize / 800);

    // Black Background
    background(0);

    if (Object.keys(players).length < 3) {
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('We need ' + (3 - Object.keys(players).length) + " more players to start", 250, 400, 300);
        pop();
        return;
    }

    // Draw Players
    for (let id in players) {
        if (!players[id].dead) {
            paddle(players[id].x, players[id].y, players[id].rotation, players[id].number, players[id].height, players[id].width);
        }
    }

    // Draw Balls
    for (let id in balls) {
        fill(255);
        ellipse(balls[id].x, balls[id].y, balls[id].r*2);
    }
}
