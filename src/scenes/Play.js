class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload(){
        //load image/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceshipsmall', './assets/spaceshipsmall.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        //this.load.spritesheet('explosion1', './assets/explosion1.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        //this.load.spritesheet('explosion2', './assets/explosion2.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        //this.load.spritesheet('explosion3', './assets/explosion3.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        this.load.image('scifi', './assets/scifi.png');
        this.load.audio('sfx_background', './assets/Chrono.mp3');

    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        
        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket');

        // add spaceships (x3)
        this.ship1 = new Spaceship(this, Phaser.Math.Between(game.config.width + borderUISize*6, 100), borderUISize*5, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship2 = new Spaceship(this, Phaser.Math.Between(game.config.width + borderUISize*3, 100), borderUISize*6 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship3 = new Spaceship(this, Phaser.Math.Between(game.config.width, 100), borderUISize*7 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        //extro point ship
        this.shipsmall = new Smallship(this, Phaser.Math.Between(game.config.width + borderUISize*12, 100), borderUISize*4, 'spaceshipsmall', 0, 50).setOrigin(0,0);

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        var scifi = this.add.image(0,0, 'scifi').setOrigin(0,0);

        //white borders
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
        });
        /*
        this.anims.create({
        key: 'explode1',
        frames: this.anims.generateFrameNumbers('explosion1', { start: 0, end: 9, first: 0}),
        frameRate: 30
        });
        this.anims.create({
        key: 'explode2',
        frames: this.anims.generateFrameNumbers('explosion2', { start: 0, end: 9, first: 0}),
        frameRate: 30
        });
        this.anims.create({
        key: 'explode3',
        frames: this.anims.generateFrameNumbers('explosion3', { start: 0, end: 9, first: 0}),
        frameRate: 30
        });
        */

        // initialize score
        this.p1Score = 0;        
    
    

        // display score config
        let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
    }
    //display score
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

    //display highscore config
    let highscoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 250
    }

    this.highScore = 0;
    //display high score
    console.log(game.settings.highScore);
    this.scoreRight = this.add.text(350, borderUISize + borderPadding*2, 'High Score: ' + game.settings.highScore, highscoreConfig);


    // GAME OVER flag
    this.gameOver = false;

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ??? for Menu', scoreConfig).setOrigin(0.5);
        
        //update high score
        if(game.settings.highScore<this.p1Score){
            game.settings.highScore = this.p1Score;
            this.scoreRight.text = 'High Score: ' + game.settings.highScore;
        }
        
        
        this.gameOver = true;
    }, null, this);
}
    update(time, delta){


        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
               this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship1.update();           // update spaceships (x3)
            this.ship2.update();
            this.ship3.update();
            this.shipsmall.update();
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);
        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
        }
        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
        }

        //blue ship collision
        if (this.checkCollision(this.p1Rocket, this.shipsmall)) {
            this.p1Rocket.reset();
            this.shipExplode(this.shipsmall);
        }
    }




    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        }); 
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        
        //play 4 random explosion sound effect
        this.sound.play(Phaser.Math.RND.pick(['sfx_explosion','sfx_explosion1','sfx_explosion2','sfx_explosion3','sfx_explosion4']));

      }
  }