import Phaser from 'phaser';

/**
 * Простая система событий для игры
 * Использует Phaser Events для коммуникации между системами
 */
export class EventBus {
  private static instance: Phaser.Events.EventEmitter | null = null;

  static getInstance(): Phaser.Events.EventEmitter {
    if (!EventBus.instance) {
      EventBus.instance = new Phaser.Events.EventEmitter();
    }
    return EventBus.instance;
  }

  static emit(event: string, ...args: any[]): void {
    EventBus.getInstance().emit(event, ...args);
  }

  static on(event: string, callback: Function, context?: any): void {
    EventBus.getInstance().on(event, callback, context);
  }

  static off(event: string, callback?: Function, context?: any): void {
    EventBus.getInstance().off(event, callback, context);
  }
}

