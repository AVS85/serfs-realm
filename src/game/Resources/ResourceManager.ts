import { Resource, ResourceType } from './ResourceType';
import { EventBus } from '../../utils/EventBus';

/**
 * Менеджер ресурсов - управляет всеми ресурсами игрока
 */
export class ResourceManager {
  private resources: Map<ResourceType, number> = new Map();

  constructor() {
    // Инициализация начальных ресурсов
    this.resources.set(ResourceType.WOOD, 100);
    this.resources.set(ResourceType.STONE, 50);
    this.resources.set(ResourceType.FOOD, 200);
    this.resources.set(ResourceType.GOLD, 0);
  }

  /**
   * Получает количество ресурса
   */
  getAmount(type: ResourceType): number {
    return this.resources.get(type) || 0;
  }

  /**
   * Добавляет ресурсы
   */
  add(type: ResourceType, amount: number): void {
    const current = this.getAmount(type);
    this.resources.set(type, current + amount);
    EventBus.emit('resource-changed', type, this.getAmount(type));
  }

  /**
   * Тратит ресурсы
   */
  spend(type: ResourceType, amount: number): boolean {
    const current = this.getAmount(type);
    if (current >= amount) {
      this.resources.set(type, current - amount);
      EventBus.emit('resource-changed', type, this.getAmount(type));
      return true;
    }
    return false;
  }

  /**
   * Проверяет, достаточно ли ресурсов
   */
  hasEnough(type: ResourceType, amount: number): boolean {
    return this.getAmount(type) >= amount;
  }

  /**
   * Получает все ресурсы
   */
  getAll(): Resource[] {
    return Array.from(this.resources.entries()).map(([type, amount]) => ({
      type,
      amount,
    }));
  }
}

