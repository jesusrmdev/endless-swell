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

function dumpPlayerSprite(label: string, sprite: Phaser.GameObjects.Sprite): void {
  console.groupCollapsed(`[DEBUG] ${label}`);
  console.log('exists:', !!sprite);
  if (sprite) {
    console.log('x:', sprite.x);
    console.log('y:', sprite.y);
    console.log('visible:', sprite.visible);
    console.log('active:', sprite.active);
    console.log('alpha:', sprite.alpha);
    console.log('scaleX:', sprite.scaleX);
    console.log('scaleY:', sprite.scaleY);
    console.log('texture.key:', sprite.texture?.key);
    console.log('texture.key exists in cache:', sprite.texture?.key ? sprite.scene?.textures.exists(sprite.texture.key) : 'N/A');
    console.log('depth:', sprite.depth);
    console.log('displayOriginX:', sprite.displayOriginX);
    console.log('displayOriginY:', sprite.displayOriginY);
    console.log('width:', sprite.width);
    console.log('height:', sprite.height);
    console.log('frame:', sprite.frame?.name);
  }
  console.groupEnd();
}

function dumpSceneState(scene: Phaser.Scene, label: string): void {
  console.groupCollapsed(`[DEBUG] SCENE STATE — ${label}`);
  console.log('scene key:', scene.scene.key);
  console.log('scene active:', scene.scene.isActive());
  console.log('scene visible:', scene.scene.isVisible());
  console.log('total game objects:', scene.children.length);
  console.log('--- Display List (depth order) ---');
  const sorted = [...scene.children.list].sort(
    (a, b) => {
      const da = (a as unknown as { depth?: number }).depth ?? 0;
      const db = (b as unknown as { depth?: number }).depth ?? 0;
      return da - db;
    },
  );
  sorted.forEach((child, i) => {
    const c = child as unknown as { texture?: { key?: string }; depth: number; visible: boolean; active: boolean; x: number; y: number };
    console.log(
      `  ${i}: ${child.constructor.name} | key=${c.texture?.key ?? 'N/A'} | depth=${c.depth} | visible=${c.visible} | active=${c.active} | x=${c.x} | y=${c.y}`,
    );
  });
  console.groupEnd();
}

function dumpCamera(scene: Phaser.Scene, label: string): void {
  const cam = scene.cameras.main;
  console.groupCollapsed(`[DEBUG] CAMERA — ${label}`);
  console.log('scrollX:', cam.scrollX);
  console.log('scrollY:', cam.scrollY);
  console.log('zoom:', cam.zoom);
  console.log('width:', cam.width);
  console.log('height:', cam.height);
  console.log('bounds:', cam.getBounds());
  console.groupEnd();
}

function dumpTilemapInfo(scene: Phaser.Scene): void {
  console.groupCollapsed(`[DEBUG] TILEMAP — cache state`);
  const mapCache = scene.cache.tilemap;
  console.log('tilemap keys in cache:', mapCache.getKeys());
  const allTexKeys = Object.keys(scene.textures.list);
  console.log('texture keys in cache:', allTexKeys);
  console.groupEnd();
}

export class WorldScene extends Phaser.Scene {
  private playerController!: PlayerController;
  private playerSprite!: Phaser.GameObjects.Sprite;
  private tilemapService!: TilemapService;
  private mapManager!: MapManager;

  constructor() {
    super({ key: SCENE_KEYS.WORLD });
  }

