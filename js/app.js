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
    constructor(character = 'ram', row = 4, col = 4, direction = 'r', speed = 1) {
        super(character, x, y, row, col)
        let square = findSquareByRowCol(row, col);
        this.x = square.x;
        this.y = square.y;
        this.direction = direction;
        this.speed = speed;
        this.sprite = `images/${character}-${direction}.png`;

    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.moveEnemy(dt);
        this.checkPlayerCollision();
        this.checkEdgeCollision();
    }

    moveEnemy(dt) {
        if (this.direction === 'r') {
            this.x += this.speed * 2 * dt;
            this.y += this.speed * 1 * dt;
        } else if (this.direction === 'l') {
            this.x -= this.speed * 2 * dt;
            this.y -= this.speed * 1 * dt;
        };
    }

    checkEdgeCollision() {
        if ((this.x < edgeBorders[this.row][0]) || (this.x > edgeBorders[this.row][1])) {
            [this.x, this.y] = edgeStartingCoordinates[`${this.row}${this.direction}`]
        };
    }

    checkPlayerCollision() {
        if (
            (this.x + 65 >= player.x) &&
            (this.x <= player.x + 65) &&
            (this.row == player.row)
        ) {
            let playerLosingSquare = findSquareByRowCol(player.row, player.col);
            player.moveToSquare(findSquareByRowCol(7, 4));
            player.row = 7, player.col = 4;
            playerLosingSquare.status = 'open';
            //Add Game end functionality here
        };
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
            let oldSquare = findSquareByRowCol(this.row, this.col);
            let newSquare = findSquareByRowCol((this.row + rowChange), (this.col + colChange));
            if (newSquare) {
                switch (newSquare.status) {
                    case 'open':
                        this.moveToSquare(newSquare);
                        newSquare.status = 'player';
                        oldSquare.status = 'open';
                        break;
                    case 'prize':
                        // find the prize listed at this square, consume it
                        this.moveToSquare(newSquare);
                        allPrizes.find(element => element.col == this.col && element.row == this.row).consume();
                        newSquare.status = 'player';
                        oldSquare.status = 'open';
                        break;
                    case 'finish':
                        this.moveToSquare(newSquare);
                        newSquare.status = 'player';
                        oldSquare.status = 'open';
                        winLevel();
                        break;
                    case 'barrier':
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

class Barrier extends Character {
    constructor(character = 'hotdog', row = 3, col = 4) {
        super(character, x, y, row, col);
        let square = findSquareByRowCol(row, col);
        square.status = 'barrier';
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
}

let score = {
    score: 0,
    lives: 3,
    level: 1,
    addPoints: function (points) {
        this.score += points;
        document.getElementById('score').innerText = this.score;
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

let allEnemies = [], allSquares = [], allPrizes = [], allBarriers=[], player = {};

function createSquares() {
    let positionIterator = squarePositions.entries();
    for (let [rowIndex, row] of positionIterator) {
        let rowIterator = row.entries()
        for (let [colIndex, coord] of rowIterator) {
            if (coord[0] !== false) {
                let texture = levels[score.level]['rowTextures'][rowIndex];
                if (texture === 'finish') {
                    allSquares.push(new Square(x = coord[0], y = coord[1], row = rowIndex, col = colIndex, status = 'finish', texture = texture));
                } else {
                    allSquares.push(new Square(x = coord[0], y = coord[1], row = rowIndex, col = colIndex, status = 'open', texture = texture));
                }
            }
        }
    };
}

function createEnemies() {
    for (var enemy of levels[(score.level)].enemies) {
        allEnemies.push(new Enemy(character = enemy.character, row = enemy.row, col = enemy.col, direction = enemy.direction, speed = enemy.speed));
    };
}

function createPrizes() {
    for (var prize of levels[(score.level)].prizes) {
        allPrizes.push(new Prize(character = prize.character,points = prize.value, row = prize.row, col = prize.col, ));
    };
}

function createBarriers() {
    for (var barrier of levels[(score.level)].barriers) {
        allBarriers.push(new Barrier(character = barrier.character, row = barrier.row, col = barrier.col, points = barrier.points));
    };
}

function findSquareByRowCol(row, col) {
    return allSquares.find(function (element) { return element.col == col && element.row == row });
}

function allowedKeys(e) {
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
}

function startKeyboardListener() {
    document.addEventListener('keyup', allowedKeys);
}

function stopKeyboardListener() {
    document.removeEventListener('keyup', allowedKeys);
}

function winLevel() {
    score.level++;
    phraseHolder.style.display = 'flex'
    phraseHolder.innerHTML = '<span class="success-phrase">' + 'Level '+ score.level + '</span>';
    setTimeout(function () {
        phraseHolder.style.display = 'none'
    }, 4000);
    stopKeyboardListener();
    score.addPoints(1000);
    startLevel();
}

function startGame() {
    Engine(window);
    document.querySelector('#game-intro').style.display = 'none';
    document.querySelector('#score-panel').style.display = 'block';
    startLevel();
}

function startLevel() {
    startKeyboardListener();
    allEnemies = [], allSquares = [], allPrizes = [], allBarriers=[];
    createSquares();
    createEnemies();
    createPrizes();
    createBarriers();
    player = new Player('dog');
}
const phraseHolder = document.getElementById('phrase-holder')
document.getElementById("game-start-btn").addEventListener("click", startGame);


// TODO: Add more Square textures:
    // Home: Carpet, kitchen
    // City: Sidewalk
    // Moon: Moon texture
// TODO: Save progress to local machine
// TODO: Add world select buttons to start screen
