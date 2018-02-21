// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor() {
        this.sprite = 'images/ram-r.png';
        this.x = 0;
        this.y = 0;
        this.speed = 1;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // this.x += this.speed * 2;
        // this.y += this.speed * 1;
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};

class Player {
    constructor() {
        this.sprite = 'images/dog-r.png';
        this.x = 0;
        this.y = 400;
        this.xMovement = 0;
        this.yMovement = 0;

    }
    update(dt) {

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


    }
    handleInput(input) {
        //make a switch for the 4 possible arrow keys
        switch (input) {
            case 'up':
                this.xMovement = 100;
                this.yMovement = -50;
                this.sprite = 'images/dog-u.png'
                break;
            case 'down':
                this.xMovement = -100;
                this.yMovement = 50;
                this.sprite = 'images/dog-d.png'
                
                break;
            case 'left':
                this.xMovement = -100;
                this.yMovement = -50;
                this.sprite = 'images/dog-l.png'
                
                break;
            case 'right':
                this.xMovement = 100;
                this.yMovement = 50;
                this.sprite = 'images/dog-r.png'
                break;
        }
        this.x += this.xMovement;
        this.y += this.yMovement;
    }
};

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for (i = 0; i < 4; i++) { allEnemies.push(new Enemy()); }
let player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    console.log(e);
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
