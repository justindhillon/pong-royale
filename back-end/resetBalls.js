function resetBalls(balls) {
    for (const ball of Object.values(balls)) {
        ball.x = 400;
        ball.y = 400;
        ball.direction = Math.random() * 360;
        ball.speed = 2;
        ball.lastPlayer = undefined;
    }

    return balls;
}

module.exports = { resetBalls };
