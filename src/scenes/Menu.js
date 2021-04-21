class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_explosion1', './assets/explosion1.wav');
        this.load.audio('sfx_explosion2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/explosion4.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_background', './assets/Chrono.mp3');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('spacemenu', './assets/spacebackground.jpeg');
      }

    create() {
      //place tile sprite
      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'spacemenu').setOrigin(0, 0);
      
      let backgroundMusic = this.sound.add('sfx_background');
      backgroundMusic.play();
      
        //menu text configuration
        let menuConfig = {
            fontFamily: 'Revalia',
            fontSize: '80px',
            backgroundColor: '#b0efeb',
            color: '#FFA500',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding-50, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '24px';
        menuConfig.backgroundColor = '#fdbaf8';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2+40, 'Use ← and → to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#edffa9';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding+40, 'Press ← for EASY / → for HARD', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        }

        update() {
          this.starfield.tilePositionX -= 2;

            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
              // easy mode
              game.settings = {
                spaceshipSpeed: 2,
                smallshipSpeed: 8,
                gameTimer: 5000    
              }
              this.sound.play('sfx_select');
              this.scene.start('playScene');    
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
              // hard mode
              game.settings = {
                spaceshipSpeed: 5,
                smallshipSpeed: 8,
                gameTimer: 10000
              }
              this.sound.play('sfx_select');
              this.scene.start('playScene');    
            }
          }
  }