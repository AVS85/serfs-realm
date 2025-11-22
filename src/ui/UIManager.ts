import Phaser from 'phaser';
import { ResourceManager } from '../game/Resources/ResourceManager';
import { ResourceType } from '../game/Resources/ResourceType';
import { EventBus } from '../utils/EventBus';

/**
 * Менеджер UI - управляет всеми элементами интерфейса
 */
export class UIManager {
  private scene: Phaser.Scene;
  private resourceManager: ResourceManager;
  private resourcePanel?: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, resourceManager: ResourceManager) {
    this.scene = scene;
    this.resourceManager = resourceManager;
    this.setupEventListeners();
    this.createResourcePanel();
  }

  /**
   * Настраивает слушатели событий
   */
  private setupEventListeners(): void {
    EventBus.on('resource-changed', this.updateResourcePanel, this);
  }

  /**
   * Создает панель ресурсов
   */
  private createResourcePanel(): void {
    const panel = this.scene.add.container(10, 10);
    
    const resources = this.resourceManager.getAll();
    let yOffset = 0;

    resources.forEach((resource) => {
      const text = this.scene.add.text(0, yOffset, '', {
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      });
      text.setScrollFactor(0);
      panel.add(text);
      yOffset += 35;
    });

    this.resourcePanel = panel;
    this.updateResourcePanel();
  }

  /**
   * Обновляет панель ресурсов
   */
  private updateResourcePanel(): void {
    if (!this.resourcePanel) return;

    const resources = this.resourceManager.getAll();
    const texts = this.resourcePanel.list as Phaser.GameObjects.Text[];

    resources.forEach((resource, index) => {
      if (texts[index]) {
        const resourceNames: Record<ResourceType, string> = {
          [ResourceType.WOOD]: 'Дерево',
          [ResourceType.STONE]: 'Камень',
          [ResourceType.FOOD]: 'Еда',
          [ResourceType.GOLD]: 'Золото',
        };
        texts[index].setText(
          `${resourceNames[resource.type]}: ${resource.amount}`
        );
      }
    });
  }

  /**
   * Уничтожает UI менеджер
   */
  destroy(): void {
    EventBus.off('resource-changed', this.updateResourcePanel, this);
    this.resourcePanel?.destroy();
  }
}

