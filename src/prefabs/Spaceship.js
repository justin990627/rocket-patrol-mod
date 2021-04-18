class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene,x, y, texture, frame);
        scene.add.existing(this); //add object to existing scene
    }

    update(){
        this.x -= 2;

        if(this.x < -this.width){
            this.x = game.config.width;
        }
    }
}