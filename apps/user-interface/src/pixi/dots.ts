import { gsap, Power3 } from 'gsap';
import {  BulgePinchFilter, GlowFilter, RadialBlurFilter, ShockwaveFilter } from 'pixi-filters';
import * as PIXI from 'pixi.js';
import Dot from './dot';

export default class Dots {
    app: PIXI.Application;
    container: PIXI.Container;
    height = 600;
    speed = 0.05
    mouse: {x: number, y: number };
    ticker = new PIXI.Ticker()
    dots: Dot[] = [];
    resizeEvent = this.resize.bind(this)
    constructor(container?: HTMLDivElement) {
        container!.style.height = '600px'
        this.app = new PIXI.Application({
            resizeTo: container,
            backgroundAlpha: 0,
            // antialias: true,
        })
        this.container = new PIXI.Container()
        const filter = new RadialBlurFilter(0.5, [this.app.view.width / 4, this.app.view.height / 2])
        const shockwave = new ShockwaveFilter([this.app.view.width / 2, this.app.view.height / 2])
        shockwave.time = 0.02
        shockwave.brightness = 1.6
        shockwave.amplitude = 15
        this.container.filters = [new GlowFilter({ outerStrength: 2}), shockwave]
        container?.appendChild(this.app.view)
        this.app.start();
        this.app.stage.addChild(this.container)
        this.mouse = { x: this.app.view.width / 2, y: this.app.view.height / 2 }
        window.addEventListener('resize', this.resizeEvent)

        this.generateDots()

        gsap.to(shockwave, { time: 0.5, yoyo: true, duration: 6, repeat: -1, ease: Power3.easeInOut})
        this.ticker.add(() => {
            const mouse = this.app.renderer.plugins.interaction.mouse.global

            this.mouse.x += (mouse.x - this.mouse.x) * this.speed
            this.mouse.y += (mouse.y - this.mouse.y) * this.speed
        })
        
    }

    resize() {
        this.app.resize()
        this.generateDots()
    }

    generateDots() {
        this.container.removeChildren()
        const space = 25
        for (let x = 0; x < this.app.view.width / space; x++) {
            for (let y = 0; y < this.height / space; y++) {
                this.dots.push(new Dot(this.container, x, y))
            }
        }
    }

    destroy() {
        for(let dot of this.dots) dot.destroy()
        window.removeEventListener('resize', this.resizeEvent)
        this.ticker.stop()
        this.ticker.destroy()
        this.app.destroy()
    }
}