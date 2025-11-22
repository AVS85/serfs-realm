import Phaser from 'phaser';
import './style.css';
import { gameConfig } from './config/gameConfig';
import { GameScene } from './scenes/GameScene';

// Создаем конфигурацию с нашей сценой
const config: Phaser.Types.Core.GameConfig = {
  ...gameConfig,
  scene: [GameScene],
};

// Запуск игры
const game = new Phaser.Game(config);

// Обработка изменения размера окна
window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
