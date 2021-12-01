import * as PIXI from 'pixi.js';
import Dot from './dot';

export default class Dots {
    app: PIXI.Application;
    container: PIXI.Container;

    constructor(container?: HTMLDivElement) {
        this.app = new PIXI.Application({
            resizeTo: container,
            antialias: true,
            transparent: true,
        })
        this.container = new PIXI.Container()
        container?.appendChild(this.app.view)
        this.app.start();
        this.app.stage.addChild(this.container)

        this.generateDots()
    }

    generateDots() {
        const space = 20
        for (let x = 0; x < this.app.view.width / space; x++) {
            for (let y = 0; y < this.app.view.height / space; y++) {
                new Dot(this.container, x, y)
            }
        }
    }
}