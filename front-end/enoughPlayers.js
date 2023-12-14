function enoughPlayers(playerCount) {
    if (3 > playerCount) {
        fill(255);
        textSize(32 * canvasSize / 800);
        textAlign(CENTER, CENTER);
        text('Waiting for ' + (3 - playerCount) + " more player(s)...", 
             canvasSize / 2, canvasSize / 2, canvasSize / 2);
        return false;
    }

    return true;
}
