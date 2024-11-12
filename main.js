import './style.css'
import { resources } from './src/Resource';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';
import {GameLoop} from './src/GameLoop';
import { Input, DOWN, LEFT, RIGHT, UP } from './src/Input';
import { gridCells, isSpaceFree } from './src/helpers/Grid';
import { moveTowards } from './src/helpers/MoveTowards';
import { walls } from './src/levels/level1';
import { Animations } from './src/Animations';
import { FrameIndexPattern } from './src/FrameIndexPattern';
import { WALK_DOWN, WALK_UP, WALK_LEFT, WALK_RIGTH, STAND_DOWN,STAND_UP, STAND_RIGTH, STAND_LEFT } from './src/objects/Hero/heroAnimations';

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
})
const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
})

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(5)),
  animations: new Animations({
    walkDown: new FrameIndexPattern(WALK_DOWN),
    walkUp: new FrameIndexPattern(WALK_UP),
    walkLeft: new FrameIndexPattern(WALK_LEFT),
    walkRigth: new FrameIndexPattern(WALK_RIGTH),

    standDown: new FrameIndexPattern(STAND_DOWN),
    standUp: new FrameIndexPattern(STAND_UP),
    standLeft: new FrameIndexPattern(STAND_LEFT),
    standRigth: new FrameIndexPattern(STAND_RIGTH),
  })
})

const heroDestinationPosition = hero.position.duplicate();
let heroFacing = DOWN;

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32)
})

// const heroPos = new Vector2(16 * 6, 16 * 5);
const input = new Input();

const update = (delta) => {

  const distance = moveTowards(hero, heroDestinationPosition, 1);
  const hasArrived = distance <= 1;
  if (hasArrived) {
    tryMove()
  }
  // return;
  hero.step(delta);
}

const tryMove = () => {

  if (!input.direction) {

    if (heroFacing === LEFT) {hero.animations.play('standLeft')}
    if (heroFacing === RIGHT) {hero.animations.play('standRight')}
    if (heroFacing === UP) {hero.animations.play('standUp')}
    if (heroFacing === DOWN) {hero.animations.play('standDown')}

    return;
  }

  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;
  const gridSize = 16;

  if (input.direction === DOWN) {
    nextY += gridSize;
    hero.animations.play = ('walkDown');
  }
  if (input.direction === UP) {    
    nextY -= gridSize;
    hero.animations.play = ('walkUp');
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
    hero.animations.play = ('walkLeft');
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    hero.animations.play = ('walkRight');
  }

  heroFacing = input.direction ?? heroFacing;

  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;    
  }
}

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0); 

  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x+heroOffset.x;
  const heroPosY = hero.position.y+1+heroOffset.y;
  
  shadow.drawImage (ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();

// setInterval(() => { 
//   hero.frame += 1; 
//   draw()
// }, 300)