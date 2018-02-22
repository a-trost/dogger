// Enemies our player must avoid
class Character {
    constructor(character = 'ram', x = 0, y = 0, ) {
        this.character = character;
        this.x = x;
        this.y = y;
    }
    teleport(direction) {
        console.log("Teleport!");
        // if (this.x < 0)
        //if 0 > x > 700
        //if 0 > y > 450
    };
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Enemy extends Character {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(character = 'ram', x = 0, y = 0, direction = 'r', speed = 1) {
        super(character, x, y)
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

        if (this.x < 0 || this.x > 700 || this.y < 0 || this.y > 450) {
            this.teleport(direction);
        }
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }
    // Draw the enemy on the screen, required method for game


};

class Player extends Character {
    constructor(character = 'dog', x = 0, y = 400) {
        super(character, x, y)
        this.sprite = `images/${character}-r.png`;
        this.xMovement = 0;
        this.yMovement = 0;

    }
    update(dt) {

    }

    handleInput(input) {
        //make a switch for the 4 possible arrow keys
        switch (input) {
            case 'up':
                this.xMovement = 100;
                this.yMovement = -50;
                this.sprite = `images/${this.character}-u.png`;
                break;
            case 'down':
                this.xMovement = -100;
                this.yMovement = 50;
                this.sprite = `images/${this.character}-d.png`;

                break;
            case 'left':
                this.xMovement = -100;
                this.yMovement = -50;
                this.sprite = `images/${this.character}-l.png`;

                break;
            case 'right':
                this.xMovement = 100;
                this.yMovement = 50;
                this.sprite = `images/${this.character}-r.png`;
                break;
        }
        this.x += this.xMovement;
        this.y += this.yMovement;
    }
};

class Square { //Square for player/enemies/prizes to stand on
    constructor(x = 0, y = 0, row = 0, col = 0, status = 'open', texture = 'grass') {
        this.x = x;
        this.y = y;
        this.status = status;
        this.texture = texture;
        this.row = row;
        this.col = col;
        this.sprite = `images/block-${texture}.png`;

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Prize {
    constructor(x = 0, y = 0, character = 'hotdog', points = 100) {
        this.x = x;
        this.y = y;
        this.character = character;
        this.points = points;
        this.sprite = `images/${character}.png`
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.

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
console.log(allSquares);
let allEnemies = [];
allEnemies.push(new Enemy(character = 'ram', x = 700, y = 250, direction = 'l', speed = 1.2));
allEnemies.push(new Enemy(character = 'ram', x = 0, y = 0, direction = 'r', speed = 1));
allEnemies.push(new Enemy(character = 'sloth', x = 700, y = 450, direction = 'l', speed = .5));
let allPrizes = [];
allPrizes.push(new Prize());
let player = new Player();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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




// TODO: Make collision detection:
    // If Player is on a square:
     // get that square and change its status to 'player
    // If Player is going to move to a square, 