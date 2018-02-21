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
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {

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
        this.sprite = 'images/char-boy.png';
    }
    update(dt) {

    }
    render() {

    }
    handleInput(input) {
    //make a switch for the 4 possible arrow keys
    }
};

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for( i=0; i <4; i++) {allEnemies.push(new Enemy());}
let player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
