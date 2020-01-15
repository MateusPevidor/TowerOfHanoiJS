document.addEventListener('DOMContentLoaded', start);

let canvas;
let c;

let poles = new Array();
let diskCount = 5;
let selected = -1;

let timeRunning = false;
let startTime = 0;

let keys = 0;
let moves = 0;
let target = Math.pow(2, diskCount) - 1;
let time = 0;
let recordTime = '0.000';
let kps = 0;

let finish = false;
let blind = false;


function start() {
  canvas = document.querySelector('canvas');
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;
  canvas.addEventListener('touchstart', handleTouch);
  c = canvas.getContext('2d');

  setup();

  draw();
}

function setup() {
  for (let i = 0; i < 3; i++)
    poles.push(new Pole());

  for (let i = diskCount - 1; i >= 0; i--)
    poles[0].disks.push(new Disk(i));

  loadScore();
}

function draw() {
  requestAnimationFrame(draw);

  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;

  c.clearRect(0, 0, canvas.width, canvas.height);

  poles.forEach(pole => {
    pole.draw();
  });

  if (selected != -1)
    drawArrow();
  
  if (timeRunning) {
    time = new Date().getTime() - startTime;
  }
  updateGUI();
}

function drawArrow() {
  let height = 40;
  c.fillStyle = '#8be9fd';
  c.beginPath();
  c.moveTo(poles[selected].x - 20, height);
  c.lineTo(poles[selected].x + 20, height);
  c.lineTo(poles[selected].x, height + 40);
  c.closePath();
  c.fill();
}

function reset() {
  poles = new Array();
  selected = -1;
  poleCount = 0;
  timeRunning = false;
  moves = 0;
  finish = false;
  time = 0;
  keys = 0;
  setup();
}

function handleInput(key) {
  if (key == 71 || key == 72 || key == 74) keys++;
  if (selected == -1) {
    switch(key) {
      case 71:
        return selected = 0;
      case 72:
        return selected = 1;
      case 74:
        return selected = 2;
    }
  } else {
    switch(key) {
      case 71:
        if (selected == 0) break;
        if (poles[selected].getUpper() < poles[0].getUpper()) {
          poles[0].disks.push(poles[selected].disks.pop());
          moves++;
        }
        break;
      case 72:
        if (selected == 1) break;
        if (poles[selected].getUpper() < poles[1].getUpper()) {
          poles[1].disks.push(poles[selected].disks.pop());
          moves++;
        }
        break;
      case 74:
        if (selected == 2) break;
        if (poles[selected].getUpper() < poles[2].getUpper()) {
          poles[2].disks.push(poles[selected].disks.pop());
          moves++;
        }
        break;
    }
    selected = -1;
  }
  if (poles[2].disks.length == diskCount) {
    timeRunning = false;
    finish = true;
    saveScore();
  }
}

function updateGUI() {
  let t = time / 1000;
  kps = (t == 0) ? 0 : keys / t;
  document.getElementById('timer').innerHTML = `Time: ${t.toFixed(3)}`;
  document.getElementById('record').innerHTML = `Record: ${recordTime}`;
  document.getElementById('moves').innerHTML = `Moves: ${moves}`;
  document.getElementById('target').innerHTML = `Target: ${target}`;
  document.getElementById('kps').innerHTML = `KPS: ${kps.toFixed(3)}`;
}

function saveScore() {
  let score = document.getElementById('timer').innerHTML;
  score = score.substr(6, score.length - 6);
  if (localStorage.getItem(`score${diskCount}`) == null)
    localStorage.setItem(`score${diskCount}`, score);
  else if (parseFloat(localStorage.getItem(`score${diskCount}`)) > score)
    localStorage.setItem(`score${diskCount}`, score);
  loadScore();
}

function loadScore() {
  let record = localStorage.getItem(`score${diskCount}`);
  if (record == null) recordTime = '---';
  else recordTime = record;
}

function handleTouch(e) {
  let xPos = e.touches[0].screenX * 3.33;
  let pos = (xPos - (window.innerWidth - canvas.width) / 2) / (canvas.width / 3);
  if (pos < 1) handleInput(71);
  else if (pos < 2) handleInput(72);
  else handleInput(74);
}

document.addEventListener('keydown', e => {
  if (e.keyCode == 68) return reset();
  if (finish) return;
  if (e.keyCode == 71 || e.keyCode == 72 || e.keyCode == 74) {
    if (!timeRunning) {
      timeRunning = true;
      startTime = new Date().getTime();
    }
    return handleInput(e.keyCode);
  }
  if (e.keyCode == 38) {
    loadScore();
    diskCount++;
    target = Math.pow(2, diskCount) - 1;
    return reset();
  } else if (e.keyCode == 40) {
    if (diskCount != 1) {
      diskCount--;
      loadScore();
      target = Math.pow(2, diskCount) - 1;
    }
    return reset();
  }
});