function moveBalls(balls) {
    for (const ball of Object.values(balls)) {
        const direction = ball.direction * (Math.PI / 180);
        const moveX = Math.cos(direction) * ball.speed;
        const moveY = Math.sin(direction) * ball.speed;

        ball.x += moveX;
        ball.y += moveY;

        // If the ball is ever off screen for some reason
        if (ball.x < -100 || 900 < ball.x || ball.y < -100 || 900 < ball.y) {
            // Reset ball
            ball.x = 400;
            ball.y = 400;
            ball.direction = Math.random() * 360;
            ball.speed = 2;
        }
    }

    return balls;
}

module.exports = { moveBalls };
