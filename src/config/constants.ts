// Константы игры

export const TILE_SIZE = 64; // Размер тайла в пикселях
export const MAP_WIDTH = 164; // Ширина карты в тайлах
export const MAP_HEIGHT = 164; // Высота карты в тайлах

// Изометрические параметры
export const ISO_HEIGHT_RATIO = 4; // Коэффициент высоты для изометрии (чем меньше, тем круче)
export const ISO_WIDTH_RATIO = 2; // Коэффициент ширины для изометрии

// Цвета тайлов
export const TILE_COLORS = {
  GRASS: 0x4a7c59,
  WATER: 0x3d5a80,
  SAND: 0xd4a574,
} as const;

// Настройки камеры
export const CAMERA_CONFIG = {
  DEFAULT_ZOOM: 0.7,
  MIN_ZOOM: 0.3,
  MAX_ZOOM: 2,
  SCROLL_SPEED: 5,
} as const;

// Настройки генерации карты
export const MAP_GENERATION = {
  WATER_THRESHOLD: 0.7, // Порог для воды (от центра)
  SAND_THRESHOLD: 0.6,  // Порог для песка (от центра)
} as const;

