import './style.css'
import { resources } from './src/Resource';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';
import { GameLoop } from './src/GameLoop';
import { Input } from './src/Input';
import { gridCells } from './src/helpers/Grid';
import { GameObject } from './src/GameObject';
import { Hero } from './src/objects/Hero/Hero';
import { events } from './src/Events';
import { Camera } from './src/Camera';

//Agarrando el canvas para dibujar
const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

//Establecer la escena raíz
const mainScene = new GameObject({
  position: new Vector2(0, 0)
})

//Construye la escena agregando un cielo, un suelo y un héroe.
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
})
mainScene.addChild(skySprite);

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
})
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);

const camera = new Camera()
mainScene.addChild(camera);

// const heroPos = new Vector2(16 * 6, 16 * 5);
//Agregar una clase de entrada a la escena principal
mainScene.input = new Input();

//Establecer bucles de actualización y dibujo
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)
}

const draw = () => {

  // Limpia todo lo que esté obsoleto
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Guardar el estado actual (para el desplazamiento de la cámara)
  ctx.save();

  //Desplazamiento por posición de la cámara
  ctx.translate(camera.position.x, camera.position.y);

  //Dibujar objetos en la escena montada
  mainScene.draw(ctx, 0, 0);

  // Restaurar al estado original
  ctx.restore();
}

//Iniciar el juego
const gameLoop = new GameLoop(update, draw);
gameLoop.start();

// setInterval(() => { 
//   hero.frame += 1; 
//   draw()
// }, 300)