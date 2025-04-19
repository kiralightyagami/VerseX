import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
    
    
    this.loadPlayerAssets();
    this.loadTilesets();
    this.loadUIAssets();
    
    
    const worldData = this.registry.get('worldData');
    if (worldData && worldData.map) {
      this.load.tilemapTiledJSON('map', worldData.map);
    } else {
      
      this.load.tilemapTiledJSON('map', '/maps/default-map.json');
    }
  }

  create() {
    this.scene.start('MainScene');
  }
  
  private loadPlayerAssets() {
    
    this.load.spritesheet('harry-down', '/game/characters/harry-down.png', { 
      frameWidth: 32, frameHeight: 48 
    });
    this.load.spritesheet('harry-up', '/game/characters/harry-up.png', { 
      frameWidth: 32, frameHeight: 48 
    });
    this.load.spritesheet('harry-left', '/game/characters/harry-left.png', { 
      frameWidth: 32, frameHeight: 48 
    });
    this.load.spritesheet('harry-right', '/game/characters/harry-right.png', { 
      frameWidth: 32, frameHeight: 48 
    });
    
   
    this.load.spritesheet('ironman-down', '/game/characters/ironman-down.png', { 
      frameWidth: 32, frameHeight: 48 
    });
    this.load.spritesheet('ironman-up', '/game/characters/ironman-up.png', { 
      frameWidth: 32, frameHeight: 48 
    });
    this.load.spritesheet('ironman-left', '/game/characters/ironman-left.png', { 
      frameWidth: 32, frameHeight: 48 
    });
    this.load.spritesheet('ironman-right', '/game/characters/ironman-right.png', { 
      frameWidth: 32, frameHeight: 48 
    });
  }
  
  private loadTilesets() {
    
    this.load.image('tiles', '/game/tilesets/pixel-tileset.png');
    
    
    this.load.image('furniture', '/game/tilesets/furniture.png');
    this.load.image('decorations', '/game/tilesets/decorations.png');
  }
  
  private loadUIAssets() {
    
    this.load.image('chat-bubble', '/game/ui/chat-bubble.png');
    this.load.image('emote-happy', '/game/ui/emote-happy.png');
    this.load.image('emote-question', '/game/ui/emote-question.png');
    this.load.image('emote-exclamation', '/game/ui/emote-exclamation.png');
    
    
    this.load.image('joystick-base', '/game/ui/joystick-base.png');
    this.load.image('joystick-thumb', '/game/ui/joystick-thumb.png');
  }
}