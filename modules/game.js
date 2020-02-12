let canvas;
let context;
let players;
let residues;

// change these to customize things
const boxSize = 2;
const areaWidth = 320;
const areaHeight = 200;
const numberOfPlayers = 4;
const residueLife = 1000;

const canvasHeight = boxSize * areaHeight;
const canvasWidth = boxSize * areaWidth;

class Drawable {
    constructor(x = 0, y = 0, color = '#FFFFFF') {
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
        switch (randN(4)) {
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
        } 
        if (this.y < 0) {
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
        this.life = residueLife;
        return;
    }

    isAlive() {
        this.life--;
        return this.life > 0;
    }
}

players  = [];
residues = [];

for(let i = 0; i < numberOfPlayers; i++) {
    players.push(new Player(areaWidth / 2, areaHeight / 2));
}

let clear = () => context.clearRect(0, 0, canvasWidth, canvasHeight);
let randN = (N) => Math.floor((Math.random() * N));

function loop() {
    clear();

    players.forEach(p => {
        p.step();
        residues.push(new Residue(p.x, p.y));
    });

    residues = residues.filter(r => r.isAlive());
    
    residues.forEach(r => r.draw());
    players.forEach(p => p.draw());

    return;
}

function startGame(c) {
    canvas = c;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext("2d");

    window.setInterval(loop, 25);
    return;
}

export { startGame };