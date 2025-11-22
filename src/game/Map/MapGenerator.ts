import { TileType } from '../../types';
import { MAP_WIDTH, MAP_HEIGHT, MAP_GENERATION } from '../../config/constants';
import { distanceFromCenter, getMaxDistance } from '../../utils/MathUtils';

/**
 * Генератор карты
 */
export class MapGenerator {
  /**
   * Генерирует данные карты
   */
  static generate(): number[][] {
    const mapData: number[][] = [];
    const centerX = MAP_WIDTH / 2;
    const centerY = MAP_HEIGHT / 2;
    const maxDist = getMaxDistance(MAP_WIDTH, MAP_HEIGHT);

    for (let y = 0; y < MAP_HEIGHT; y++) {
      mapData[y] = [];
      for (let x = 0; x < MAP_WIDTH; x++) {
        const distFromCenter = distanceFromCenter(x, y, centerX, centerY);

        if (distFromCenter > maxDist * MAP_GENERATION.WATER_THRESHOLD) {
          mapData[y][x] = TileType.WATER;
        } else if (distFromCenter > maxDist * MAP_GENERATION.SAND_THRESHOLD) {
          mapData[y][x] = TileType.SAND;
        } else {
          mapData[y][x] = TileType.GRASS;
        }
      }
    }

    return mapData;
  }
}

