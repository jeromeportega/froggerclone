// Enemies our player must avoid
var Enemy = function(yStart) {
    this.x = -20;
    this.y = yStart;
    this.speed = Math.floor(Math.random() * (400 - 200)) + 200;

    this.sprite = 'images/enemy-bug.png';
};

// Assigns a random speed and y position given certain bounds.  Then, if the enemy reaches the edge of the canvas, resets the speed and y of the enemy.
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);
    this.resetEnemy();
    this.checkCollision();
};

//Reassigns all the positional and speed attributes of the current enemy once it goes off screen.
Enemy.prototype.resetEnemy = function() {
    if (this.x > 600) {
        this.x = -20;
        this.y = Math.floor(Math.random() * (4 - 1)) + 1;
        this.speed = Math.floor(Math.random() * (350 - 150)) + 150;

        if (this.y == 1) this.y = 50;
        else if (this.y == 2) this.y = 130;
        else this.y = 210;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This runs the player method to check collision and sends the location of the enemy
Enemy.prototype.checkCollision = function() {
    player.checkCollision(this.x, this.y);
}

// All player methods and attributes in player declaration
var Player = function() {
    this.sprite = 'images/char-boy.png';
    // x Coordinate initial set and boundaries
    this.x = 205;
    this.xMax = 405;
    this.xMin = 5;

    // y Coordinate initial set and boundaries
    this.y = 370;
    this.yMax = 370;

    // Update Function that runs every frame
    this.update = function() {
        // Checking to see if player has gone into the water.  If they have, resets the player position.
        if (this.y < 50) {
            this.x = 205;
            this.y = 370;
        }
    }

    // Render function runs every frame
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // This function handles all keyboard inputs by the player
    this.handleInput = function(e) {
        switch (e) {
            case 'up':
                this.y -= 80;
                break;
            case 'down':
                if(this.y < this.yMax) this.y += 80;
                break;
            case 'right':
                if(this.x < this.xMax) this.x += 100;
                break;
            case 'left':
                if(this.x > this.xMin) this.x -= 100;
                break;
            default:
                break;
        }
    }

    // This method checks to see if the player is within acceptable collision range of the enemy, and then resets the game if the player and the enemy are currently colliding.
    this.checkCollision = function(enemyX, enemyY) {
        if ((Math.abs(this.x - enemyX) > 0) && (Math.abs(this.x - enemyX) < 20) && (this.y == enemyY)) {
            this.x = 205;
            this.y = 370;
        }
    }
}

// Declarations of all enemies and player objects
var bugOne = new Enemy(50);
var bugTwo = new Enemy(130);
var bugThree = new Enemy(210);
var player = new Player();
var allEnemies = [bugOne, bugTwo, bugThree];

// This listens for key presses and sends the keys to the
// Player.handleInput() method. No modifications necessary.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
