function setup() {
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

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyA':
            console.log('left');
            break
        case 'ArrowLeft':
            console.log('left');
            break
        case 'KeyD':
            console.log('right');
            break
        case 'ArrowRight':
            console.log('right');
            break
    }
})
