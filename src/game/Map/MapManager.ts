import Phaser from 'phaser';
import { Tile } from './Tile';
import { MapGenerator } from './MapGenerator';
import { gridToIso, getMapIsoSize } from '../../utils/IsoUtils';
import { MAP_WIDTH, MAP_HEIGHT } from '../../config/constants';
import { TileType } from '../../types';

/**
 * Менеджер карты - управляет всеми тайлами
 */
export class MapManager {
  private scene: Phaser.Scene;
  private tiles: Tile[][] = [];
  private tilesGroup: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.tilesGroup = scene.add.group();
    this.generateMap();
  }

  /**
   * Генерирует карту
   */
  private generateMap(): void {
    const mapData = MapGenerator.generate();

    for (let y = 0; y < MAP_HEIGHT; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < MAP_WIDTH; x++) {
        const { x: isoX, y: isoY } = gridToIso(x, y);
        const tileType = mapData[y][x] as TileType;

        const tile = new Tile(this.scene, x, y, isoX, isoY, tileType);
        this.tiles[y][x] = tile;
        this.tilesGroup.add(tile.sprite);

        // Обработчики событий для тайла
        tile.sprite.on('pointerover', () => {
          tile.highlight();
        });

        tile.sprite.on('pointerout', () => {
          tile.unhighlight();
        });
      }
    }
  }

  /**
   * Получает тайл по координатам сетки
   */
  getTile(gridX: number, gridY: number): Tile | null {
    if (gridX < 0 || gridX >= MAP_WIDTH || gridY < 0 || gridY >= MAP_HEIGHT) {
      return null;
    }
    return this.tiles[gridY]?.[gridX] || null;
  }

  /**
   * Получает тайл по изометрическим координатам
   */
  getTileAtIso(isoX: number, isoY: number): Tile | null {
    // Упрощенная версия - можно улучшить
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        const tile = this.tiles[y][x];
        if (tile && Phaser.Geom.Rectangle.Contains(tile.sprite.getBounds(), isoX, isoY)) {
          return tile;
        }
      }
    }
    return null;
  }

  /**
   * Получает все тайлы
   */
  getAllTiles(): Tile[] {
    const allTiles: Tile[] = [];
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        if (this.tiles[y][x]) {
          allTiles.push(this.tiles[y][x]);
        }
      }
    }
    return allTiles;
  }

  /**
   * Получает размеры карты в изометрических координатах
   */
  getIsoSize(): { width: number; height: number } {
    return getMapIsoSize(MAP_WIDTH, MAP_HEIGHT);
  }

  /**
   * Уничтожает менеджер карты
   */
  destroy(): void {
    this.tilesGroup.clear(true, true);
    this.tiles = [];
  }
}

