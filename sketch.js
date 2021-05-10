let tm = new TileManager();
var ta = new TextArea('text');
var dta = new TextDebris('debris');
var toolm = new ToolManager();

function setup() {
  createCanvas(400, 500);
  stroke(0, 0, 0, 100);
  makeWorld();
}

var cam = {
  x: 1,
  y: 1,
}
function mouseWheel(event) {
  if (cam.y > -1){
    cam.y = -1;
  }else{
    cam.y += -event.delta;
  }
}

function draw(){
  background(255, 255, 255);
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
