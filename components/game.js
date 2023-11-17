// port of Daniel Shiffman's Pong coding challenge
// by madacoo

let players = {
    0: new Paddle({ x: 100, y: 100 }, { x: 200, y: 200 }),
    1: new Paddle({ x: 200, y: 200 }, { x: 300, y: 300 }),
    2: new Paddle({ x: 50, y: 500 }, { x: 50, y: 800 }),
}

function setup() {
    console.log(calculateVertex(10, 4));
    createCanvas(800, 800);
    //puck = new Puck();
}

function draw() {
    background(0);

    for (let id in players) {
        players[id].show();
        players[id].update();
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
