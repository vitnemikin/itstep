import {AnimatedSprite} from "./animated_sprite.js";
import {params} from "./module.js";

// export class IntermediateResult {
//     input (...args) {
//         let obj = {}
//         args.forEach((value, index) => {
//             if (value === 'hited') hited = true;
//         });
//     };
// }

export class Interface extends AnimatedSprite {
    die () {
        alert('u died!');
    };
    
    hit (damage, healthpoint) {
        const maxHealth = healthpoint;
        if (healthpoint !== undefined) {
            healthpoint -= damage;
            if (healthpoint < 0) {
                this.die();
            }
        }

        const ctx = params.layer.ctx;
        params.heroLiveHearts = healthpoint;

        if (healthpoint < maxHealth) {
            ctx.clearRect(0, 0, 1000, 100);
            
            this.healthbar(params);
        }
    }
    
    healthbar (params) {
        const src = params.src
            , ctx = params.layer.ctx
            , hearts = params.heroLiveHearts
            , placementX = params.placementFromLeft
            , width = params.widthBetweenHearts
            , scaleFactor = params.size
            , placementY = params.placementFromTop;
        let calcX = placementX + width;
        const staticVal = calcX;
        let placements = [placementX];

        ctx.save();
        // Масштабируем контекст Canvas
        ctx.scale(scaleFactor, scaleFactor);

        for (let i = 1; i <= hearts; i++) {
            if (i === 1) ctx.drawImage(src, placementX, placementY);
            else {
                ctx.drawImage(src, calcX, placementY);   
                calcX += placementX + (staticVal - (placementX * 2));
            }
            // Для дальнейшей замены ярких сердец
            placements.push(calcX);
        }
        ctx.restore();
    };
}