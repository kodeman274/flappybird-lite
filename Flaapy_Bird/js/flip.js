var head = new Image();
head.src = 'Flaapy_Bird/image/nik.png';
var back = new Image();
back.src = 'Flaapy_Bird/image/backrev.png';
var up = new Image();
up.src = 'Flaapy_Bird/image/up.png';
var down = new Image();
down.src = 'Flaapy_Bird/image/down.png';
var land = new Image();
land.src = 'Flaapy_Bird/image/land.png';
var start = new Image();
start.src = 'Flaapy_Bird/image/ready.png';
var over = new Image();
over.src = 'Flaapy_Bird/image/over.png';
var score = new Image();
score.src = 'Flaapy_Bird/image/score.png';

var ras = 150;
var gameE = 'stop';
var bs = 0;
var s = 0;
var bord = document.getElementById('canvas');
var ctx = bord.getContext('2d');
ctx.font = '30px Ariel';
var pipe = [];
const C = 160;
var test = 'un';
function game() {
  ras = 150;
  gameE = 'stop';
  s = 0;
  bord = document.getElementById('canvas');
  ctx = bord.getContext('2d');
  ctx.font = '30px Ariel';
  pipe = [];
  test = 'un';
  ctx.drawImage(back, -5, 0, 290, 520);
  ctx.drawImage(land, -5, 450, 290, 150);
  ctx.drawImage(head, 100, 150, 50, 50);
  ctx.drawImage(start, 40, 300, 200, 150);

  let z = Math.floor(Math.random() * 300);
  pipe[0] = {
    x: bord.width,
    y: 0,
    he: z,
  };
  z = Math.floor(Math.random() * 300);
  pipe[1] = {
    x: bord.width + 150,
    y: 0,
    he: z,
  };
  z = Math.floor(Math.random() * 300);
  pipe[2] = {
    x: bord.width + 300,
    y: 0,
    he: z,
  };
  z = Math.floor(Math.random() * 300);
  pipe[3] = {
    x: bord.width + 450,
    y: 0,
    he: z,
  };
  function draw() {
    if (gameE == 'play') {
      ctx.drawImage(back, -5, 0, 290, 525);
      ctx.drawImage(head, 100, ras, 50, 50);

      ctx.drawImage(land, -5, 450, 290, 150);
      for (let i = 0; i < pipe.length; i++) {
        if (pipe[i].x > -50) {
          ctx.drawImage(down, pipe[i].x, pipe[i].y, 50, pipe[i].he);
          ctx.drawImage(up, pipe[i].x, pipe[i].he + C, 50, 500);
          pipe[i].x--;
          if ((pipe[i].x < 150) & (pipe[i].x > 50)) {
            test = i;
          }
        } else {
          if (s == 0) {
            s += 2;
          } else {
            s += 1;
          }
          pipe[i].x = bord.width + 250;
          pipe[i].he = Math.floor(Math.random() * 300);
        }
      }
      ras += 2;
      ctx.drawImage(head, 100, ras, 50, 50);
      ctx.fillText('score:' + s, 100, 50);
    }
    if ((ras > 460) | (ras <= 0)) {
      gameE = 'Lost';
    }
    if (test != 'un') {
      if ((ras > pipe[test].he + C - 50) | (ras < pipe[test].he)) {
        gameE = 'lost';
        if (s > bs) {
          bs = s;
        }
        ctx.drawImage(score, 30, 100, 220, 220);
        ctx.fillText(s, 200, 200);
        ctx.fillText(bs, 200, 300);
        ctx.drawImage(over, 20, 350, 250, 200);
      }
    }
    test = 'un';
    if (gameE != 'lost') {
      requestAnimationFrame(draw);
    } else {
      document.getElementById('start').disabled = false;

      cancelAnimationFrame(draw);
    }
  }
  draw();
}

window.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.code == 'Space' || e.code == 'ArrowUp' || e.code == 'Enter') {
    if (gameE == 'stop') {
      gameE = 'play';
    } else {
      ras -= 70;
    }
  }
});

window.addEventListener('touchend', function () {
  if (gameE == 'stop') {
    gameE = 'play';
  } else {
    ras -= 70;
  }
});

document.getElementById('start').addEventListener('click', function () {
  document.getElementById('start').innerHTML = 'Replay';
  document.getElementById('start').disabled = true;
  game();
});
