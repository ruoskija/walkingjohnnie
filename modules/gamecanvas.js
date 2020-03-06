function createEmptyDrawingState(width, height) {
    let state = [];
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            row.push('');
        }
        state.push(row);
    }
    return state;
}

function findDifferences(olderState, newerState) {
    let differences = [];
    let rows = olderState.length;
    if (rows === 0) {
        console.log('Empty olderState');
        return [];
    }
    let cols = olderState[0].length;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const oldColor = olderState[row][col];
            const newColor = newerState[row][col];
            if (oldColor !== newColor) {
                differences.push(
                    {
                        x: col,
                        y: row,
                        color: newColor,
                    }
                );
            } else {
                // nop
            }
        }
    }
    return differences;
}

class GameCanvas {
    /**
    * Creates a canvas element to the div 'gamecanvasdiv'.
    * @param {number} width width of the canvas element
    * @param {number} height height of the canvas element
    * @param {number} drawnSquareSize size of the squares drawn to the canvas (in pixels)  
    */
    constructor(width=640, height=400, drawnSquareSize=2) {
        this.width   = width;
        this.height  = height;
        this.boxSize = drawnSquareSize;

        this.canvas        = document.createElement('canvas');
        this.canvas.width  = width  * drawnSquareSize;
        this.canvas.height = height * drawnSquareSize;
        this.canvas.id     = 'game';
        document.getElementById('gamecanvasdiv').appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');

        this.drawingState = createEmptyDrawingState(width,height);
        this.nextDrawingState = createEmptyDrawingState(width,height);
    }

    /** Clears the canvas completely */
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addToNextDrawing(x, y, color) {
        const row = y;
        const col = x;
        if (row >= 0 && col >= 0 && row < this.height && col < this.width) {
            this.nextDrawingState[row][col] = color;
        }
    }

    update() {
        const boxSize = this.boxSize;
        const differences = findDifferences(this.drawingState, this.nextDrawingState);
        differences.forEach(diff => {
            if (diff.color !== '') {
                this.context.fillStyle = diff.color;
                this.context.fillRect(diff.x * boxSize, diff.y * boxSize, boxSize, boxSize);
                this.drawingState[diff.y][diff.x] = diff.color;
            }
        });
        //const tmp = this.nextDrawingState.slice();
        //this.drawingState = tmp;
    }
}

export { GameCanvas };