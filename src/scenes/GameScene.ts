import Phaser from 'phaser';
import { MapManager } from '../game/Map/MapManager';
import { ResourceManager } from '../game/Resources/ResourceManager';
import { BuildingManager } from '../game/Buildings/BuildingManager';
import { UIManager } from '../ui/UIManager';
import { TILE_COLORS, CAMERA_CONFIG } from '../config/constants';

/**
 * Основная игровая сцена
 */
export class GameScene extends Phaser.Scene {
  private mapManager!: MapManager;
  private resourceManager!: ResourceManager;
  private buildingManager!: BuildingManager;
  private uiManager!: UIManager;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private isDragging = false;
  private dragStart = { x: 0, y: 0 };

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    // Создаем простые тайлы программно
    this.createTileTexture('grass', TILE_COLORS.GRASS);
    this.createTileTexture('water', TILE_COLORS.WATER);
    this.createTileTexture('sand', TILE_COLORS.SAND);
  }

  create(): void {
    // Создаем менеджеры
    this.resourceManager = new ResourceManager();
    this.mapManager = new MapManager(this);
    this.buildingManager = new BuildingManager(
      this,
      this.resourceManager,
      this.mapManager
    );
    this.uiManager = new UIManager(this, this.resourceManager);

    // Настройка камеры
    this.setupCamera();

    // Настройка управления
    this.setupControls();

    // Информационный текст
    this.createInfoText();
  }

  update(): void {
    this.handleKeyboardInput();
  }

  /**
   * Создает текстуру тайла
   */
  private createTileTexture(key: string, color: number): void {
    const graphics = this.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(color);
    graphics.fillRect(0, 0, 64, 64);
    graphics.generateTexture(key, 64, 64);
    graphics.destroy();
  }

  /**
   * Настраивает камеру
   */
  private setupCamera(): void {
    const { width, height } = this.mapManager.getIsoSize();

    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.setZoom(CAMERA_CONFIG.DEFAULT_ZOOM);
    this.cameras.main.centerOn(width / 2, height / 2);
  }

  /**
   * Настраивает управление
   */
  private setupControls(): void {
    // Клавиатура
    this.cursors = this.input.keyboard?.createCursorKeys();

    // Перетаскивание мышью
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        this.isDragging = true;
        this.dragStart.x = pointer.x;
        this.dragStart.y = pointer.y;
      }
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.isDragging) {
        const dx = this.dragStart.x - pointer.x;
        const dy = this.dragStart.y - pointer.y;
        this.cameras.main.scrollX += dx / this.cameras.main.zoom;
        this.cameras.main.scrollY += dy / this.cameras.main.zoom;
        this.dragStart.x = pointer.x;
        this.dragStart.y = pointer.y;
      }
    });

    this.input.on('pointerup', () => {
      this.isDragging = false;
    });

    // Зум колесиком мыши
    this.input.on('wheel', (_pointer: Phaser.Input.Pointer, _gameObjects: any[], _deltaX: number, deltaY: number, _deltaZ: number) => {
      const zoomFactor = deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Phaser.Math.Clamp(
        this.cameras.main.zoom * zoomFactor,
        CAMERA_CONFIG.MIN_ZOOM,
        CAMERA_CONFIG.MAX_ZOOM
      );
      this.cameras.main.setZoom(newZoom);
    });
  }

  /**
   * Обрабатывает ввод с клавиатуры
   */
  private handleKeyboardInput(): void {
    if (!this.cursors) return;

    const speed = CAMERA_CONFIG.SCROLL_SPEED / (this.cameras.main.zoom || 1);

    if (this.cursors.left.isDown) {
      this.cameras.main.scrollX -= speed;
    }
    if (this.cursors.right.isDown) {
      this.cameras.main.scrollX += speed;
    }
    if (this.cursors.up.isDown) {
      this.cameras.main.scrollY -= speed;
    }
    if (this.cursors.down.isDown) {
      this.cameras.main.scrollY += speed;
    }
  }

  /**
   * Создает информационный текст
   */
  private createInfoText(): void {
    const infoText = this.add.text(10, 10, 'Используйте стрелки для перемещения\nЗажмите ЛКМ для перетаскивания\nКолесико мыши для зума', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 },
    });
    infoText.setScrollFactor(0); // Текст не двигается с камерой
  }
}

