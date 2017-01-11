var canvas;
var yuuri;

var trails = [];

var lastUpdate = Date.now();

window.onresize = function () {
    canvas.size(window.innerWidth - 100, window.innerHeight - 100)
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        yuuri.setHorizontalState(1);
    } else if (keyCode == LEFT_ARROW) {
        yuuri.setHorizontalState(-1);
    }

    if (keyCode == UP_ARROW) {
        yuuri.setVerticalState(-1);
    } else if (keyCode == DOWN_ARROW) {
        yuuri.setVerticalState(1);
    }

    if (keyCode == SHIFT) {
        yuuri.setSprintState(true);
    }
}

function keyReleased() {
    if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
        if (keyIsDown(LEFT_ARROW)) {
            yuuri.setHorizontalState(-1);
        } else if (keyIsDown(RIGHT_ARROW)) {
            yuuri.setHorizontalState(1);
        } else {
            yuuri.setHorizontalState(0);
        }
    }

    if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
        if (keyIsDown(DOWN_ARROW)) {
            yuuri.setVerticalState(1);
        } else if (keyIsDown(UP_ARROW)) {
            yuuri.setVerticalState(-1);
        } else {
            yuuri.setVerticalState(0);
        }
    }

    if (keyCode == SHIFT) {
        yuuri.setSprintState(false);
    }
}

function setup() {
    canvas = createCanvas(window.innerWidth - 100, window.innerHeight - 100);
    yuuri = new Skater(color(255, 0, 0));
}


function drawTrails() {
    for (var key in trails) {
        if (!trails.hasOwnProperty(key)) continue;

        var i = trails[key];
        if (i.length > 1) {
            for (var j = 1; j < i.length; j++) {
                push();
                strokeWeight(4);
                stroke(100);
                line(i[j - 1].x, i[j - 1].y, i[j].x, i[j].y);
                pop();
            }
        }
    }

    // Draw temporary trail directly out from skater to make look smoother.
    push();
    strokeWeight(4);
    stroke(100);
    line(yuuri.getTrailStart().x, yuuri.getTrailStart().y, yuuri.getX(), yuuri.getY());
    pop();
}

function drawSkater() {
    push();
    translate(yuuri.getX(), yuuri.getY());
    rotate(Math.atan2(yuuri.getYVeloctiy(), yuuri.getXVelocity()) + (Math.PI / 2));
    fill(yuuri.getColor());
    noStroke();
    triangle(yuuri.getBottomLeft()[0], yuuri.getBottomLeft()[1], yuuri.getTop()[0], yuuri.getTop()[1], yuuri.getBottomRight()[0], yuuri.getBottomRight()[1]);
    pop();
}

function draw() {
    background(color(165, 242, 243));

    var now = Date.now();
    var dt = (now - lastUpdate) / 1000;
    lastUpdate = now;
    yuuri.update(dt);

    drawTrails();

    drawSkater();
}