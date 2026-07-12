/**
 * WorldScene - Escena del mundo
 *
 * Escena principal de exploración del mundo.
 * Utiliza CameraService y InteractionService.
 */

import Phaser from 'phaser';
import { SCENE_KEYS, DEPTHS, ASSETS } from '@core/constants/Constants';
import { PlayerEntity, PlayerController } from '@entities/player';
import type { PlayerConfig } from '@entities/player/types';
import { MovementComponent } from '@components/MovementComponent';
import { InputService } from '@services/InputService';
import { TilemapService, MapManager } from '@world/index';
import type { MapConfig, RegionConfig, MapObject } from '@world/types';
import { CameraService, OVERWORLD_PRESET } from '@services/CameraService';
import { InteractionService } from '@services/InteractionService';
import type { InteractiveObject } from '@services/InteractionService';
import playerData from '@data/entities/player.default.json';
import mapConfigData from '@data/maps/playa-calblanque.json';
import regionData from '@data/regions/murcia.json';

export class WorldScene extends Phaser.Scene {
  private playerController!: PlayerController;
  private playerSprite!: Phaser.GameObjects.Sprite;
  private tilemapService!: TilemapService;
  private mapManager!: MapManager;
  private cameraService!: CameraService;
  private interactionService!: InteractionService;
  private interactionText!: Phaser.GameObjects.Text;

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

    if (!this.textures.exists(ASSETS.SPRITES.PLAYER.KEY)) {
      console.error(`[WorldScene] ABORT: player texture "${ASSETS.SPRITES.PLAYER.KEY}" not found in cache.`);
      return;
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
        }
      }
    }

    // --- Initialize CameraService ---
    this.cameraService = new CameraService();
    this.cameraService.initialize(this);

    // --- Set camera bounds from tilemap ---
    const map = this.tilemapService.getPhaserMap();
    if (map) {
      this.cameraService.setBounds({
        x: 0,
        y: 0,
        width: map.widthInPixels,
        height: map.heightInPixels,
      });
      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      console.log(`[WorldScene] Camera bounds: ${map.widthInPixels}x${map.heightInPixels}`);
    }

    // --- Apply OVERWORLD preset ---
    this.cameraService.setPreset(OVERWORLD_PRESET);

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

    const playerEntity = new PlayerEntity(playerConfig);
    const movementComponent = new MovementComponent();
    movementComponent.setPosition({ x: spawnX, y: spawnY });

    const inputService = new InputService();
    inputService.initialize(this);

    this.playerSprite = this.add.sprite(spawnX, spawnY, ASSETS.SPRITES.PLAYER.KEY);
    this.playerSprite.setDepth(DEPTHS.PLAYER);

    this.playerController = new PlayerController(
      playerEntity,
      movementComponent,
      inputService,
    );
    this.playerController.initialize(playerConfig);

    // --- Camera follows player via CameraService ---
    this.cameraService.follow(this.playerSprite);

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

    // --- Initialize InteractionService ---
    this.interactionService = new InteractionService();
    this.interactionService.initialize(this);

    // --- Register interactive objects from map ---
    this.registerInteractiveObjects();

    // --- Interaction text display ---
    this.interactionText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height - 30,
      '',
      {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 8, y: 4 },
      },
    );
    this.interactionText.setOrigin(0.5, 0.5);
    this.interactionText.setScrollFactor(0);
    this.interactionText.setDepth(DEPTHS.UI);
    this.interactionText.setVisible(false);

    // --- UI overlay ---
    const instructionText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Flechas/WASD: Mover | SHIFT: Correr | E: Interactuar | ESC: Volver al menú',
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

  /**
   * Registra objetos interactivos desde el mapa
   */
  private registerInteractiveObjects(): void {
    const mapObjects = this.tilemapService.getObjectsFromLayer('Objects');

    const interactiveTypes = ['WelcomeSign', 'Door', 'SchoolEntrance'];

    for (const obj of mapObjects) {
      if (interactiveTypes.includes(obj.type)) {
        const interactiveObj: InteractiveObject = {
          id: obj.name,
          actionType: this.mapObjectTypeToAction(obj),
          position: { x: obj.x, y: obj.y },
          radius: 32,
          actionData: this.extractActionData(obj),
        };

        this.interactionService.registerObject(interactiveObj);
      }
    }
  }

  /**
   * Mapea tipo de objeto del mapa a tipo de acción
   */
  private mapObjectTypeToAction(obj: MapObject): 'sign' | 'door' | 'school_entrance' {
    switch (obj.type) {
      case 'WelcomeSign':
        return 'sign';
      case 'Door':
        return 'door';
      case 'SchoolEntrance':
        return 'school_entrance';
      default:
        return 'sign';
    }
  }

  /**
   * Extrae datos de acción desde el objeto del mapa
   */
  private extractActionData(obj: MapObject): Record<string, unknown> {
    const data: Record<string, unknown> = {};

    if (obj.properties) {
      if (obj.properties.message) {
        data.message = obj.properties.message;
      }
      if (obj.properties.targetMap) {
        data.targetMap = obj.properties.targetMap;
      }
    }

    return data;
  }

  update(_time: number, delta: number): void {
    // Update player movement
    this.playerController.update(delta);
    const position = this.playerController.getPosition();
    this.playerSprite.setPosition(position.x, position.y);

    // Update interaction service
    this.interactionService.update(position, delta);

    // Check for interaction input
    const inputService = this.playerController.getInputService();
    if (inputService && inputService.isKeyJustPressed('e')) {
      const result = this.interactionService.interact();
      if (result && result.message) {
        this.showInteractionMessage(result.message);
      }
    }

    // Update interaction message visibility
    if (this.interactionService.hasInteractionAvailable()) {
      this.interactionText.setVisible(true);
      this.interactionText.setText('Presiona [E] para interactuar');
    } else {
      this.interactionText.setVisible(false);
    }
  }

  /**
   * Muestra un mensaje de interacción
   */
  private showInteractionMessage(message: string): void {
    this.interactionText.setText(message);
    this.interactionText.setVisible(true);

    // Ocultar después de 2 segundos
    this.time.delayedCall(2000, () => {
      this.interactionText.setVisible(false);
    });
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
    if (this.cameraService) {
      this.cameraService.destroy();
    }
    if (this.interactionService) {
      this.interactionService.destroy();
    }
    console.log('[WorldScene] World scene shutdown');
  }
}
