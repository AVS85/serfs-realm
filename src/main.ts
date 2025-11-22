import Phaser from 'phaser';
import './style.css';

// Расширяем интерфейс Scene для хранения курсоров
interface GameScene extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
}

// Конфигурация игры
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'app',
  backgroundColor: '#2c3e50',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Загрузка ресурсов
function preload(this: GameScene) {
  // Создаем простые тайлы программно
  // Трава
  const grassGraphics = this.make.graphics({ x: 0, y: 0 });
  grassGraphics.fillStyle(0x4a7c59);
  grassGraphics.fillRect(0, 0, 64, 64);
  grassGraphics.generateTexture('grass', 64, 64);
  grassGraphics.destroy();

  // Вода
  const waterGraphics = this.make.graphics({ x: 0, y: 0 });
  waterGraphics.fillStyle(0x3d5a80);
  waterGraphics.fillRect(0, 0, 64, 64);
  waterGraphics.generateTexture('water', 64, 64);
  waterGraphics.destroy();

  // Песок/земля
  const sandGraphics = this.make.graphics({ x: 0, y: 0 });
  sandGraphics.fillStyle(0xd4a574);
  sandGraphics.fillRect(0, 0, 64, 64);
  sandGraphics.generateTexture('sand', 64, 64);
  sandGraphics.destroy();
}

// Создание сцены
function create(this: GameScene) {
  // Размеры карты (как в Serf City)
  const mapWidth = 64;
  const mapHeight = 64;
  const tileSize = 64; // Размер тайла в пикселях

  // Создаем группу для тайлов
  const tiles = this.add.group();

  // Простая генерация карты
  const mapData: number[][] = [];
  for (let y = 0; y < mapHeight; y++) {
    mapData[y] = [];
    for (let x = 0; x < mapWidth; x++) {
      // Простая генерация: вода по краям, трава в центре
      const distFromCenter = Math.sqrt(
        Math.pow(x - mapWidth / 2, 2) + Math.pow(y - mapHeight / 2, 2)
      );
      const maxDist = Math.sqrt(Math.pow(mapWidth / 2, 2) + Math.pow(mapHeight / 2, 2));
      
      if (distFromCenter > maxDist * 0.7) {
        mapData[y][x] = 2; // Вода
      } else if (distFromCenter > maxDist * 0.6) {
        mapData[y][x] = 1; // Песок
      } else {
        mapData[y][x] = 0; // Трава
      }
    }
  }

  // Заполняем карту тайлами (изометрический вид)
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      // Изометрические координаты
      const isoX = (x - y) * (tileSize / 2);
      const isoY = (x + y) * (tileSize / 4);

      // Выбираем текстуру в зависимости от типа тайла
      let textureKey = 'grass';
      if (mapData[y][x] === 1) textureKey = 'sand';
      if (mapData[y][x] === 2) textureKey = 'water';

      const tile = this.add.image(isoX, isoY, textureKey);
      tile.setOrigin(0.5, 0.5);
      tile.setData('gridX', x);
      tile.setData('gridY', y);
      tile.setInteractive();
      
      // Подсветка при наведении
      tile.on('pointerover', () => {
        tile.setTint(0xcccccc);
      });
      
      tile.on('pointerout', () => {
        tile.clearTint();
      });

      tiles.add(tile);
    }
  }

  // Настройка камеры для панорамирования
  const mapWidthPixels = (mapWidth + mapHeight) * (tileSize / 2);
  const mapHeightPixels = (mapWidth + mapHeight) * (tileSize / 4);
  
  this.cameras.main.setBounds(0, 0, mapWidthPixels, mapHeightPixels);
  this.cameras.main.setZoom(0.7);
  this.cameras.main.centerOn(mapWidthPixels / 2, mapHeightPixels / 2);

  // Управление камерой клавиатурой
  this.cursors = this.input.keyboard?.createCursorKeys();

  // Панорамирование мышью
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };

  this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    if (pointer.leftButtonDown()) {
      isDragging = true;
      dragStart.x = pointer.x;
      dragStart.y = pointer.y;
    }
  });

  this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
    if (isDragging) {
      const dx = dragStart.x - pointer.x;
      const dy = dragStart.y - pointer.y;
      this.cameras.main.scrollX += dx / this.cameras.main.zoom;
      this.cameras.main.scrollY += dy / this.cameras.main.zoom;
      dragStart.x = pointer.x;
      dragStart.y = pointer.y;
    }
  });

  this.input.on('pointerup', () => {
    isDragging = false;
  });

  // Зум колесиком мыши
  this.input.on('wheel', (_pointer: Phaser.Input.Pointer, _gameObjects: any[], _deltaX: number, deltaY: number, _deltaZ: number) => {
    const zoomFactor = deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Phaser.Math.Clamp(this.cameras.main.zoom * zoomFactor, 0.3, 2);
    this.cameras.main.setZoom(newZoom);
  });

  // Информация на экране
  const infoText = this.add.text(10, 10, 'Используйте стрелки для перемещения\nЗажмите ЛКМ для перетаскивания\nКолесико мыши для зума', {
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 10, y: 5 }
  });
  infoText.setScrollFactor(0); // Текст не двигается с камерой
}

function update(this: GameScene) {
  // Управление камерой клавиатурой
  if (this.cursors) {
    const speed = 5 / (this.cameras.main.zoom || 1);
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
}

// Запуск игры
const game = new Phaser.Game(config);

// Обработка изменения размера окна
window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
