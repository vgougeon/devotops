import { gsap, Power3 } from 'gsap';
import * as PIXI from 'pixi.js';

export default class Dot {
    initialSpacing = 20
    initialRadius = 2
    spacing = this.initialSpacing
    radius = this.initialRadius
    graphics: PIXI.Graphics = new PIXI.Graphics

    constructor(container: PIXI.Container, x: number, y: number) {
        this.graphics.beginFill(0xFFFFFF, 0.1)
        this.graphics.drawCircle(x * this.spacing, y * this.spacing, this.radius)
        this.graphics.endFill()
        this.graphics.alpha = x * 0.05
        const distance = x + y
        gsap.to(this.graphics, 6, {x: this.graphics.position.x + distance * 7, ease: Power3.easeInOut, yoyo: true, repeat: -1 })
        gsap.to(this.graphics, 6, {y: this.graphics.position.y + Math.random()* 400, ease: Power3.easeInOut, yoyo: true, repeat: -1 })
        container.addChild(this.graphics)
    }
}