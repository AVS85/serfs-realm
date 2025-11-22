/**
 * Типы ресурсов в игре
 */
export enum ResourceType {
  WOOD = 'wood',
  STONE = 'stone',
  FOOD = 'food',
  GOLD = 'gold',
}

/**
 * Интерфейс ресурса
 */
export interface Resource {
  type: ResourceType;
  amount: number;
}

