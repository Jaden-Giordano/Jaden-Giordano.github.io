var renderer = PIXI.autoDetectRenderer(document.body.clientWidth, document.body.clientHeight);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

window.onresize = function () {
    renderer.resize(document.body.clientWidth, document.body.clientHeight);
}

var FULL_TONES = ['sounds/a.mp3', 'sounds/b.mp3', 'sounds/c.mp3', 'sounds/d.mp3', 'sounds/e.mp3', 'sounds/f.mp3', 'sounds/g.mp3'];
var HALF_TONES = ['sounds/bflat.mp3', 'sounds/csharp.mp3', 'sounds/eflat.mp3', 'sounds/fsharp.mp3', 'sounds/gsharp.mp3'];
var keys = [];

for (var i = 0; i < 7; i++) {
    var key = {
        graphics: new PIXI.Graphics(),
        sound: new Howl({
            src: [FULL_TONES[i]]
        }),
        play: function (data) {
            sound.play();
        }
    }

    key.graphics.beginFill(0xFFFFFF);
    key.graphics.lineStyle(5, 0xFFFFFF, 1);
    key.graphics.drawRect((i * 80) + (i * 10), 0, 80, 350);
    key.graphics.endFill();

    key.graphics.interactive = true;

    key.graphics.hitArea = new PIXI.Rectangle((i * 80) + (i * 10), 0, 80, 350);
    key.graphics.click = key.play;

    stage.addChild(key.graphics);
}

animate();
function animate() {
    renderer.render(stage);
}
