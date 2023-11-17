class Paddle {
    constructor(vertex1, vertex2) {
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;

        this.xDistance = this.vertex2.x - this.vertex1.x;
        this.yDistance = this.vertex2.y - this.vertex1.y;

        // Pythagorean Theorem
        const distance = Math.sqrt(this.xDistance * this.xDistance + this.yDistance * this.yDistance);

        this.pos = 1/2;
        this.x = this.vertex1.x + this.xDistance * this.pos;
        this.y = this.vertex1.y + this.yDistance * this.pos;
        this.width = distance/4;
        this.thickness = distance/16;
        this.magnitude = 0;
    }
    
    update() {
        this.pos += this.magnitude;
        this.pos = constrain(this.pos, 0, 1);

        this.x = this.vertex1.x + this.xDistance * this.pos;
        this.y = this.vertex1.y + this.yDistance * this.pos;
    }
    
    left() {
        this.magnitude = -1/60;
    }

    right() {
        this.magnitude = 1/60;
    }

    stop() {
        this.magnitude = 0;
    }
    
    show() {
        fill(255);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.thickness);
    }
}
