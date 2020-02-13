let canvas;
let context;
let players;
let residues;
let paused;

// change these to customize things
const boxSize = 2;
const areaWidth = 320;
const areaHeight = 200;
const numberOfPlayers = 40;

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
        this.color = 'red';
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
        this.color = '#333333';
        return;
    }
}

players  = [];
residues = [];
paused   = false;

for(let i = 0; i < numberOfPlayers; i++) {
    players.push(new Player(areaWidth / 2, areaHeight / 2));
}

let clear = () => context.clearRect(0, 0, canvasWidth, canvasHeight);
let randN = (N) => Math.floor((Math.random() * N));

function loop() {
    players.forEach(p => {
        residues.push(new Residue(p.x, p.y));
        p.step();
    });

    residues.forEach(r => r.draw());
    residues = [];

    players.forEach(p => p.draw());

    if (!paused) {
        window.requestAnimationFrame(loop);
    }
    return;
}

function startGame(c) {
    canvas = c;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext('2d');

    window.requestAnimationFrame(loop);
    paused = false;
    return;
}

function togglePause() {
    paused = !paused;
    if (!paused) {
        window.requestAnimationFrame(loop);
    }
    return;
}

export { startGame, togglePause };