import { ResourceType } from '../Resources/ResourceType';

/**
 * Типы зданий
 */
export enum BuildingType {
  HOUSE = 'house',
  FARM = 'farm',
  MILL = 'mill',
  MINE = 'mine',
}

/**
 * Стоимость постройки здания
 */
export interface BuildingCost {
  type: ResourceType;
  amount: number;
}

/**
 * Конфигурация здания
 */
export interface BuildingConfig {
  type: BuildingType;
  name: string;
  cost: BuildingCost[];
  width: number; // Ширина в тайлах
  height: number; // Высота в тайлах
}

/**
 * Конфигурации всех зданий
 */
export const BUILDING_CONFIGS: Record<BuildingType, BuildingConfig> = {
  [BuildingType.HOUSE]: {
    type: BuildingType.HOUSE,
    name: 'Дом',
    cost: [
      { type: ResourceType.WOOD, amount: 20 },
      { type: ResourceType.STONE, amount: 10 },
    ],
    width: 2,
    height: 2,
  },
  [BuildingType.FARM]: {
    type: BuildingType.FARM,
    name: 'Ферма',
    cost: [
      { type: ResourceType.WOOD, amount: 15 },
    ],
    width: 3,
    height: 3,
  },
  [BuildingType.MILL]: {
    type: BuildingType.MILL,
    name: 'Мельница',
    cost: [
      { type: ResourceType.WOOD, amount: 30 },
      { type: ResourceType.STONE, amount: 20 },
    ],
    width: 2,
    height: 2,
  },
  [BuildingType.MINE]: {
    type: BuildingType.MINE,
    name: 'Шахта',
    cost: [
      { type: ResourceType.WOOD, amount: 25 },
      { type: ResourceType.STONE, amount: 15 },
    ],
    width: 2,
    height: 2,
  },
};

