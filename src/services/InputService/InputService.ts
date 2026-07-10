/**
 * InputService - Servicio de entrada
 *
 * Captura y procesa input del teclado.
 * Abstrae la entrada del juego de Phaser para mantener
 * la separación entre lógica y presentación.
 */

import type { IInputService } from './interfaces';
import type { InputState, GameKey, KeyState } from './types';

export class InputService implements IInputService {
  private scene: Phaser.Scene | null = null;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<string, Phaser.Input.Keyboard.Key>;
  private shiftKey!: Phaser.Input.Keyboard.Key;
  private keys!: Record<GameKey, Phaser.Input.Keyboard.Key>;

  private state: InputState = {
    keys: {} as Record<GameKey, KeyState>,
    moveDirection: { x: 0, y: 0 },
    wantsToRun: false,
  };

  private previousKeys: Record<GameKey, boolean> = {} as Record<GameKey, boolean>;

  initialize(scene: Phaser.Scene): void {
    this.scene = scene;

    if (!scene.input.keyboard) {
      console.error('[InputService] Keyboard not available');
      return;
    }

    // Teclas de cursor
    this.cursors = scene.input.keyboard.createCursorKeys();

    // Teclas WASD
    this.wasd = {
      W: scene.input.keyboard.addKey('W'),
      A: scene.input.keyboard.addKey('A'),
      S: scene.input.keyboard.addKey('S'),
      D: scene.input.keyboard.addKey('D'),
    };

    // Tecla Shift
    this.shiftKey = scene.input.keyboard.addKey('SHIFT');

    // Mapeo de teclas del juego
    this.keys = {
      arrow_up: this.cursors.up,
      arrow_down: this.cursors.down,
      arrow_left: this.cursors.left,
      arrow_right: this.cursors.right,
      w: this.wasd.W,
      a: this.wasd.A,
      s: this.wasd.S,
      d: this.wasd.D,
      shift: this.shiftKey,
      space: scene.input.keyboard.addKey('SPACE'),
      enter: scene.input.keyboard.addKey('ENTER'),
      escape: scene.input.keyboard.addKey('ESC'),
      e: scene.input.keyboard.addKey('E'),
      i: scene.input.keyboard.addKey('I'),
      m: scene.input.keyboard.addKey('M'),
      j: scene.input.keyboard.addKey('J'),
    } as Record<GameKey, Phaser.Input.Keyboard.Key>;

    // Inicializar estado de teclas
    const gameKeys = Object.keys(this.keys) as GameKey[];
    for (const key of gameKeys) {
      this.state.keys[key] = { isDown: false, justPressed: false, justReleased: false };
      this.previousKeys[key] = false;
    }

    console.log('[InputService] Initialized');
  }

  update(_delta: number): void {
    if (!this.scene?.input.keyboard) return;

    const gameKeys = Object.keys(this.keys) as GameKey[];

    for (const key of gameKeys) {
      const phaserKey = this.keys[key];
      const isDown = phaserKey.isDown;
      const wasDown = this.previousKeys[key];

      this.state.keys[key] = {
        isDown,
        justPressed: isDown && !wasDown,
        justReleased: !isDown && wasDown,
      };

      this.previousKeys[key] = isDown;
    }

    // Calcular dirección de movimiento
    let moveX = 0;
    let moveY = 0;

    if (this.state.keys.arrow_left.isDown || this.state.keys.a.isDown) {
      moveX -= 1;
    }
    if (this.state.keys.arrow_right.isDown || this.state.keys.d.isDown) {
      moveX += 1;
    }
    if (this.state.keys.arrow_up.isDown || this.state.keys.w.isDown) {
      moveY -= 1;
    }
    if (this.state.keys.arrow_down.isDown || this.state.keys.s.isDown) {
      moveY += 1;
    }

    // Normalizar diagonal
    if (moveX !== 0 && moveY !== 0) {
      const length = Math.sqrt(moveX * moveX + moveY * moveY);
      moveX /= length;
      moveY /= length;
    }

    this.state.moveDirection = { x: moveX, y: moveY };
    this.state.wantsToRun = this.state.keys.shift.isDown;
  }

  getState(): InputState {
    return {
      keys: { ...this.state.keys },
      moveDirection: { ...this.state.moveDirection },
      wantsToRun: this.state.wantsToRun,
    };
  }

  isKeyDown(key: GameKey): boolean {
    return this.state.keys[key]?.isDown ?? false;
  }

  isKeyJustPressed(key: GameKey): boolean {
    return this.state.keys[key]?.justPressed ?? false;
  }

  isKeyJustReleased(key: GameKey): boolean {
    return this.state.keys[key]?.justReleased ?? false;
  }

  getMoveDirection(): { x: number; y: number } {
    return { ...this.state.moveDirection };
  }

  wantsToRun(): boolean {
    return this.state.wantsToRun;
  }

  destroy(): void {
    this.scene = null;
    console.log('[InputService] Destroyed');
  }
}
