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
    const regionConfig = regionData as unknown as RegionConfig;
    const mapConfig = mapConfigData as unknown as MapConfig;
    this.mapManager.registerRegion(regionConfig);
    this.mapManager.registerMap(mapConfig);
    this.mapManager.loadMap(mapConfig.id);

    // Initialize TilemapService
    this.tilemapService = new TilemapService();
    this.tilemapService.initialize(this);

    // Load player data
    const playerConfig = playerData as PlayerConfig;

    // Create player entity and controller first (no position yet)
    const playerEntity = new PlayerEntity(playerConfig);
    const movementComponent = new MovementComponent();
    const inputService = new InputService();
    inputService.initialize(this);

    // Default spawn from player data
    let spawnX = playerConfig.spawn.x;
    let spawnY = playerConfig.spawn.y;

    // Try to load the tilemap
    const loaded = this.tryLoadTilemap(mapConfig, (spawnPoint) => {
      if (spawnPoint) {
        spawnX = spawnPoint.x;
        spawnY = spawnPoint.y;
      }

      // Position player at spawn point
      this.playerSprite.setPosition(spawnX, spawnY);
      movementComponent.setPosition({ x: spawnX, y: spawnY });
    });

    // Create player sprite at default position
    this.playerSprite = this.add.sprite(spawnX, spawnY, 'player-placeholder');
    this.playerSprite.setDepth(DEPTHS.PLAYER);

    // Create player controller
    this.playerController = new PlayerController(
      playerEntity,
      movementComponent,
      inputService,
    );
    this.playerController.initialize(playerConfig);

    // Camera follows player
    this.cameras.main.startFollow(this.playerSprite, true, 0.1, 0.1);

    if (!loaded) {
      console.warn('[WorldScene] Tilemap not loaded, using fallback');
    }

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

  private tryLoadTilemap(
    mapConfig: MapConfig,
    onReady: (spawnPoint: { x: number; y: number } | null) => void,
  ): boolean {
    try {
      // Asset paths relative to public/ directory
      const basePath = `assets/maps/${mapConfig.directory}`;
      const tilemapUrl = `${basePath}/${mapConfig.tilemapKey}.tmj`;
      const tilesetUrl = `assets/tilesets/${mapConfig.tilesets[0].imageKey}.png`;

      console.log(`[WorldScene] Loading tilemap: ${tilemapUrl}`);
      console.log(`[WorldScene] Loading tileset: ${tilesetUrl}`);

      // Queue assets
      this.load.tilemapTiledJSON(mapConfig.tilemapKey, tilemapUrl);
      for (const tileset of mapConfig.tilesets) {
        this.load.image(tileset.imageKey, `assets/tilesets/${tileset.imageKey}.png`);
      }

      // Wait for all assets to load, then build the map
      this.load.once('filecomplete-tilemaptilemapTiledJSON-' + mapConfig.tilemapKey, () => {
        console.log(`[WorldScene] Tilemap JSON loaded: ${mapConfig.tilemapKey}`);
      });

      this.load.once('filecomplete-image-' + mapConfig.tilesets[0].imageKey, () => {
        console.log(`[WorldScene] Tileset image loaded: ${mapConfig.tilesets[0].imageKey}`);
      });

      this.load.once('complete', () => {
        console.log('[WorldScene] All assets loaded, building map...');
        this.buildTilemap(mapConfig, onReady);
      });

      this.load.on('loaderror', (file: Phaser.Loader.File) => {
        console.error(`[WorldScene] Failed to load: ${file.key} (${file.url})`);
      });

      // Start loading
      this.load.start();

      return true;
    } catch (e) {
      console.error('[WorldScene] Error setting up tilemap load:', e);
      return false;
    }
  }

  private buildTilemap(
    mapConfig: MapConfig,
    onReady: (spawnPoint: { x: number; y: number } | null) => void,
  ): void {
    // Create tilemap from loaded data
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
          // Exclude tile index 0 (empty). All other tiles will collide.
          this.tilemapService.setCollisionByExclusion(layerConfig.name, [0]);

          const phaserLayer = this.tilemapService.getPhaserLayer(layerConfig.name);
          if (phaserLayer && this.playerSprite) {
            this.physics.add.collider(this.playerSprite, phaserLayer);
            console.log(`[WorldScene] Collision layer enabled: ${layerConfig.name}`);
          }
        }
      }
    }

    // Set camera and world bounds
    const map = this.tilemapService.getPhaserMap();
    if (map) {
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      console.log(`[WorldScene] Camera bounds: ${map.widthInPixels}x${map.heightInPixels}`);
    }

    // Get spawn point from Objects layer
    const spawnPoint = this.tilemapService.getObjectByName('Objects', 'player-start');
    if (spawnPoint) {
      console.log(`[WorldScene] Player spawn: (${spawnPoint.x}, ${spawnPoint.y})`);
    }

    onReady(spawnPoint);
    console.log('[WorldScene] Tilemap built successfully');
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
