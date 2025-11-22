// Основные типы и интерфейсы игры

export enum TileType {
  GRASS = 0,
  SAND = 1,
  WATER = 2,
}

export interface GridPosition {
  x: number;
  y: number;
}

export interface IsoPosition {
  x: number;
  y: number;
}

export interface TileData {
  gridX: number;
  gridY: number;
  type: TileType;
}

