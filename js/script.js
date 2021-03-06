(function() {
  var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

  NUM_CONFETTI = 350;

  COLORS = [
    [255, 120, 174],
    [255, 0, 138],
    [255, 120, 220],
    [255, 179, 200]
  ];

  PI_2 = 2 * Math.PI;

  canvas = document.getElementById("world");

  context = canvas.getContext("2d");

  window.w = 0;

  window.h = 0;

  resizeWindow = function() {
    window.w = canvas.width = window.innerWidth;
    return window.h = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeWindow, false);

  window.onload = function() {
    return setTimeout(resizeWindow, 0);
  };

  range = function(a, b) {
    return (b - a) * Math.random() + a;
  };

  lerp = function(a, b, u) {
    u = u < 0 ? 0 : u;
    u = u > 1 ? 1 : u;
    return a + (b - a) * u;

  };

  drawCircle = function(x, y, r, style) {
    r = r * 2;
    context.beginPath();
    context.lineTo(x + (r / 2), y + (r / 1.5));
    context.lineTo(x + r, y);
    context.arc(x + (r / 1.4), y, r / 3.5, 0, Math.PI, true);
    context.arc(x + (r / 4), y, r / 3.5, 0, Math.PI, true);
    context.fillStyle = style;
    return context.fill();
  };

  var frameCount = 99;
  var colorChangeTime = 100;
  var currentColor = [1, 1, 1];
  var currentTargetColor;

  changeColor = function() {
    var r = ~~range(0, 4);
    currentTargetColor = COLORS[r];
  }

  drawText = function() {
    frameCount++;
    var text = "Happy Valentines Day, Dakota!!!";
    var size = 120;
    context.font = size + "px Allura";
    var fits = false;
    while (!fits) {
      fits = context.measureText(text).width <= canvas.width - (canvas.width / 8);
      if (!fits) {
        size -= 5;
        if (size <= 10) {
          fits = true;
        }
        context.font = size + "px Allura";
      }
    }
    if (frameCount >= colorChangeTime) {
      changeColor();
      frameCount = 0;
    }
    currentColor = [lerp(currentColor[0], currentTargetColor[0], .02), lerp(currentColor[1], currentTargetColor[1], .02), lerp(currentColor[2], currentTargetColor[2], .02)];
    context.fillStyle = "rgba(" + ~~currentColor[0] + ", " + ~~currentColor[1] + ", " + ~~currentColor[2] + ", 1)";
    context.textAlign = "center";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  xpos = 0.5;

  document.onmousemove = function(e) {
    return xpos = e.pageX / w;
  };

  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  Confetti = (function() {
    function Confetti() {
      this.style = COLORS[~~range(0, 4)];
      this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }

    Confetti.prototype.replace = function() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      return this.vy = 0.7 * this.r + range(-1, 1);
    };

    Confetti.prototype.draw = function() {
      var ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!((0 < (ref = this.x) && ref < this.xmax))) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
    };

    return Confetti;

  })();

  confetti = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      results.push(new Confetti);
    }
    return results;
  })();

  window.step = function() {
    var c, j, len, results;
    requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    results = [];
    for (j = 0, len = confetti.length; j < len; j++) {
      c = confetti[j];
      results.push(c.draw());
    }
    drawText();
    return results;
  };

  step();

}).call(this);
