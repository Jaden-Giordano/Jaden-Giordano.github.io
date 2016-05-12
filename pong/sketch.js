class Paddle {

	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;

		this.width = w;
		this.height = h;

		this.speed = 200;

		this.color = {r:0,g:0,b:0};

		this.points = 0;
	}

	move(x, y) {
		this.x += x * this.speed * deltaTime;
		this.y += y * this.speed * deltaTime;
	}

	scored() {
		this.points++;
	}

}

class PlayerPaddle extends Paddle {

	constructor() {
		super(10, (720/2)-(50/2), 10, 50);

		this.up = false;
		this.down = false;
	}

	tick() {
		var m = 0;
		if (this.up) {
			m--;
		}
		if (this.down) {
			m++;
		}

		if (!(this.y+m < 0) && !((this.y+this.height+m) > 720))
			this.move(0, m);
	}

}

class MainPlayerPaddle extends PlayerPaddle {

	constructor() {
		super();
	}

}

class SecondPlayerPaddle extends PlayerPaddle {

	constructor() {
		super();
		this.x = (1280-10)-this.width;
	}

}

class Ball {

	constructor(speed) {
		this.x = (1280/2)-(9/2);
		this.y = (720/2)-(9/2);

		this.width = 9;
		this.height = 9;

		this.xvel = speed;
		this.yvel = speed;
	}

	hit(side) {
		if (side == 'vert') {
			this.yvel *= -1;
		}
		if (side == 'hor') {
			this.xvel *= -1;
		}
	}

	move() {
		this.x += this.xvel*deltaTime;
		this.y += this.yvel*deltaTime;
	}

	tick() {
		this.move();

		if (this.x+this.width > 1280) {
			//point to paddle1
			resetGame(1);
		}
		else if (this.x < 0) {
			//point to paddle2
			resetGame(2);
		}

		if (this.y < 0 || this.y+this.height > 720) {
			this.hit('vert');
		}
	}

	intersects(obj) {
		var inter = false;
		inter = (this.x > obj.x && this.x < obj.x+obj.width) && (this.y > obj.y && this.y < obj.y+obj.height);
		inter = (this.x+this.width > obj.x && this.x+this.width < obj.x+obj.width) && (this.y > obj.y && this.y < obj.y+obj.height);
		inter = (this.x > obj.x && this.x < obj.x+obj.width) && (this.y+this.height > obj.y && this.y+this.height < obj.y+obj.height);
		inter = (this.x+this.width > obj.x && this.x+this.width < obj.x+obj.width) && (this.y+this.height > obj.y && this.y+this.height < obj.y+obj.height);
		return inter;
	}
}

var paddle1;
var paddle2;

var ball;

var gamereset = false;

function setup() {
	createCanvas(1280, 720);

	paddle1 = new MainPlayerPaddle();
	paddle2 = new SecondPlayerPaddle();

	ball = new Ball(250);

	noStroke();
	textSize(32);
}

function keyPressed() {
	if (key === 'W') {
		paddle1.up = true;
	}
	if (key === 'S') {
		paddle1.down = true;
	}

	if (keyCode === UP_ARROW) {
		paddle2.up = true;
	}
	if (keyCode === DOWN_ARROW) {
		paddle2.down = true;
	}
}

function keyReleased() {
	if (key === 'W') {
		paddle1.up = false;
	}
	if (key === 'S') {
		paddle1.down = false;
	}

	if (keyCode === UP_ARROW) {
		paddle2.up = false;
	}
	if (keyCode === DOWN_ARROW) {
		paddle2.down = false;
	}
}

function resetGame(who) {
	if (who == 1) {
		paddle1.scored();
	}
	if (who == 2) {
		paddle2.scored();
	}
	ball.xvel = 0;
	ball.yvel = 0;
	ball.x = (1280/2)-(ball.width/2);
	ball.y = (720/2)-(ball.height/2);
	gamereset = true;
}

p5.prototype.deltaTime = 1;

var lastUpdate = Date.now();

var deltaTime;
                        
function updateDelta() {
    var now = Date.now();
    deltaTime = (now - lastUpdate)/1000;
    lastUpdate = now;
}

var resetdelay = 0;

function tick() {
	paddle1.tick();
	paddle2.tick();
	
	print(deltaTime)

	if (!gamereset) {
		ball.tick();
		if (ball.intersects(paddle1)) {
			ball.hit('hor');
			ball.x = paddle1.x+paddle1.width;
		}
		if (ball.intersects(paddle2)) {
			ball.hit('hor');
			ball.x = paddle2.x - ball.width;
		}
	}
	else {
		resetdelay += deltaTime

		if (resetdelay > 3) {
			gamereset = false;
			ball = null;
			ball = new Ball(250);
			resetdelay = 0;
		}
	}
}

function draw() {
	updateDelta();
	tick();

	background(0);

	rect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
	rect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

	rect(ball.x, ball.y, ball.width, ball.height);


	fill(255, 255, 255, 255)
	var score = paddle1.points+" : "+paddle2.points
	var tw = textWidth(score)
	var cw = textWidth(":");

	text(score, (1280/2)-(tw/2), 32);
}