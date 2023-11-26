function getDistance(point1X, point1Y, point2X, point2Y) {
    const xDistance = point1X - point2X;
    const yDistance = point1Y - point2Y;
    // Pythagorean Theorem
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    return distance;
}

module.exports = { getDistance };
