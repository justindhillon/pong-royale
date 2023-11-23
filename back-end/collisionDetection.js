function collisionDetection(circleX, circleY, circleRadius, lineX1, lineY1, lineX2, lineY2) {
    // Function to calculate the distance between a point and a line
    function pointLineDistance(x, y, x1, y1, x2, y2) {
        let A = x - x1;
        let B = y - y1;
        let C = x2 - x1;
        let D = y2 - y1;

        let dot = A * C + B * D;
        let lenSq = C * C + D * D;
        let param = -1;
        if (lenSq !== 0) { // in case of 0 length line
            param = dot / lenSq;
        }

        let xx, yy;

        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        let dx = x - xx;
        let dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Calculate the distance from the circle's center to the line
    let distance = pointLineDistance(circleX, circleY, lineX1, lineY1, lineX2, lineY2);

    // Check if the distance is less than or equal to the radius of the circle
    return distance <= circleRadius;
}

module.exports = { collisionDetection };
