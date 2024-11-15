import {GameObject} from "../../GameObject.js";
import {Vector2} from "../../Vector2.js";
import {Sprite} from "../../Sprite.js";
import {resources} from "../../Resource.js";
import {events} from "../../Events.js";

export class Rod extends GameObject {
  constructor(x,y) {
    super({
      name: "Rod",
      position: new Vector2(x,y)
    });
    const sprite = new Sprite({
      resource: resources.images.rod,
      position: new Vector2(0, -5) // Empujar hacia arriba visualmente
    })
    this.addChild(sprite);

  }

  ready() {
    events.on("HERO_POSITION", this, pos => {
      // detectar superposición...
      const roundedHeroX = Math.round(pos.x);
      const roundedHeroY = Math.round(pos.y);
      if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
        this.onCollideWithHero();
      }
    })
  }

  onCollideWithHero() {
    // Eliminar esta instancia de la escena
    this.destroy();

    // Alerta de otras cosas que recogimos una vara
    events.emit("HERO_PICKS_UP_ITEM", {
      type: "ROD",
      image: resources.images.rod,
      position: this.position
    })
  }
}