import {StaticSprite} from './static_sprite.js';
import {Layer} from './layer.js';
import {FireBall} from './actions.js';
import {Player} from './player.js';

const gameplayCanvas = document.querySelector('#gameplay');
gameplayCanvas.width = window.innerWidth;
gameplayCanvas.height = window.innerHeight;

const backgroundCanvas = document.querySelector('#background');
backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

const backgroundLayer = new Layer(backgroundCanvas);
const gameplayLayer = new Layer(gameplayCanvas);

const background = new StaticSprite(backgroundLayer, './resources/backg.jpg');
setTimeout( () => background.show(0,0), 20 );


const player = new Player(gameplayLayer, './resources/char_95x159.png', 95, 159);
setTimeout( () => player.show(300,200), 20 );

gameplayLayer.add(player);



let controls = {
    'KeyA': {pressed: false, direction: 'left'},
    'KeyS': {pressed: false, direction: 'down'},
    'KeyD': {pressed: false, direction: 'right'},
    'KeyW': {pressed: false, direction: 'up'}
}

window.onkeydown = (ev) => {
    if (controls.hasOwnProperty(ev.code)) {
        if (controls[ev.code].pressed) return;
        controls[ev.code].pressed = true;
        controls[ev.code].timer = setInterval( () =>{
            player.animate(controls[ev.code].direction);
        }, 75);
        player.animate(controls[ev.code].direction);

    } else if (ev.code === 'Space') {
        // let maskData = player.collisionMasks[player.r][player.c];
        // let maskImage = new ImageData(maskData, player.savedData.width, player.savedData.height);
        // let ctx = backgroundCanvas.getContext('2d');
        // ctx.putImageData(maskImage, 200, 200);
        
    }
}

window.onkeyup = (ev) => {
    if (controls.hasOwnProperty(ev.code)) {
        controls[ev.code].pressed = false;
        clearInterval( controls[ev.code].timer );
    }
}

function generateFireball () {
    let fireball = new FireBall (gameplayLayer, './resources/fireball_40x40.png', 40, 40);
    gameplayLayer.add(fireball);
    setTimeout( () => fireball.show(200, 10, 5, 5), 50);
    fireball.ondestroy = generateFireball;
}

generateFireball();