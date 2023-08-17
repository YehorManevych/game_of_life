const CELL_SIZE = 10;
const W = 80;
const H = 80;

let rate = 0.1

let rBuffer = [];
let wBuffer = [];


function setup() {
  let c = createCanvas(W * CELL_SIZE, H * CELL_SIZE);
  c.parent("canvas")
  
  let rateSlider = document.getElementById("rate")
  rateSlider.oninput = rateChanged
  rateSlider.value = rate

  rBuffer = [];
  wBuffer = [];

  for (let i = 0; i < W; i++) {
    rBuffer[i] = [];
    wBuffer[i] = [];
    for (let j = 0; j < H; j++) {
      rBuffer[i][j] = Math.random() < 0.5;
    }
  }
}

function getCell(x, y) {
  let direction = createVector(1, 0);
  let me = rBuffer[x][y];
  let neighbours =0
  let pos = createVector(x - 1, y - 1);
  for (let dir = 0; dir < 4; dir++) {
    for (let step = 0; step < 2; step++) {
      if(rBuffer[pos.x] && rBuffer[pos.x][pos.y]){
        neighbours++
      }
      pos.add(direction);
    }
    direction.rotate(HALF_PI);
  }
  if (me && neighbours != 2 && neighbours != 3) {
    return false;
  } else if (!me && neighbours == 3) {
    return true;
  } else{
    return me
  }
}

function updateWorld() {
  for (let i = 0; i < W; i++) {
    for (let j = 0; j < H; j++) {
      wBuffer[i][j] = getCell(i, j);
    }
  }
}

function drawCell(i, j){
      let x = i * CELL_SIZE;
      let y = j * CELL_SIZE;
      rect(x, y, CELL_SIZE, CELL_SIZE);
}

function drawWorld() {
  background(100);
  noStroke();
  for (let i = 0; i < W; i++) {
    for (let j = 0; j < H; j++) {
      if (rBuffer[i][j]) {
        fill("black");
      } else {
        fill("white");
      }
      drawCell(i,j)
    }
  }
}

function step(){
  drawWorld();
  
  updateWorld();

  let temp = rBuffer
  rBuffer = wBuffer
  wBuffer = temp
}

function draw() {
  if(frameCount % round(1/rate) == 0){
    step()
  }
}

function keyPressed(){
  step()
}

function rateChanged(){
  rate = round(document.getElementById("rate").value, 1)
}