/**
 * Main - Entry point del juego
 *
 * Este archivo es el punto de entrada de la aplicación.
 * Inicializa el juego y lo ejecuta.
 */

import { Game } from './core/game/Game';

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  console.log('[Main] Initializing Endless Swell...');

  // Crear instancia del juego
  const game = new Game();

  // Exponer el juego globalmente para debugging (solo en desarrollo)
  if (import.meta.env.DEV) {
    (window as unknown as Record<string, unknown>)['endlessSwell'] = game;
    console.log('[Main] Game exposed as window.endlessSwell for debugging');
  }

  console.log('[Main] Endless Swell started successfully');
});
