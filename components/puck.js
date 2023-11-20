class Puck {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 12;
    }
    
    show() {
        fill(255);
        ellipse(this.x, this.y, this.r*2);
    }
}
