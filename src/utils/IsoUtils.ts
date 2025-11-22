import { TILE_SIZE, ISO_WIDTH_RATIO, ISO_HEIGHT_RATIO } from '../config/constants';
import type { GridPosition, IsoPosition } from '../types';

/**
 * Преобразует координаты сетки в изометрические координаты
 */
export function gridToIso(gridX: number, gridY: number): IsoPosition {
  const isoX = (gridX - gridY) * (TILE_SIZE / ISO_WIDTH_RATIO);
  const isoY = (gridX + gridY) * (TILE_SIZE / ISO_HEIGHT_RATIO);
  return { x: isoX, y: isoY };
}

/**
 * Преобразует изометрические координаты в координаты сетки
 */
export function isoToGrid(isoX: number, isoY: number): GridPosition {
  const gridX = (isoX / (TILE_SIZE / ISO_WIDTH_RATIO) + isoY / (TILE_SIZE / ISO_HEIGHT_RATIO)) / 2;
  const gridY = (isoY / (TILE_SIZE / ISO_HEIGHT_RATIO) - isoX / (TILE_SIZE / ISO_WIDTH_RATIO)) / 2;
  return { x: Math.round(gridX), y: Math.round(gridY) };
}

/**
 * Вычисляет размеры карты в изометрических координатах
 */
export function getMapIsoSize(mapWidth: number, mapHeight: number): { width: number; height: number } {
  const width = (mapWidth + mapHeight) * (TILE_SIZE / ISO_WIDTH_RATIO);
  const height = (mapWidth + mapHeight) * (TILE_SIZE / ISO_HEIGHT_RATIO);
  return { width, height };
}

