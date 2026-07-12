/**
 * WorldScene - Escena del mundo
 *
 * Escena principal de exploración del mundo.
 * preload() carga assets, create() construye el mundo.
 */

import Phaser from 'phaser';
import { SCENE_KEYS, DEPTHS, ASSETS } from '@core/constants/Constants';
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

  preload(): void {
    const mapConfig = mapConfigData as unknown as MapConfig;

    // Load tilemap JSON
    const tilemapUrl = `assets/maps/${mapConfig.directory}/${mapConfig.tilemapKey}.tmj`;
    console.log(`[WorldScene] preload: loading tilemap JSON → ${tilemapUrl}`);
    this.load.tilemapTiledJSON(mapConfig.tilemapKey, tilemapUrl);

    // Load tileset images
    for (const tileset of mapConfig.tilesets) {
      const tilesetUrl = `assets/tilesets/${tileset.imageKey}.png`;
      console.log(`[WorldScene] preload: loading tileset → ${tilesetUrl}`);
      this.load.image(tileset.imageKey, tilesetUrl);
    }

    // Load player sprite
    console.log(`[WorldScene] preload: loading player sprite → ${ASSETS.SPRITES.PLAYER.PATH}`);
    this.load.image(ASSETS.SPRITES.PLAYER.KEY, ASSETS.SPRITES.PLAYER.PATH);

    // Validate loading errors
    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      console.error(`[WorldScene] FAILED to load: key="${file.key}" url="${file.url}"`);
    });
  }

  create(): void {
    console.log('[WorldScene] create: building world from loaded assets');

    this.cameras.main.setBackgroundColor('#1a1a2e');

    // --- Validate loaded assets ---
    const mapConfig = mapConfigData as unknown as MapConfig;
    const tilemapData = this.cache.tilemap.get(mapConfig.tilemapKey);
    if (!tilemapData) {
      console.error(`[WorldScene] ABORT: tilemap "${mapConfig.tilemapKey}" not found in cache. Check the .tmj path.`);
      return;
    }

    for (const tileset of mapConfig.tilesets) {
      if (!this.textures.exists(tileset.imageKey)) {
        console.error(`[WorldScene] ABORT: tileset image "${tileset.imageKey}" not found in cache. Check the .png path.`);
        return;
      }
    }

    console.log('[WorldScene] All assets validated OK');

    // --- Initialize MapManager ---
    this.mapManager = new MapManager();
    this.mapManager.initialize();
    this.mapManager.registerRegion(regionData as unknown as RegionConfig);
    this.mapManager.registerMap(mapConfig);
    this.mapManager.loadMap(mapConfig.id);

    // --- Initialize TilemapService ---
    this.tilemapService = new TilemapService();
    this.tilemapService.initialize(this);
    this.tilemapService.loadMap(
      mapConfig.tilemapKey,
      mapConfig.tilesets.map((ts) => ({
        tiledName: ts.tiledName,
        imageKey: ts.imageKey,
      })),
    );

    // --- Create tilemap layers ---
    for (const layerConfig of mapConfig.layers) {
      if (layerConfig.type === 'tilemap') {
        this.tilemapService.createTilemapLayer(
          layerConfig.name,
          mapConfig.tilesets.map((ts) => ts.imageKey),
          layerConfig.depth,
        );

        if (layerConfig.collisionEnabled) {
          this.tilemapService.setCollisionByExclusion(layerConfig.name, [0]);
          const phaserLayer = this.tilemapService.getPhaserLayer(layerConfig.name);
          if (phaserLayer) {
            console.log(`[WorldScene] Collision layer ready: ${layerConfig.name}`);
          } else {
            console.error(`[WorldScene] Collision layer "${layerConfig.name}" was not created`);
          }
        }
      }
    }

    // --- Set camera and world bounds ---
    const map = this.tilemapService.getPhaserMap();
    if (map) {
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      console.log(`[WorldScene] Camera bounds: ${map.widthInPixels}x${map.heightInPixels}`);
    }

    // --- Spawn player ---
    const playerConfig = playerData as PlayerConfig;
    const spawnPoint = this.tilemapService.getObjectByName('Objects', 'player-start');
    const spawnX = spawnPoint ? spawnPoint.x : playerConfig.spawn.x;
    const spawnY = spawnPoint ? spawnPoint.y : playerConfig.spawn.y;

    if (spawnPoint) {
      console.log(`[WorldScene] Player spawn from map: (${spawnX}, ${spawnY})`);
    } else {
      console.warn(`[WorldScene] No PlayerSpawn found, using default: (${spawnX}, ${spawnY})`);
    }

    // Validate player texture exists
    const playerTextureKey = ASSETS.SPRITES.PLAYER.KEY;
    if (!this.textures.exists(playerTextureKey)) {
      console.error(`[WorldScene] ABORT: player texture "${playerTextureKey}" not found in cache. Was it loaded in preload()?`);
      return;
    }

    const playerEntity = new PlayerEntity(playerConfig);
    const movementComponent = new MovementComponent();
    movementComponent.setPosition({ x: spawnX, y: spawnY });

    const inputService = new InputService();
    inputService.initialize(this);

    this.playerSprite = this.add.sprite(spawnX, spawnY, playerTextureKey);
    this.playerSprite.setDepth(DEPTHS.PLAYER);

    this.playerController = new PlayerController(
      playerEntity,
      movementComponent,
      inputService,
    );
    this.playerController.initialize(playerConfig);

    // --- Camera follows player ---
    this.cameras.main.startFollow(this.playerSprite, true, 0.1, 0.1);

    // --- Collision: add physics collider for each collision layer ---
    for (const layerConfig of mapConfig.layers) {
      if (layerConfig.collisionEnabled) {
        const phaserLayer = this.tilemapService.getPhaserLayer(layerConfig.name);
        if (phaserLayer) {
          this.physics.add.collider(this.playerSprite, phaserLayer);
          console.log(`[WorldScene] Physics collider added for: ${layerConfig.name}`);
        }
      }
    }

    // --- UI overlay ---
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

    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.start(SCENE_KEYS.MAIN_MENU);
    });

    console.log('[WorldScene] World built successfully');
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
