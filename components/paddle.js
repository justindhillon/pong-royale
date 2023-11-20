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
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;
        this.rotation = rotation;
        this.color = color;

        this.xDistance = this.vertex2.x - this.vertex1.x;
        this.yDistance = this.vertex2.y - this.vertex1.y;

        // Pythagorean Theorem
        const distance = Math.sqrt(this.xDistance * this.xDistance + this.yDistance * this.yDistance);

        this.x = this.vertex1.x + this.xDistance * pos;
        this.y = this.vertex1.y + this.yDistance * pos;
        this.width = distance/4;
        this.thickness = distance/16;
    }
    
    show() {
        push();
        translate(this.x, this.y);
        angleMode(DEGREES);
        rotate(this.rotation);
        fill(colors[this.color]);
        rectMode(CENTER);
        rect(0, 0, this.width, this.thickness);
        pop();
    }
}
