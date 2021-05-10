let tm = new TileManager();
var ta = new TextArea('text');
var dta = new TextDebris('debris');
var toolm = new ToolManager();

function setup() {
  createCanvas(400, 500);
  stroke(0, 0, 0, 100);
  makeWorld();
}

function preload(){
  new Sprite(loadImage('game/sprites/copper.png'), 'copper');
  new Sprite(loadImage('game/sprites/dirt.png'), 'dirt');
  new Sprite(loadImage('game/sprites/iron.png'), 'iron');
  new Sprite(loadImage('game/sprites/rock.png'), 'rock');
}

var cam = {
  x: 1,
  y: 1,
}
function mouseWheel(event) {
  if (cam.y > 50){
    cam.y = 50;
  }else{
    cam.y += -event.delta;
  }
}

function draw(){
  background('gray');
  translate(cam.x, cam.y);

  tm.render();
  mm.render();
  dta.update();
  if (mouseIsPressed && toolm.building == false){
    toolm.click();
  }
  if (toolm.building == true){
    toolm.buildingAnimation();
  }
  fill(255, 0, 0);
}

function mouseClicked() {
  toolm.click();
}
