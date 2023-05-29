import {AnimatedSprite} from './animated_sprite.js';
import {Player} from './player.js';
import {Interface} from './interface.js';
import {health} from './module.js';

export class Actions extends AnimatedSprite {
    speedX = 0;
    speedY = 0;

    show (x, y, speedX = this.speedX, speedY = this.speedY) {
        this.speedX = speedX;
        this.speedY = speedY;

        super.show(x, y);

        if (!this.timer) this.timer = setInterval(this.animate.bind(this), 30);
    };

    animate () {
        this.hide();
        this.x += this.speedX;
        this.y += this.speedY;

        let collided = this.layer.objects.some( (x) => {
            if (x === this) return false;
            return this.isCollision(x); 
        });

        if (this.x > this.layer.canvas.width || 
            this.y > this.layer.canvas.height ||
            collided) {

            clearInterval(this.timer);
            this.explosion(this);
            this.destroy();

            return;
        }

        this.c++;
        if (this.c >= this.cols) this.c = 0;

        this.show(this.x, this.y);
    };

    explosion (params, interfaceLayer) {
        const x = params.x;
        const y = params.y;
        const ctx = params.layer.ctx;

        const img  = new Image();
        img.src = './resources/explosion.png';

        ctx.save();
        ctx.scale(0.5, 0.5);
        let c = [0, 170, 360, 540, 730, 0, 180];
        let r = [0, 400];
        let i = 0, j = 0;

        const player = new Player (
            params.layer
            , './resources/zelda.png'
            , 105
            , 129
        );

        const interfacee = new Interface (
            params.layer
            , './resources/inter.jpg'
        );
        let timer = setInterval( () => {
            if (i === 10) {
                clearInterval(timer);

                this.ctx.clearRect(x, y, 500, 500);
                
                setTimeout( () => {
                    player.show(x, y);
                    interfacee.hit(1, health);
                }, 50);
            }
            if (i === 6) j++; 

            ctx.drawImage(
                img
                , c[i]
                , r[j]
                , 200
                , 200
                , x
                , y
                , 100
                , 100
            );
            i++;
        }, 100);

        ctx.restore()
    };
} 