let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene:   [ Menu, Play ]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;


/*
What I have change:
Create a new title screen (e.g., new artwork, typography, layout) (10)
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
*/