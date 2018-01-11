function drawBackground(backgrounds, context, sprites){
    backgrounds.ranges.forEach(([x1, x2, x3, x4]) => {    
        for(let x = x1; x < x2; x++){
            for(let y = x3; y < x4; y++ ){
                 sprites.drawTile(backgrounds.tile, context, x, y);
            }
        }
    });    
}

export function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites);
    });

    return function drawBackgroundlayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}

export function createSpriteLayer(entity){
    return function drawSpriteLayer(context) {
        entity.draw(context);                     
    };
}