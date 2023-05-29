import {generateActions} from "./module.js";

export class StaticSprite {
    ready = false;
    x = 0;    // текущая x координата на холсте
    y = 0;    // текущая y

    constructor (layer, src) {
        this.layer = layer;
        this.layer.add(this);
        this.ctx = layer.ctx;
        this.spriteSheet = new Image();
        this.spriteSheet.src = src;
        this.spriteSheet.onload = this.spriteLoaded.bind(this);
    }

    destroy () {
        // generateActions();
        this.hide();
        this.layer.remove(this);
        delete this;
    }

    spriteLoaded (ev) {
        this.ready = true;
        if (!this.width && !this.height) {
            this.width  = ev.target.width;
            this.height = ev.target.height; 
        }
    };

    show (x, y) {
        this.x = x;
        this.y = y;        
        this.ctx.drawImage(
            this.spriteSheet
            , 0
            , 0
            , this.width
            , this.height
            , this.x
            , this.y
            , this.width - 100
            , this.height - 260
        );
    };

    hide () {
        this.ctx.clearRect(
            this.x
            , this.y
            , this.width
            , this.height
        );
    };
}