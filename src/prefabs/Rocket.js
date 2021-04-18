//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene,x, y, texture, frame);
        scene.add.existing(this); //add object to existing scene

        this.isFiring = false; //track rocket's firing status
        this.moveSpeed = 2; //pixels per frame
    }

    update(){
        if(keyLEFT.isDown){
            this.x -= this.moveSpeed;
        }
        if (keyRIGHT.isDown){
            this.x += this.moveSpeed;
        }
    }
}