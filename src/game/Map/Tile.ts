import Phaser from 'phaser';
import { TileType } from '../../types';
import { TileTypeHelper } from './TileType';

/**
 * Класс тайла на карте
 */
export class Tile {
  public sprite: Phaser.GameObjects.Image;
  public gridX: number;
  public gridY: number;
  public type: TileType;

  constructor(
    scene: Phaser.Scene,
    gridX: number,
    gridY: number,
    isoX: number,
    isoY: number,
    type: TileType
  ) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.type = type;

    const textureKey = TileTypeHelper.getTextureKey(type);
    this.sprite = scene.add.image(isoX, isoY, textureKey);
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setData('gridX', gridX);
    this.sprite.setData('gridY', gridY);
    this.sprite.setData('tile', this);
    this.sprite.setInteractive();
  }

  /**
   * Подсвечивает тайл при наведении
   */
  highlight(): void {
    this.sprite.setTint(0xcccccc);
  }

  /**
   * Убирает подсветку
   */
  unhighlight(): void {
    this.sprite.clearTint();
  }

  /**
   * Изменяет тип тайла
   */
  setType(type: TileType): void {
    this.type = type;
    const textureKey = TileTypeHelper.getTextureKey(type);
    this.sprite.setTexture(textureKey);
  }

  /**
   * Проверяет, можно ли ходить по тайлу
   */
  isWalkable(): boolean {
    return TileTypeHelper.isWalkable(this.type);
  }

  /**
   * Проверяет, можно ли строить на тайле
   */
  isBuildable(): boolean {
    return TileTypeHelper.isBuildable(this.type);
  }

  /**
   * Уничтожает тайл
   */
  destroy(): void {
    this.sprite.destroy();
  }
}

