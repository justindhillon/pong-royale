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

function paddle(x, y, rotation, color, height, width) {
    push();
    translate(x, y);
    rotate(rotation);
    fill(colors[color % 17]);
    rect(0, width / 2, height, width, 5);
    pop();
}
