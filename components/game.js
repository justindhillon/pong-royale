let paddles = {}

function setup() {
    let vertices = calculateVertices(16, 400, 400, 400);

    for (let i in vertices) {
        let nextI = parseInt(i) + 1;
        if (Object.keys(vertices).length <= nextI) {
            nextI = 0;
        }
        paddles[i] = new Paddle({ x: vertices[i].x, y: vertices[i].y }, { x: vertices[nextI].x, y: vertices[nextI].y }, vertices[i].rotation, i);
    }

    createCanvas(800, 800);
    //puck = new Puck();
}

function draw() {
    background(0);

    for (let id in paddles) {
        paddles[id].show();
        paddles[id].update();
    }
    
    //puck.update();
    //puck.edges();
    //puck.show();
    
    fill(255);
}

/*
function keyReleased() {
    left.move(0);
    right.move(0);
}

function keyPressed() {
    if (key == 'A') {
        left.move(-10);
    } else if (key == 'Z') {
        left.move(10);
    }

    if (key == 'J') {
        right.move(-10);
    } else if (key == 'M') {
        right.move(10);
    }
}
*/
