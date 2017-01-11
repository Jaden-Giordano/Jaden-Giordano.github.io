class Skater {

    constructor(color) {
        this.x = 100;
        this.y = this.x;
        this.size = 10;
        this.color = color;

        this.power = 60;
        this.sprintPower = 100;

        this.sprintState = false;

        this.horizontalState = 0;
        this.verticalState = 0;

        this.xVelocity = 0;
        this.yVelocity = 0;

        this.maxSpeed = 75;

        this.drag = 30;

        this.trailStart = { x: this.x, y: this.y };
        trails.push([]);
        this.trailIndex = trails.length - 1;
    }

    update(dt) {
        if (this.horizontalState == 1) {
            this.xVelocity += (this.sprintState) ? this.sprintPower : this.power * dt;
            if (this.xVelocity > this.maxSpeed) {
                this.xVelocity = this.maxSpeed;
            }
        } else if (this.horizontalState == -1) {
            this.xVelocity -= (this.sprintState) ? this.sprintPower : this.power * dt;
            if (this.xVelocity < -this.maxSpeed) {
                this.xVelocity = -this.maxSpeed;
            }
        }
        if (this.verticalState == -1) {
            this.yVelocity -= (this.sprintState) ? this.sprintPower : this.power * dt;
            if (this.yVelocity < -this.maxSpeed) {
                this.yVelocity = -this.maxSpeed;
            }
        } else if (this.verticalState == 1) {
            this.yVelocity += (this.sprintState) ? this.sprintPower : this.power * dt;
            if (this.yVelocity > this.maxSpeed) {
                this.yVelocity = this.maxSpeed;
            }
        }

        if (this.xVelocity > 0) {
            this.xVelocity -= this.drag * dt;
            if (this.xVelocity < 0) {
                this.xVelocity = 0;
            }
        } else if (this.xVelocity < 0) {
            this.xVelocity += this.drag * dt;
            if (this.xVelocity > 0) {
                this.xVelocity = 0;
            }
        }
        if (this.yVelocity > 0) {
            this.yVelocity -= this.drag * dt;
            if (this.yVelocity < 0) {
                this.yVelocity = 0;
            }
        } else if (this.yVelocity < 0) {
            this.yVelocity += this.drag * dt;
            if (this.yVelocity > 0) {
                this.yVelocity = 0;
            }
        }

        if (Math.abs(distance(this.x, this.y, this.trailStart.x, this.trailStart.y)) > 10) {
            trails[this.trailIndex].push({ x: this.x, y: this.y });
            this.trailStart = { x: this.x, y: this.y };
        }

        this.x += this.xVelocity * dt;
        this.y += this.yVelocity * dt;
    }

    getBottomLeft() {
        return [-this.size * Math.cos(Math.PI / 6), this.size * Math.sin(Math.PI / 6)];
    }

    getTop() {
        return [0, -this.size];
    }

    getBottomRight() {
        return [this.size * Math.cos(Math.PI / 6), this.size * Math.sin(Math.PI / 6)];
    }

    getColor() {
        return this.color;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setHorizontalState(state) {
        this.horizontalState = state;
    }

    setVerticalState(state) {
        this.verticalState = state;
    }

    getXVelocity() {
        return this.xVelocity;
    }

    getYVeloctiy() {
        return this.yVelocity;
    }

    setSprintState(state) {
        this.sprintState = state;
    }

    getTrailStart() {
        return this.trailStart;
    }

}