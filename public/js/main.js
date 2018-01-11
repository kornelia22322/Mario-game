import {loadLevel} from './loaders.js';
import Compositor from './Compositor.js'
import {loadBackgroundSprites} from './sprites.js';
import {createMario} from './entities.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import Entity from './Entity.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    loadBackgroundSprites(),
    loadLevel('1.1'),
    createMario()
    ]).then(([backgroundSprites, level, mario]) => {
        const comp = new Compositor();
        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites); 
        //comp.layers.push(backgroundLayer); 
        const gravity = 0.5;  

        const spriteLayer = createSpriteLayer(mario);
        comp.layers.push(spriteLayer);

        function update() {
            comp.draw(context);            
            mario.update();            
            mario.vel.y += gravity;
            //requestAnimationFrame(update);

            setTimeout(update, 1000/5);
        }

        update();
    });

