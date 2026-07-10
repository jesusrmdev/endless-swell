/**
 * InputService - Servicio de entrada
 *
 * Captura y procesa input del teclado usando eventos DOM directos.
 * Más fiable que Phaser Keyboard en Mac y otros navegadores.
 * Abstrae la entrada del juego para mantener separación lógica/presentación.
 */

import type { IInputService } from './interfaces';
import type { InputState, GameKey, KeyState } from './types';

export class InputService implements IInputService {
  private pressedKeys: Set<string> = new Set();

  private state: InputState = {
    keys: {} as Record<GameKey, KeyState>,
    moveDirection: { x: 0, y: 0 },
    wantsToRun: false,
  };

  private previousKeys: Record<GameKey, boolean> = {} as Record<GameKey, boolean>;

  private handleKeyDown = (e: KeyboardEvent): void => {
    this.pressedKeys.add(e.code);
  };

  private handleKeyUp = (e: KeyboardEvent): void => {
    this.pressedKeys.delete(e.code);
  };

  initialize(_scene: Phaser.Scene): void {
    const stateKeys = {} as Record<GameKey, KeyState>;
    const gameKeys = [
      'arrow_up', 'arrow_down', 'arrow_left', 'arrow_right',
      'w', 'a', 's', 'd',
      'shift', 'space', 'enter', 'escape',
      'e', 'i', 'm', 'j',
    ] as GameKey[];

    for (const key of gameKeys) {
      stateKeys[key] = { isDown: false, justPressed: false, justReleased: false };
      this.previousKeys[key] = false;
    }

    this.state.keys = stateKeys;

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    console.log('[InputService] Initialized (DOM keys)');
  }

  update(_delta: number): void {
    const gameKeys = Object.keys(this.state.keys) as GameKey[];

    const keyCodeMap: Record<GameKey, string> = {
      arrow_up: 'ArrowUp',
      arrow_down: 'ArrowDown',
      arrow_left: 'ArrowLeft',
      arrow_right: 'ArrowRight',
      w: 'KeyW',
      a: 'KeyA',
      s: 'KeyS',
      d: 'KeyD',
      shift: 'ShiftLeft',
      space: 'Space',
      enter: 'Enter',
      escape: 'Escape',
      e: 'KeyE',
      i: 'KeyI',
      m: 'KeyM',
      j: 'KeyJ',
    };

    for (const key of gameKeys) {
      const code = keyCodeMap[key];
      const isDown = this.pressedKeys.has(code);
      const wasDown = this.previousKeys[key];

      this.state.keys[key] = {
        isDown,
        justPressed: isDown && !wasDown,
        justReleased: !isDown && wasDown,
      };

      this.previousKeys[key] = isDown;
    }

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
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.pressedKeys.clear();
    console.log('[InputService] Destroyed');
  }
}
