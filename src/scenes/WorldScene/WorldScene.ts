/**
 * WorldScene - Escena del mundo
 *
 * Escena principal de exploración del mundo.
 * Coordina tilemap, movimiento, entrada y entidades.
 */

import Phaser from 'phaser';
import { SCENE_KEYS, DEPTHS } from '@core/constants/Constants';
import { PlayerEntity, PlayerController } from '@entities/player';
import type { PlayerConfig } from '@entities/player/types';
import { MovementComponent } from '@components/MovementComponent';
import { InputService } from '@services/InputService';
import { TilemapService, MapManager } from '@world/index';
import type { MapConfig, RegionConfig } from '@world/types';
import playerData from '@data/entities/player.default.json';
import mapConfigData from '@data/maps/playa-calblanque.json';
import regionData from '@data/regions/murcia.json';

export class WorldScene extends Phaser.Scene {
  private playerController!: PlayerController;
  private playerSprite!: Phaser.GameObjects.Sprite;
  private tilemapService!: TilemapService;
  private mapManager!: MapManager;
  private useTilemap: boolean = false;

  constructor() {
    super({ key: SCENE_KEYS.WORLD });
  }

  create(): void {
    console.log('[WorldScene] World scene loaded');

    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Initialize MapManager
    this.mapManager = new MapManager();
    this.mapManager.initialize();

    // Register region and map
    this.mapManager.registerRegion(regionData as unknown as RegionConfig);
    this.mapManager.registerMap(mapConfigData as unknown as MapConfig);

    // Initialize TilemapService
    this.tilemapService = new TilemapService();
    this.tilemapService.initialize(this);

    // Try to load the tilemap
    this.useTilemap = this.tryLoadTilemap();

    // Load player data
    const config = playerData as PlayerConfig;

    // Determine spawn position
    let spawnX = config.spawn.x;
    let spawnY = config.spawn.y;

    if (this.useTilemap) {
      const spawnPoint = this.tilemapService.getObjectByName('Objects', 'player-start');
      if (spawnPoint) {
        spawnX = spawnPoint.x;
        spawnY = spawnPoint.y;
      }
    }

    // Create player entity
    const playerEntity = new PlayerEntity(config);
    const movementComponent = new MovementComponent();
    const inputService = new InputService();

    inputService.initialize(this);

    // Create player sprite
    this.playerSprite = this.add.sprite(spawnX, spawnY, 'player-placeholder');
    this.playerSprite.setDepth(DEPTHS.PLAYER);

    // Create player controller
    this.playerController = new PlayerController(
      playerEntity,
      movementComponent,
      inputService,
    );

    // Set initial position on the movement component
    movementComponent.setPosition({ x: spawnX, y: spawnY });
    this.playerController.initialize(config);

    // Camera setup
    if (this.useTilemap) {
      const map = this.tilemapService.getPhaserMap();
      if (map) {
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      }
    }

    this.cameras.main.startFollow(this.playerSprite, true, 0.1, 0.1);

    // Instruction text
    const instructionText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Flechas/WASD: Mover | SHIFT: Correr | ESC: Volver al menú',
      {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#888888',
      },
    );
    instructionText.setOrigin(0.5, 0.5);
    instructionText.setScrollFactor(0);
    instructionText.setDepth(DEPTHS.UI);

    // ESC to return to menu
    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.start(SCENE_KEYS.MAIN_MENU);
    });
  }

  private tryLoadTilemap(): boolean {
    try {
      const mapConfig = mapConfigData as unknown as MapConfig;

      // Load tilemap JSON
      this.load.tilemapTiledJSON(mapConfig.tilemapKey, `maps/${mapConfig.directory}/${mapConfig.tilemapKey}.tmj`);

      // Load tileset images
      for (const tileset of mapConfig.tilesets) {
        this.load.image(tileset.imageKey, `tilesets/${tileset.imageKey}.png`);
      }

      this.load.once('complete', () => {
        this.onMapLoaded(mapConfig);
      });

      this.load.start();

      return true;
    } catch {
      console.warn('[WorldScene] Could not load tilemap, using fallback');
      return false;
    }
  }

  private onMapLoaded(mapConfig: MapConfig): void {
    this.mapManager.loadMap(mapConfig.id);

    this.tilemapService.loadMap(
      mapConfig.tilemapKey,
      mapConfig.tilesets.map((ts) => ({
        tiledName: ts.tiledName,
        imageKey: ts.imageKey,
      })),
    );

    // Create layers in order
    for (const layerConfig of mapConfig.layers) {
      if (layerConfig.type === 'tilemap') {
        this.tilemapService.createTilemapLayer(
          layerConfig.name,
          mapConfig.tilesets.map((ts) => ts.imageKey),
          layerConfig.depth,
        );

        // Set up collisions for Collision layer
        if (layerConfig.collisionEnabled) {
          this.tilemapService.setCollisionByExclusion(layerConfig.name, [0]);

          const phaserLayer = this.tilemapService.getPhaserLayer(layerConfig.name);
          if (phaserLayer && this.playerSprite) {
            this.physics.add.collider(this.playerSprite, phaserLayer);
          }
        }
      }
    }

    console.log('[WorldScene] Tilemap loaded successfully');
  }

  update(_time: number, delta: number): void {
    this.playerController.update(delta);

    const position = this.playerController.getPosition();
    this.playerSprite.setPosition(position.x, position.y);
  }

  shutdown(): void {
    if (this.playerController) {
      this.playerController.destroy();
    }
    if (this.tilemapService) {
      this.tilemapService.destroy();
    }
    if (this.mapManager) {
      this.mapManager.destroy();
    }
    console.log('[WorldScene] World scene shutdown');
  }
}
