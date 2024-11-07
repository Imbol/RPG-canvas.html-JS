import './style.css'
import { resourses } from './src/Resource';

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

const draw = () => {
  const sky = resourses.images.sky;
  if (sky.isLoaded) {
    ctx.drawImage(sky.image, 0, 0)
  }
  
  const ground = resourses.images.ground;
    if (ground.isLoaded) {
      ctx.drawImage(ground.image, 0, 0)
    }
}


setInterval(() => {  
  draw()
}, 300)