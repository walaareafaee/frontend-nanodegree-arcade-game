
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 500) { 
        //make enemies appear from the left to right
        this.x = Math.floor(Math.random() * ((-150) - (-150) + 1) + -150); 
    }

};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    //not used 
};

Player.prototype.render = function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 500, 50);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x -= width;
    } else if (key == 'up') {
        this.y -= height;
    } else if (key == 'right') {
        this.x += width;
    } else if (key == 'down') {
        this.y += height;
    } 
};

function checkCollisions(){
    // check for collision between enemy and player
    allEnemies.forEach(function(enemy) {
      if ( player.x + 45 >= enemy.x && player.x - 45 <= enemy.x && player.y + 30 >= enemy.y && player.y - 30 <= enemy.y) {
          //reset player backe to start point    
          player.x = 200;
          player.y = 380;
      }
    });
    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (player.y + 45 <= height) {
        player.x = 200;
        player.y = 380;
        //player win
        $('#win').modal('show');
    }
    //keep player inside the canvas
    if (player.y > 400) {
        player.y = 400;
    } else if (player.x > 400) {
        player.x = 400;
    } else if (player.x < 1) {
        player.x = 1;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var width = 110,height = 80;
var enemiesPosition = [50, 140, 220];
var startPosition = enemiesPosition[Math.floor(Math.random() * enemiesPosition.length)]; 
// create set of enemies
for (var i = 0; i <= 5; i++) {
    startPosition = enemiesPosition[Math.floor(Math.random() * enemiesPosition.length)];
    enemy = new Enemy(
        Math.floor(Math.random() * ((-300) - (-150) + 1) + -150),
        startPosition,
        (Math.random() * (200 - 100) + 100) //generate enemies's varying speeds
    );
    allEnemies.push(enemy);
}

var player = new Player(200, 400, 50);
allEnemies.push(enemy);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
