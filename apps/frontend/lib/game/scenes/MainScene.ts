import Phaser from 'phaser';
import Player from '../entities/Player';
import OtherPlayer from '../entities/OtherPlayer';

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private otherPlayers: Map<string, OtherPlayer> = new Map();
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private map!: Phaser.Tilemaps.Tilemap;
  private worldData: any;
  
  constructor() {
    super('MainScene');
  }

  init() {
    this.worldData = this.registry.get('worldData');
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  create() {
    this.createMap();
    this.createPlayer();
    this.createCamera();
    this.createOtherPlayers();
    this.createColliders();
    
    
    this.setupKeyboardInput();
    
   
    if (this.sys.game.device.input.touch) {
      this.setupMobileControls();
    }
  }

  update() {
    if (this.player) {
      this.player.update(this.cursors);
    }
  }
  
  private createMap() {
    
    this.map = this.make.tilemap({ key: 'map' });
    
    
    const tileset = this.map.addTilesetImage('pixel-tileset', 'tiles');
    const furnitureTileset = this.map.addTilesetImage('furniture', 'furniture');
    const decorationsTileset = this.map.addTilesetImage('decorations', 'decorations');
    
    
    if (tileset) {
     
      this.map.createLayer('Ground', tileset);
      const wallsLayer = this.map.createLayer('Walls', tileset);
      
      
      const tilesets = [tileset];
      if (furnitureTileset) tilesets.push(furnitureTileset);
      if (decorationsTileset) tilesets.push(decorationsTileset);
      
      this.map.createLayer('Furniture', tilesets);
      this.map.createLayer('Decorations', tilesets);
      
      
      if (wallsLayer) {
        wallsLayer.setCollisionByProperty({ collides: true });
      }
    }
  }
  
  private createPlayer() {
    
    let spawnPoint = this.worldData?.spawnPoint || { x: 100, y: 100 };
    
    
    const spawnLayer = this.map.getObjectLayer('SpawnPoints');
    if (spawnLayer && spawnLayer.objects.length > 0) {
      
      const spawn = Phaser.Utils.Array.GetRandom(spawnLayer.objects);
      spawnPoint = { x: spawn.x || 100, y: spawn.y || 100 };
    }
    
    
    this.player = new Player(
      this,
      spawnPoint.x,
      spawnPoint.y,
      'harry', 
    );
  }
  
  private createCamera() {
    
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2); 
    
    
    this.cameras.main.setBounds(
      0, 0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
  }
  
  private createOtherPlayers() {
  
    const mockPlayers = [
      { id: 'player1', x: 150, y: 150, avatar: 'harry', name: 'Wizard1' },
      { id: 'player2', x: 200, y: 200, avatar: 'ironman', name: 'TechGuy' },
      { id: 'player3', x: 250, y: 150, avatar: 'harry', name: 'Magician' },
    ];
    
    mockPlayers.forEach(p => {
      const otherPlayer = new OtherPlayer(
        this,
        p.x,
        p.y,
        p.avatar,
        p.name
      );
      this.otherPlayers.set(p.id, otherPlayer);
    });
  }
  
  private createColliders() {
    
    const wallsLayer = this.map.getLayer('Walls')?.tilemapLayer;
    if (wallsLayer) {
      this.physics.add.collider(this.player, wallsLayer);
      
      
      this.otherPlayers.forEach(player => {
        this.physics.add.collider(player, wallsLayer);
      });
    }
    
    
    this.otherPlayers.forEach(otherPlayer => {
      this.physics.add.collider(this.player, otherPlayer);
    });
  }
  
  private setupKeyboardInput() {
    
    this.input.keyboard?.on('keydown-SPACE', () => {
      this.player.interact();
    });
    
    
    this.input.keyboard?.on('keydown-C', () => {
      
      console.log('Chat opened');
    });
  }
  
  private setupMobileControls() {
   
  }
}