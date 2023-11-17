function calculateVertex(radius, numberOfVertex) {
    let vertices = {}

    // Creddit:
    // https://stackoverflow.com/questions/3436453/calculate-coordinates-of-a-regular-polygons-vertices
    for (i = 0; i < numberOfVertex; i++) {
        vertices[i] = {
            x: (radius * Math.round(Math.cos(2 * Math.PI * i / numberOfVertex) * 10) / 10) + 400, 
            y: (radius * Math.round(Math.sin(2 * Math.PI * i / numberOfVertex) * 10) / 10) + 400
        };
    } 

    return vertices;
}
