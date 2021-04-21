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
Randomize each spaceship's movement direction at the start of each play (5)
Create a new scrolling tile sprite for the background (5)
Add your own (copyright-free) background music to the Play scene (5)

Create 4 new explosion SFX and randomize which one plays on impact (10)

Replace the UI borders with new artwork (10)
Create a new title screen (e.g., new artwork, typography, layout) (10)
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
*/