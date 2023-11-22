function rotatePoint(x, y, rotation, angle, centerX, centerY) {
    // Translate point to origin
    x -= centerX;
    y -= centerY;

    // Convert angle to radians
    let radians = angle * Math.PI / 180;

    // Apply rotation
    let xPrime = x * Math.cos(radians) - y * Math.sin(radians);
    let yPrime = x * Math.sin(radians) + y * Math.cos(radians);

    // Translate point back
    xPrime += centerX;
    yPrime += centerY;

    return { x: xPrime, y: yPrime, rotation: rotation };
}

function rotatePolygon(vertices, angle, centerX, centerY) {
    return vertices.map(vertex => rotatePoint(vertex.x, vertex.y, vertex.rotation, angle, centerX, centerY));
}

export function calculateVertices(n, radius, centerX, centerY) {
    let vertices = [];
    let initialAngleOffset = -90; // Aligns the first vertex at the bottom.

    // For even-sided polygons, adjust the initial angle to align two bottom vertices horizontally
    if (n % 2 === 0) {
        initialAngleOffset += 360 / (2 * n);
    }

    for (let i = 0; i < n; i++) {
        // Angle in radians
        let angle = (i / n) * 2 * Math.PI + initialAngleOffset * Math.PI / 180;

        // Calculating the x, y coordinates
        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);

        let rotation = (180 - ((n - 2) * 180) / n) * i;

        // Adding the vertex to the list
        vertices.push({ x: x, y: y, rotation: rotation });
    }
    const angle = 360/n * (Math.round(n/2 - 1));
    vertices = rotatePolygon(vertices, angle, centerX, centerY);
    return vertices;
}