  preload(): void {
    console.log('[DEBUG] === preload() START ===');
    console.log('[DEBUG] preload timestamp:', performance.now());

    const mapConfig = mapConfigData as unknown as MapConfig;

    const tilemapUrl = `assets/maps/${mapConfig.directory}/${mapConfig.tilemapKey}.tmj`;
    console.log(`[DEBUG] preload: loading tilemap JSON → ${tilemapUrl}`);
    this.load.tilemapTiledJSON(mapConfig.tilemapKey, tilemapUrl);

    for (const tileset of mapConfig.tilesets) {
      const tilesetUrl = `assets/tilesets/${tileset.imageKey}.png`;
      console.log(`[DEBUG] preload: loading tileset → ${tilesetUrl}`);
      this.load.image(tileset.imageKey, tilesetUrl);
    }

    console.log(`[DEBUG] preload: loading player sprite → ${ASSETS.SPRITES.PLAYER.PATH}`);
    this.load.image(ASSETS.SPRITES.PLAYER.KEY, ASSETS.SPRITES.PLAYER.PATH);

    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      console.error(`[DEBUG] preload ERROR: key="${file.key}" url="${file.url}"`);
    });

    this.load.on('complete', () => {
      console.log('[DEBUG] preload: loader complete event fired');
    });

    console.log('[DEBUG] === preload() END ===');
  }

  create(): void {
    console.log('[DEBUG] === create() START ===');
    console.log('[DEBUG] create timestamp:', performance.now());

    try {
      this.cameras.main.setBackgroundColor('#1a1a2e');

      // --- Validate loaded assets ---
      const mapConfig = mapConfigData as unknown as MapConfig;
      dumpTilemapInfo(this);

      const tilemapData = this.cache.tilemap.get(mapConfig.tilemapKey);
      if (!tilemapData) {
        console.error(`[DEBUG] ABORT: tilemap "${mapConfig.tilemapKey}" not found in cache.`);
        return;
      }
      console.log(`[DEBUG] tilemap "${mapConfig.tilemapKey}" found in cache ✓`);

      for (const tileset of mapConfig.tilesets) {
        const exists = this.textures.exists(tileset.imageKey);
        console.log(`[DEBUG] tileset "${tileset.imageKey}" in texture cache: ${exists}`);
        if (!exists) {
          console.error(`[DEBUG] ABORT: tileset image "${tileset.imageKey}" not found.`);
          return;
        }
      }

      const playerTextureExists = this.textures.exists(ASSETS.SPRITES.PLAYER.KEY);
      console.log(`[DEBUG] player texture "${ASSETS.SPRITES.PLAYER.KEY}" in cache: ${playerTextureExists}`);

      console.log('[DEBUG] All assets validated OK');

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
              console.log(`[DEBUG] Collision layer ready: ${layerConfig.name}`);
            } else {
              console.error(`[DEBUG] Collision layer "${layerConfig.name}" was NOT created`);
            }
          }
        }
      }

      const map = this.tilemapService.getPhaserMap();
      if (map) {
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        console.log(`[DEBUG] map.widthInPixels: ${map.widthInPixels}`);
        console.log(`[DEBUG] map.heightInPixels: ${map.heightInPixels}`);
        console.log(`[DEBUG] map.width (tiles): ${map.width}`);
        console.log(`[DEBUG] map.height (tiles): ${map.height}`);
        console.log(`[DEBUG] map.tileWidth: ${map.tileWidth}`);
        console.log(`[DEBUG] map.tileHeight: ${map.tileHeight}`);
        console.log(`[DEBUG] map.tilesets.length: ${map.tilesets.length}`);
        console.log(`[DEBUG] map.layers.length: ${map.layers.length}`);
      } else {
        console.error('[DEBUG] getPhaserMap() returned null');
      }

      // --- TilemapService layer count ---
      const layerNames = ['Ground', 'Collision'];
      for (const name of layerNames) {
        const layer = this.tilemapService.getPhaserLayer(name);
        console.log(`[DEBUG] TilemapService.getPhaserLayer("${name}"): ${layer ? 'EXISTS' : 'NULL'}`);
      }

      // --- Spawn player ---
      const playerConfig = playerData as PlayerConfig;
      const spawnPoint = this.tilemapService.getObjectByName('Objects', 'player-start');
      console.log('[DEBUG] spawnPoint from getObjectByName:', spawnPoint);
      const spawnX = spawnPoint ? spawnPoint.x : playerConfig.spawn.x;
      const spawnY = spawnPoint ? spawnPoint.y : playerConfig.spawn.y;
      console.log(`[DEBUG] final spawnX: ${spawnX}, spawnY: ${spawnY}`);

      if (!playerTextureExists) {
        console.error(`[DEBUG] ABORT: player texture not found.`);
        return;
      }

      const playerEntity = new PlayerEntity(playerConfig);
      const movementComponent = new MovementComponent();
      movementComponent.setPosition({ x: spawnX, y: spawnY });

      const inputService = new InputService();
      inputService.initialize(this);

      this.playerSprite = this.add.sprite(spawnX, spawnY, ASSETS.SPRITES.PLAYER.KEY);
      this.playerSprite.setDepth(DEPTHS.PLAYER);

      console.log('[DEBUG] playerSprite created, dumping state...');
      dumpPlayerSprite('AFTER CREATION', this.playerSprite);

      this.playerController = new PlayerController(
        playerEntity,
        movementComponent,
        inputService,
      );
      this.playerController.initialize(playerConfig);

      this.cameras.main.startFollow(this.playerSprite, true, 0.1, 0.1);

      for (const layerConfig of mapConfig.layers) {
        if (layerConfig.collisionEnabled) {
          const phaserLayer = this.tilemapService.getPhaserLayer(layerConfig.name);
          if (phaserLayer) {
            this.physics.add.collider(this.playerSprite, phaserLayer);
            console.log(`[DEBUG] Physics collider added for: ${layerConfig.name}`);
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

      // --- FINAL DUMP ---
      console.log('[DEBUG] === FINAL STATE DUMP ===');
      dumpSceneState(this, 'END OF create()');
      dumpCamera(this, 'END OF create()');
      dumpPlayerSprite('FINAL playerSprite', this.playerSprite);
      console.log('[DEBUG] === create() COMPLETE ===');

    } catch (err) {
      console.error('[DEBUG] EXCEPTION during create():', err);
      console.error('[DEBUG] stack:', (err as Error).stack);
    }
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
