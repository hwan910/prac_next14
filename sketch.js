x = 0;
y = 0;

let lastChangeTime = 0;
let changeInterval = 1000; // 컬러가 바뀌는 간격 (밀리초 단위)
let currentColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(150);
  currentColor = color(random(255), random(255), random(255));
}

function draw() {
  x = mouseX;
  y = mouseY;
  // fill(random(255), random(255), random(255));s

  strokeWeight(20);
  stroke(random(255), random(255), random(255));
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  if (millis(10) - lastChangeTime > changeInterval) {
    currentColor = fill(random(255), random(255), random(255));
    lastChangeTime = millis();
  }

  document.querySelector('#x').innerHTML = `X:${x}`;
  document.querySelector('#y').innerHTML = `Y:${y}`;
}

// function mousePressed() {
//   background(random(255), random(255), random(255));
// }
