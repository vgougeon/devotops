import { gsap, Power3, Elastic } from 'gsap';
import * as PIXI from 'pixi.js';

export default class Dot {
    initialSpacing = 25
    initialRadius = 2
    spacing = this.initialSpacing
    radius = this.initialRadius
    graphics: PIXI.Graphics = new PIXI.Graphics
    tl: gsap.core.Timeline;

    constructor(container: PIXI.Container, x: number, y: number) {
        this.graphics.beginFill(0xFFFFFF, 0.1)
        this.graphics.drawCircle(x * this.spacing, y * this.spacing, this.radius)
        this.graphics.endFill()
        this.graphics.alpha = x * 0.05
        // gsap.to(this.graphics, 6, {x: this.graphics.position.x + distance * 7, ease: Power3.easeInOut, yoyo: true, repeat: -1 })
        this.tl = gsap.timeline({repeat: -1, repeatDelay: 0, yoyo: true});
        this.tl.to(this.graphics, 6, {y: this.graphics.position.y + Math.random()* 400, ease: Elastic.easeInOut.config(0.5, 0.3) })
        this.tl.to(this.graphics, 4, {x: this.graphics.position.x + (Math.random()* 200) -100, ease: Elastic.easeInOut.config(0.5, 0.3) })
        container.addChild(this.graphics)
    }

    destroy() {
        this.tl.kill()
    }
}