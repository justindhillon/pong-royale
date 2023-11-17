// port of Daniel Shiffman's Pong coding challenge
// by madacoo

let players = {}

function setup() {
    const vertices = calculateVertex(400, 4);

    for (let i in vertices) {
        let nextI = parseInt(i) + 1;
        if (Object.keys(vertices).length <= nextI) {
            nextI = 0;
        }
        players[i] = new Paddle({ x: vertices[i].x, y: vertices[i].y }, { x: vertices[nextI].x, y: vertices[nextI].y });
    }

    console.log(players);

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
