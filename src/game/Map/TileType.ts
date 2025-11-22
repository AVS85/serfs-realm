import { TileType as TileTypeEnum } from '../../types';

/**
 * Утилиты для работы с типами тайлов
 */
export class TileTypeHelper {
  static getTextureKey(type: TileTypeEnum): string {
    switch (type) {
      case TileTypeEnum.GRASS:
        return 'grass';
      case TileTypeEnum.SAND:
        return 'sand';
      case TileTypeEnum.WATER:
        return 'water';
      default:
        return 'grass';
    }
  }

  static isWalkable(type: TileTypeEnum): boolean {
    return type !== TileTypeEnum.WATER;
  }

  static isBuildable(type: TileTypeEnum): boolean {
    return type === TileTypeEnum.GRASS || type === TileTypeEnum.SAND;
  }
}

