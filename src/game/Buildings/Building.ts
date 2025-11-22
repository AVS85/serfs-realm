import Phaser from 'phaser';
import { BuildingType, BuildingConfig, BUILDING_CONFIGS } from './BuildingType';
import { gridToIso } from '../../utils/IsoUtils';

/**
 * Класс здания
 */
export class Building {
  public sprite: Phaser.GameObjects.Image;
  public type: BuildingType;
  public gridX: number;
  public gridY: number;
  public config: BuildingConfig;

  constructor(
    scene: Phaser.Scene,
    type: BuildingType,
    gridX: number,
    gridY: number
  ) {
    this.type = type;
    this.gridX = gridX;
    this.gridY = gridY;
    this.config = BUILDING_CONFIGS[type];

    const { x: isoX, y: isoY } = gridToIso(gridX, gridY);
    
    // Временно используем простой спрайт (позже можно заменить на реальные текстуры)
    this.sprite = scene.add.image(isoX, isoY, 'grass');
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setTint(0xff0000); // Красный цвет для отличия от тайлов
    this.sprite.setScale(this.config.width, this.config.height);
    this.sprite.setData('building', this);
  }

  /**
   * Уничтожает здание
   */
  destroy(): void {
    this.sprite.destroy();
  }
}

