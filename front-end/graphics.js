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

function setup() {
    createCanvas(800, 800);
}

function draw() {
    // Black Background
    background(0);

    // Rotate Screen So Player Is On Bottom
    angleMode(DEGREES);
    translate(width / 2, height / 2);
    const angle = -360 / Object.keys(paddles).length;
    rotate(angle * (paddleNumber));
    translate(-width / 2, -height / 2);

    // Draw Paddles
    for (let id in paddles) {
        paddle(); // TODO
    }

    // Draw Balls
    for (let id in pucks) {
        fill(255);
        ellipse(pucks[id].x, pucks[id].y, pucks[id].r*2);
    }
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
