// Defining the Enemy
var Enemy = function(x, y) {
	this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
};

// Update the Enemy
Enemy.prototype.update = function(dt) {
	if (this.x > 505) { // Canvas Width = 505
		this.x = this.speed - 505;
		this.y = randomYPos();
	}
	this.speed = this.x + 220 * dt;
	this.x = this.speed;
	this.checkCollisions();
};

// To get Arbitrary number with in the range and this function is the reference from stackoverflow.com
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

// Determining the Random Y positions
function randomYPos() {
	return Math.round(getRandomArbitrary(1, 3)) * player.playerYmove;
}

// To check the collisions with Enemy and player 
Enemy.prototype.checkCollisions = function() {
	if (this.y === player.y && checkX(player.x, this.x)) {
		alert('Collison!!');
		player.x = 200;
		player.y = 300;
	}
};

// Checking the collision of X - co-ordinates
function checkX(x1, x2) {
	if ((x2 > x1 - 49.5) && (x2 < x1 + 49.5)) {
		return true;
	} else {
		return false;
	}
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Defining the Player
var Player = function(x, y) {
	this.sprite = 'images/char-boy.png';
	this.x = x;
	this.y = y;
	this.playerXmove = 101;
	this.playerYmove = 75;
};

//Update the Player
Player.prototype.update = function() {
	this.x = this.x;
	this.y = this.y;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player inputs is defined
Player.prototype.handleInput = function(keys) {

	console.log('x=' + this.x, 'y=' + this.y);

	if (keys == 'left' && this.x > 0) {
		this.x -= this.playerXmove;
	} else if (keys == 'right' && this.x < 402) {
		this.x += this.playerXmove;
	} else if (keys == 'up') this.y -= this.playerYmove;

	else if (keys == 'down' && this.y < 375) {
		this.y += this.playerYmove;
	}

};

// Declaring the Player and the Enemy functions

var player = new Player(200, 300);

var allEnemies = [];

allEnemies[0] = new Enemy(getRandomArbitrary(0, 200), 60);
allEnemies[1] = new Enemy(getRandomArbitrary(0, 200), 150);
allEnemies[2] = new Enemy(getRandomArbitrary(0, 200), 230);

document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});