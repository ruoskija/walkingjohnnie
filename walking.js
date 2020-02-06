(() => {
"use strict";

class Drawable {
    constructor(x=0, y=0, color='#FFFFFF') {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.x * boxSize, this.y * boxSize, boxSize, boxSize);
        return;
    }
}

class Player extends Drawable {
    constructor(x, y) {
        super(x, y);
    }

    step() {
        switch(randN(4)) {
            case 0:
                this.x += 1;
                break;
            case 1:
                this.y += 1;
                break;
            case 2:
                this.y -= 1;
                break;
            default:
                this.x -= 1;
        }
    
        if (this.x > areaWidth) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = areaWidth - 1;
        } else if (this.y < 0) {
            this.y = areaHeight - 1;
        } else if (this.y > areaHeight) {
            this.y = 0;
        }
    }
}

class Residue extends Drawable {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.color = '#000000';
        this.life = 17432;
        return;
    }

    isAlive() {
        this.life -= 1;
        return this.life > 0;
    }
}

let canvas;
let context;

const boxSize = 2;

const areaWidth  = 320;
const areaHeight = 200;

let player = new Player(areaWidth / 2, areaHeight / 2);

//const area = [];
//for (let i = areaWidth * areaHeight; i >= 0; i -= 1) {
//    area.push(0);
//}

let residues = [];

const canvasHeight = boxSize * areaHeight;
const canvasWidth  = boxSize * areaWidth;

let clear = () => context.clearRect(0, 0, canvas.width, canvas.height);
let randN = (N) => Math.floor((Math.random() * N));

function loop() {
    clear();

    player.step();
    
    residues.push(new Residue(player.x, player.y));
    residues = residues.filter(r => r.isAlive());
    residues.forEach(r => r.draw());

    player.draw();

    return;
}

function startGame() {

    canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext("2d");
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    
    window.setInterval(loop, 25);
    return;
}

this.onload = startGame;

})();