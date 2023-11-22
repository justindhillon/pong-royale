const colors = [
    "#c61111",
    "#132ed2", 
    "#11802d", 
    "#ee54bb", 
    "#f07d0d",
    "#f6f657",
    "#d6e0f0",
    "#6b2fbc",
    "#71491e",
    "#38e2dd",
    "#50f039",
    "#50f039",
    "#50f039",
    "#fffebe",
    "#708496",
    "#928776",
    "#ec7578",
]

class Paddle {
    constructor(vertex1, vertex2, pos, rotation, color) {
        this.xDistance = this.vertex2.x - this.vertex1.x;
        this.yDistance = this.vertex2.y - this.vertex1.y;

        // Pythagorean Theorem
        const distance = Math.sqrt(this.xDistance * this.xDistance + this.yDistance * this.yDistance);

        this.x = this.vertex1.x + this.xDistance * pos;
        this.y = this.vertex1.y + this.yDistance * pos;
        this.width = distance/4;
        this.thickness = distance/16;
    }
}

function paddle(x, y, rotation, color, height, width) {
    push();
    translate(x, y);
    angleMode(DEGREES);
    rotate(rotation);
    fill(colors[color % 17]);
    rectMode(CENTER);
    rect(0, 0, width, thickness);
    pop();
}
