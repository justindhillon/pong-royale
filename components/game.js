function setup() {
    createCanvas(800, 800);
    //puck = new Puck();
}

function draw() {
    background(0);

    for (let id in paddles) {
        paddles[id].show();
    }
    
    //puck.update();
    //puck.edges();
    //puck.show();
    
    fill(255);
}

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyA':
            socket.emit('keydown', 'left');
            break
        case 'ArrowLeft':
            socket.emit('keydown', 'left');
            break
        case 'KeyD':
            socket.emit('keydown', 'right');
            break
        case 'ArrowRight':
            socket.emit('keydown', 'right');
            break
    }
})
