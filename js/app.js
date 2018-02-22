// Gameboard Square for player/enemies/prizes to stand on
class Square {
    constructor(x = 0, y = 0, row = 0, col = 0, status = 'open', texture = 'grass') {
        this.x = x;
        this.y = y;
        // Status Options: open, prize, enemy, player, finish, barrier        
        this.status = status;
        this.texture = texture;
        this.row = row;
        this.col = col;
        this.sprite = `images/block-${texture}.png`;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Character {
    constructor(character = 'ram', x = 0, y = 0, row = 0, col = 0, ) {
        this.character = character;
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Enemy extends Character {
    constructor(character = 'ram', row = 0, col = 0, direction = 'r', speed = 1) {
        super(character, x, y, row, col)
        this.direction = direction;
        this.speed = speed;
        this.sprite = `images/${character}-${direction}.png`;

    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        if (this.direction === 'r') {
            this.x += this.speed * 2;
            this.y += this.speed * 1;
        } else {
            this.x -= this.speed * 2;
            this.y -= this.speed * 1;
        }

        // if (this.x < 0 || this.x > 700 || this.y < 0 || this.y > 450) {
        //     this.teleport(direction);
        // }
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }
};

class Player extends Character {
    constructor(character = 'dog', x = 0, y = 400, row = 7, col = 4) {
        super(character, x, y, row, col)
        this.sprite = `images/${character}-r.png`;
        this.xMovement = 0;
        this.yMovement = 0;
    }

    update(dt) {
    }

    moveToSquare(newSquare) {
        this.x = newSquare.x;
        this.y = newSquare.y;
        this.row = newSquare.row;
        this.col = newSquare.col;
    }

    handleInput(input) {
        if (['up', 'down', 'left', 'right'].includes(input)) {
            let rowChange = 0, colChange = 0;
            switch (input) {
                case 'up':
                    rowChange = -1;
                    break;
                case 'down':
                    rowChange = +1;
                    break;
                case 'left':
                    colChange = -1;
                    break;
                case 'right':
                    colChange = +1;
                    break;
            }
            this.sprite = `images/${this.character}-${input[0]}.png`;
            let newSquare = findSquareByRowCol((this.row + rowChange), (this.col + colChange));
            if (newSquare) {
                switch (newSquare.status) {
                    case 'open':
                        this.moveToSquare(newSquare);
                        break;
                    case 'enemy':
                        break;
                    case 'prize':
                        // find the special listed at this square, consume it
                        this.moveToSquare(newSquare);
                        allPrizes.find(element => element.col == this.col && element.row == this.row ).consume();
                        break;
                    case 'finish':
                        moveToSquare(newSquare);
                        break;
                }
            }
        }
    }
};


class Prize extends Character {
    constructor(character = 'hotdog', points = 100, row = 3, col = 4) {
        super(character, x, y, row, col);
        let square = findSquareByRowCol(row, col);
        square.status = 'prize';
        this.x = square.x;
        this.y = square.y;
        this.character = character;
        this.points = points; // Value for collecting 
        this.sprite = `images/${character}.png`;
        this.width = 200;
        this.height = 200;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
    }
    consume() {
        this.width = 0;
        this.height = 0;
        findSquareByRowCol(this.row, this.col).status = 'open';
        score.addPoints(this.points);
    }
};

let score = {
    score: 0,
    lives: 3,
    addPoints: function (points) {
        this.score += points;
        console.log("Score:" + this.score)
    },
    loseLife: function () {
        this.lives -= 1;
        if (this.lives === 0) {
            console.log("Game Over!")
        } else {
            console.log(`You have ${this.lives} lives left.`)
        }
    }
}

let allSquares = [];
let positionIterator = squarePositions.entries();
for (let [rowIndex, row] of positionIterator) {
    let rowIterator = row.entries()
    for (let [colIndex, coord] of rowIterator) {
        if (coord[0] !== false) {
            allSquares.push(new Square(x = coord[0], y = coord[1], row = rowIndex, col = colIndex));
        }
    }
};

allSquares[0].texture = 'slate';
let allEnemies = [];
allEnemies.push(new Enemy(character = 'ram', x = 700, y = 250, direction = 'l', speed = 1.2));
allEnemies.push(new Enemy(character = 'ram', x = 0, y = 0, direction = 'r', speed = 1));
allEnemies.push(new Enemy(character = 'sloth', x = 700, y = 450, direction = 'l', speed = .2));
let allPrizes = [];
allPrizes.push(new Prize('hotdog', 100, 5, 4));
allPrizes.push(new Prize());
let player = new Player();


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        'ArrowLeft': 'left',
        'ArrowUp': 'up',
        'ArrowRight': 'right',
        'ArrowDown': 'down',
        'KeyW': 'up',
        'KeyA': 'left',
        'KeyS': 'down',
        'KeyD': 'right',
    };

    player.handleInput(allowedKeys[e.code]);
});

function findSquareByRowCol(row, col) {
    return allSquares.find(function (element) { return element.col == col && element.row == row });
};

// TODO: Figure out how to move enemies from square to square

// TODO: Make collision detection:
    // If Player is on a square:
     // get that square and change its status to 'player'
    // If Player is going to move to a square, 

// TODO: Change Board Positions to take in more info per row:
    // Texture - a png file
    // special - If it spawns enemies, if it could spawn barriers, if it's the start or the finish.
    // row 


// TODO: Make Depth Sorting 