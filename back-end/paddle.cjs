export function paddle(vertex1, vertex2, pos) {
    const xDistance = vertex2.x - vertex1.x;
    const yDistance = vertex2.y - vertex1.y;

    const x = vertex1.x + xDistance * pos;
    const y = vertex1.y + yDistance * pos;

    return x, y;
}
