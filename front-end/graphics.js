const colors = [
    "#c61111",
    "#132ed2", 
    "#11802d", 
    "#ee54bb", 
    "#f07d0d",
    "#f6f657",
    "#d6e0f0",
    "#6b2fbc",
    "#71491e",
    "#38e2dd",
    "#50f039",
    "#50f039",
    "#50f039",
    "#fffebe",
    "#708496",
    "#928776",
    "#ec7578",
]

function paddle(x, y, rotation, color, height, width) {
    push();
    translate(x, y);
    angleMode(DEGREES);
    rotate(rotation);
    fill(colors[color % 17]);
    rectMode(CENTER);
    rect(0, 0, height, width);
    pop();
}

let canvasSize = 800;

function setup() {
    canvasSize = Math.min(windowWidth, windowHeight)
    createCanvas(canvasSize, canvasSize);
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

    angleMode(DEGREES);
    translate(width / 2, height / 2);
    const angle = -360 / alivePaddleCount;
    rotate(angle * (paddleNumber));
    translate(-width / 2, -height / 2);
    
    // Scale the screen to diffrent sizes
    scale(canvasSize / 800);

    // Black Background
    background(0);

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

// Documentation:
// https://editor.p5js.org/mrhaikuswan/sketches/hzMgNbSu_
function keyPressed() {
    switch (key) {
        case 'a':
            socket.emit('keydown', 'left');
            break
        case 'A':
            socket.emit('keydown', 'left');
            break
        case 'ArrowLeft':
            socket.emit('keydown', 'left');
            break
        case 'd':
            socket.emit('keydown', 'right');
            break
        case 'D':
            socket.emit('keydown', 'right');
            break
        case 'ArrowRight':
            socket.emit('keydown', 'right');
            break
    }
}
  
  function keyReleased() {
    switch (key) {
        case 'a':
            socket.emit('keyup', 'left');
            break
        case 'A':
            socket.emit('keyup', 'left');
            break
        case 'ArrowLeft':
            socket.emit('keyup', 'left');
            break
        case 'd':
            socket.emit('keyup', 'right');
            break
        case 'D':
            socket.emit('keyup', 'right');
            break
        case 'ArrowRight':
            socket.emit('keyup', 'right');
            break
    }
}
