import Phaser from 'phaser';

export default class OtherPlayer extends Phaser.Physics.Arcade.Sprite {
  private nameText: Phaser.GameObjects.Text;
  private nameOffset = 20; 
  private avatarType: string;
  private playerName: string;
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    avatarType: string,
    name: string
  ) {
    
    super(scene, x, y, `${avatarType}-down`);
    
    this.avatarType = avatarType;
    this.playerName = name;
    
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    
    this.setImmovable(true);
    this.setCollideWorldBounds(true);
    
    
    this.body.setSize(20, 32);
    this.body.setOffset(6, 16);
    
    
    this.nameText = scene.add.text(x, y - this.nameOffset, name, {
      fontFamily: 'Arial',
      fontSize: '10px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
      align: 'center'
    });
    this.nameText.setOrigin(0.5, 1);
    
   
    this.createAnimations();
    
    
    this.play(`${this.avatarType}-down-idle`);
    
    
    this.simulateMovement();
  }
  
  private createAnimations() {
   
    const createAnim = (direction: string, frames: number[]) => {
      if (!this.scene.anims.exists(`${this.avatarType}-${direction}-walk`)) {
        this.scene.anims.create({
          key: `${this.avatarType}-${direction}-walk`,
          frames: this.scene.anims.generateFrameNumbers(`${this.avatarType}-${direction}`, { frames }),
          frameRate: 8,
          repeat: -1
        });
      }
      
      if (!this.scene.anims.exists(`${this.avatarType}-${direction}-idle`)) {
        this.scene.anims.create({
          key: `${this.avatarType}-${direction}-idle`,
          frames: [{ key: `${this.avatarType}-${direction}`, frame: 0 }],
          frameRate: 1
        });
      }
    };
    
    
    createAnim('down', [0, 1, 2, 3]);
    createAnim('up', [0, 1, 2, 3]);
    createAnim('left', [0, 1, 2, 3]);
    createAnim('right', [0, 1, 2, 3]);
  }
  
  private simulateMovement() {
   
    const directions = ['up', 'down', 'left', 'right', 'idle'];
    const speed = 50;
    
    const changeDirection = () => {
      const direction = Phaser.Utils.Array.GetRandom(directions);
      
      
      this.setVelocity(0);
      
      switch (direction) {
        case 'up':
          this.setVelocityY(-speed);
          this.play(`${this.avatarType}-up-walk`, true);
          break;
        case 'down':
          this.setVelocityY(speed);
          this.play(`${this.avatarType}-down-walk`, true);
          break;
        case 'left':
          this.setVelocityX(-speed);
          this.play(`${this.avatarType}-left-walk`, true);
          break;
        case 'right':
          this.setVelocityX(speed);
          this.play(`${this.avatarType}-right-walk`, true);
          break;
        case 'idle':
          
          const currentAnim = this.anims.currentAnim;
          if (currentAnim) {
            const parts = currentAnim.key.split('-');
            const direction = parts[1]; // Get direction (up, down, left, right)
            this.play(`${this.avatarType}-${direction}-idle`, true);
          } else {
            this.play(`${this.avatarType}-down-idle`, true);
          }
          break;
      }
      
      
      this.scene.time.delayedCall(
        Phaser.Math.Between(2000, 5000), 
        changeDirection
      );
    };
    
    
    changeDirection();
  }
  
  update() {
    
    this.nameText.setPosition(this.x, this.y - this.nameOffset);
  }
  
  
  destroy(fromScene?: boolean) {
    if (this.nameText) {
      this.nameText.destroy();
    }
    super.destroy(fromScene);
  }
}