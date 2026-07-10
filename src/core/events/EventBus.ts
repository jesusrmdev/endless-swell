/**
 * EventBus - Sistema de eventos pub/sub para comunicación entre engines
 *
 * Permite la comunicación desacoplada entre diferentes sistemas del juego.
 * Los engines se suscriben a eventos y publican eventos sin conocerse entre sí.
 *
 * @example
 * ```typescript
 * // Suscribirse a un evento
 * EventBus.on('ocean:wave-created', (data) => {
 *   console.log('Nueva ola:', data);
 * });
 *
 * // Publicar un evento
 * EventBus.emit('ocean:wave-created', { height: 2, speed: 1.5 });
 * ```
 */

export type EventCallback<T = unknown> = (data: T) => void;

export interface EventSubscription {
  unsubscribe: () => void;
}

export class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, Set<EventCallback>> = new Map();

  private constructor() {}

  /**
   * Obtiene la instancia singleton del EventBus
   */
  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  /**
   * Suscribe un callback a un evento
   * @param event - Nombre del evento
   * @param callback - Función a ejecutar cuando se lance el evento
   * @returns Objeto con método unsubscribe para cancelar la suscripción
   */
  on<T = unknown>(event: string, callback: EventCallback<T>): EventSubscription {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(callback as EventCallback);

    return {
      unsubscribe: () => {
        this.off(event, callback);
      },
    };
  }

  /**
   * Suscribe un callback a un evento, ejecutándose solo una vez
   * @param event - Nombre del evento
   * @param callback - Función a ejecutar
   */
  once<T = unknown>(event: string, callback: EventCallback<T>): void {
    const wrapper = (data: T): void => {
      this.off(event, wrapper);
      callback(data);
    };

    this.on(event, wrapper);
  }

  /**
   * Cancela la suscripción de un callback a un evento
   * @param event - Nombre del evento
   * @param callback - Función a cancelar
   */
  off<T = unknown>(event: string, callback: EventCallback<T>): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback as EventCallback);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  /**
   * Emite un evento con datos
   * @param event - Nombre del evento
   * @param data - Datos a enviar a los suscriptores
   */
  emit<T = unknown>(event: string, data?: T): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event handler for '${event}':`, error);
        }
      });
    }
  }

  /**
   * Elimina todos los suscriptores de un evento específico
   * @param event - Nombre del evento
   */
  removeAllListeners(event: string): void {
    this.listeners.delete(event);
  }

  /**
   * Elimina todos los suscriptores de todos los eventos
   */
  clear(): void {
    this.listeners.clear();
  }

  /**
   * Obtiene el número de suscriptores para un evento
   * @param event - Nombre del evento
   * @returns Número de suscriptores
   */
  listenerCount(event: string): number {
    return this.listeners.get(event)?.size ?? 0;
  }
}

// Instancia global del EventBus
export const eventBus = EventBus.getInstance();
