function collisionDetection(circleX, circleY, radius, x1, y1, x2, y2) {
    // Calculate the slope and intercept of the line
    let slope = (y2 - y1) / (x2 - x1);
    let intercept = y1 - slope * x1;

    // Find the closest point on the line to the circle center
    let closestX, closestY;
    if (slope === Infinity || slope === -Infinity) {
        // Vertical line case
        closestX = x1;
        closestY = circleY;
    } else {
        let perpendicularSlope = -1 / slope;
        let perpendicularIntercept = circleY - perpendicularSlope * circleX;
        closestX = (perpendicularIntercept - intercept) / (slope - perpendicularSlope);
        closestY = slope * closestX + intercept;
    }

    // Calculate the distance from the circle's center to the closest point
    let distance = Math.sqrt(Math.pow(closestX - circleX, 2) + Math.pow(closestY - circleY, 2));

    // Check for overlap
    return distance <= radius;
}

module.exports = { collisionDetection };
