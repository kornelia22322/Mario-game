import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './loaders.js';

function drawBackground(backgrounds, context, sprites){
    backgrounds.ranges.forEach(([x1, x2, x3, x4]) => {    
        for(let x = x1; x < x2; x++){
            for(let y = x3; y < x4; y++ ){
                 sprites.drawTile(backgrounds.tile, context, x, y);
            }
        }
    });    
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.fillRect(0,0,50,50);

loadImage('img/tiles.png').then( image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);

    loadLevel('1.1')
    .then(level => {
        level.backgrounds.forEach(background => {
             drawBackground(background, context, sprites);
        });
    });

});