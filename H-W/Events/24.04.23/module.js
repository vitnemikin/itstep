import {StaticSprite} from './static_sprite.js';
import {Layer} from './layer.js';
import {Actions} from './actions.js';
import {Player} from './player.js';
import {Interface} from './interface.js';

const gameplayCanvas = document.querySelector('#gameplay');
gameplayCanvas.width = window.innerWidth;
gameplayCanvas.height = window.innerHeight;

const interfaceCanvas = document.querySelector('#interface');
interfaceCanvas.width = window.innerWidth;

const backgroundCanvas = document.querySelector('#background');
backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

const backgroundLayer = new Layer(backgroundCanvas);
const interfaceLayer = new Layer(interfaceCanvas);
const gameplayLayer = new Layer(gameplayCanvas);

const background = new StaticSprite (
    backgroundLayer
    , './resources/back.png'
    , interfaceCanvas.width
    , interfaceCanvas.height
);
setTimeout( () => background.show(-100,0), 20 );

// Healthbar
const image = new Image();
image.src = './resources/healthLive.png';
// Параметры для здоровья игрока
const healthbarParams = {
    layer: gameplayLayer
    , src: image
    , placementFromLeft: 100
    , placementFromTop: 50
    , heroLiveHearts: 5
    , widthBetweenHearts: 300 // По-умолчанию 300
    , size: 0.15 // Это масштабируемость, по умолчанию 0.15
};
export let params = healthbarParams;
export let health = healthbarParams.heroLiveHearts;
const interfacee = new Interface (
    interfaceLayer
    , './resources/inter.jpg'
);

setTimeout( () => {
    interfacee.show(0, 0);
    interfacee.healthbar(healthbarParams);
}, 20 );

const player = new Player (
    gameplayLayer
    , './resources/zelda.png'
    , 105
    , 129
);

setTimeout( () => player.show(300, 200), 20 );

gameplayLayer.add(player);

// Контроллер...
let controls = {
    'KeyA': {pressed: false, direction: 'left'},
    'KeyS': {pressed: false, direction: 'down'},
    'KeyD': {pressed: false, direction: 'right'},
    'KeyW': {pressed: false, direction: 'up'}
}

window.onkeydown = (ev) => {
    if (controls.hasOwnProperty(ev.code)) {
        const key = controls[ev.code];

        if (key.pressed) return;
        key.pressed = true;

        // Проверяем, не нажаты ли одновременно другие кнопки
        const simultaneousKeysPressed = Object.values(controls).some(control => control.pressed && control.direction !== key.direction);
        // Если есть одновременно нажатые кнопки, ничего не делаем
        if (simultaneousKeysPressed) return;        
        // Иначе
        controls[ev.code].timer = setInterval( () => {
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

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function generateActions () {
    let actions = new Actions (
        gameplayLayer
        , './resources/fireball_40x40.png'
        , 40
        , 40
    );

    gameplayLayer.add(actions);
    setTimeout( () => {
        actions.show(200, getRandom(-1000, 100), 5, 15);
    }, 50);
}

generateActions();