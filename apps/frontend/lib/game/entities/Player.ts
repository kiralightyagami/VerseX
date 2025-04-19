import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private speed = 100;
  private avatarType: string;
  private nameText: Phaser.GameObjects.Text;
  private nameOffset = 20; 
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    avatarType: string
  ) {
    
    super(scene, x, y, `${avatarType}-down`);
    
    this.avatarType = avatarType;
    
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    
    this.setCollideWorldBounds(true);
    
   
    this.body.setSize(20, 32);
    this.body.setOffset(6, 16);
    
    // Create animations
    this.createAnimations();
    
    
    this.nameText = scene.add.text(x, y - this.nameOffset, 'You', {
      fontFamily: 'Arial',
      fontSize: '10px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
      align: 'center'
    });
    this.nameText.setOrigin(0.5, 1);
  }
  
  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (!cursors) return;
    
   
    this.setVelocity(0);
    
    
    if (cursors.left?.isDown) {
      this.setVelocityX(-this.speed);
      this.play(`${this.avatarType}-left-walk`, true);
    } else if (cursors.right?.isDown) {
      this.setVelocityX(this.speed);
      this.play(`${this.avatarType}-right-walk`, true);
    }
    
    if (cursors.up?.isDown) {
      this.setVelocityY(-this.speed);
      if (!cursors.left?.isDown && !cursors.right?.isDown) {
        this.play(`${this.avatarType}-up-walk`, true);
      }
    } else if (cursors.down?.isDown) {
      this.setVelocityY(this.speed);
      if (!cursors.left?.isDown && !cursors.right?.isDown) {
        this.play(`${this.avatarType}-down-walk`, true);
      }
    }
    
   
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      // Get current animation key
      const currentAnim = this.anims.currentAnim;
      if (currentAnim) {
        const parts = currentAnim.key.split('-');
        const direction = parts[1]; // Get direction (up, down, left, right)
        this.play(`${this.avatarType}-${direction}-idle`, true);
      }
    }
    
    
    this.nameText.setPosition(this.x, this.y - this.nameOffset);
  }
  
  interact() {
    
    console.log('Player interaction');
  }
  
  private createAnimations() {
    
    const createAnim = (direction: string, frames: number[]) => {
      this.scene.anims.create({
        key: `${this.avatarType}-${direction}-walk`,
        frames: this.scene.anims.generateFrameNumbers(`${this.avatarType}-${direction}`, { frames }),
        frameRate: 8,
        repeat: -1
      });
      
      
      this.scene.anims.create({
        key: `${this.avatarType}-${direction}-idle`,
        frames: [{ key: `${this.avatarType}-${direction}`, frame: 0 }],
        frameRate: 1
      });
    };
    
   
    createAnim('down', [0, 1, 2, 3]);
    createAnim('up', [0, 1, 2, 3]);
    createAnim('left', [0, 1, 2, 3]);
    createAnim('right', [0, 1, 2, 3]);
  }
  
 
  destroy(fromScene?: boolean) {
    if (this.nameText) {
      this.nameText.destroy();
    }
    super.destroy(fromScene);
  }
}