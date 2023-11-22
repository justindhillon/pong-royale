function setup() {
    createCanvas(800, 800);
}

function draw() {
    background(0);

    angleMode(DEGREES);
    translate(width / 2, height / 2);
    const angle = -360 / Object.keys(paddles).length;
    rotate(angle * (paddleNumber));
    translate(-width / 2, -height / 2);

    for (let id in paddles) {
        paddles[id].show();
    }

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
