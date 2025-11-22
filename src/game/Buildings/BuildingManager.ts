import Phaser from 'phaser';
import { Building } from './Building';
import { BuildingType } from './BuildingType';
import { ResourceManager } from '../Resources/ResourceManager';
import { MapManager } from '../Map/MapManager';

/**
 * Менеджер зданий - управляет всеми зданиями
 */
export class BuildingManager {
  private scene: Phaser.Scene;
  private buildings: Building[] = [];
  private resourceManager: ResourceManager;
  private mapManager: MapManager;

  constructor(
    scene: Phaser.Scene,
    resourceManager: ResourceManager,
    mapManager: MapManager
  ) {
    this.scene = scene;
    this.resourceManager = resourceManager;
    this.mapManager = mapManager;
  }

  /**
   * Строит здание
   */
  build(type: BuildingType, gridX: number, gridY: number): boolean {
    // TODO: Проверка возможности постройки
    // TODO: Проверка ресурсов
    // TODO: Проверка места для постройки

    const building = new Building(this.scene, type, gridX, gridY);
    this.buildings.push(building);
    return true;
  }

  /**
   * Получает все здания
   */
  getAllBuildings(): Building[] {
    return [...this.buildings];
  }

  /**
   * Получает здание по координатам
   */
  getBuildingAt(gridX: number, gridY: number): Building | null {
    return (
      this.buildings.find(
        (b) => b.gridX === gridX && b.gridY === gridY
      ) || null
    );
  }

  /**
   * Уничтожает здание
   */
  destroyBuilding(building: Building): void {
    const index = this.buildings.indexOf(building);
    if (index > -1) {
      this.buildings.splice(index, 1);
      building.destroy();
    }
  }
}

