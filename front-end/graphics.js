let canvasSize = 800;

function setup() {
    canvasSize = Math.min(windowWidth, windowHeight)
    createCanvas(canvasSize, canvasSize);
    angleMode(DEGREES);
}

function windowResized() {
    canvasSize = Math.min(windowWidth, windowHeight)
    resizeCanvas(canvasSize, canvasSize);
}

let i = 0;

function draw() {
    push();
    
    // Rotate Screen So Player Is On Bottom
    let alivePaddleCount = 0;
    for (let id in paddles) {
        if (paddles.hasOwnProperty(id)) {
            if (!paddles[id].dead) {
                alivePaddleCount++;
            }
        }
    }

    if (3 <= Object.keys(paddles).length) {
        translate(width / 2, height / 2);
        const angle = -360 / alivePaddleCount;
        rotate(angle * (paddleNumber));
        translate(-width / 2, -height / 2);
    }
    
    // Scale the screen to diffrent sizes
    scale(canvasSize / 800);

    // Black Background
    background(0);

    if (Object.keys(paddles).length < 3) {
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('We need ' + (3 - Object.keys(paddles).length) + " more players to start", 250, 400, 300);
        pop();
        return;
    }

    // Draw Paddles
    for (let id in paddles) {
        if (!paddles[id].dead) {
            paddle(paddles[id].x, paddles[id].y, paddles[id].rotation, paddles[id].number, paddles[id].height, paddles[id].width);
        }
    }

    // Draw Pucks
    for (let id in pucks) {
        fill(255);
        ellipse(pucks[id].x, pucks[id].y, pucks[id].r*2);
    }

    pop();
}
