/**
 * Математические утилиты
 */

/**
 * Вычисляет расстояние от точки до центра
 */
export function distanceFromCenter(x: number, y: number, centerX: number, centerY: number): number {
  return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
}

/**
 * Вычисляет максимальное расстояние от центра карты
 */
export function getMaxDistance(mapWidth: number, mapHeight: number): number {
  return Math.sqrt(Math.pow(mapWidth / 2, 2) + Math.pow(mapHeight / 2, 2));
}

/**
 * Ограничивает значение между min и max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

