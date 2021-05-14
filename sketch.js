let tm = new TileManager();
var ta = new TextArea('text');
var dta = new TextDebris('debris');
var toolm = new ToolManager();
var player;

function setup() {
  createCanvas(400, 500);
  stroke(0, 0, 0, 100);
  makeWorld();
  player = new Player(9000, (height/2)-200);
  loadChunk();
}

function preload(){
  new Sprite(loadImage('https://raw.githubusercontent.com/Shwinee/game/master/game/sprites/copper.png'), 'copper');
  new Sprite(loadImage('https://raw.githubusercontent.com/Shwinee/game/master/game/sprites/dirt.png'), 'dirt');
  new Sprite(loadImage('https://raw.githubusercontent.com/Shwinee/game/master/game/sprites/iron.png'), 'iron');
  new Sprite(loadImage('https://raw.githubusercontent.com/Shwinee/game/master/game/sprites/rock.png'), 'rock');
}

var cam = {
  x: 1,
  y: 1,
}

let surface = false;

function draw(){
  loadChunk();

  cam.x = (width/2) - player.pos.x;
  cam.y = (height/2) - player.pos.y + 60;
  if (player.pos.y < 400){
    background(53, 81, 92);
  }else{
    background(0, 0, 0);
  }
  translate(cam.x, cam.y);

  tm.render(surface);
  mm.render();
  dta.update();
  if (mouseIsPressed && toolm.building == false){
    toolm.click();
  }
  if (toolm.building == true){
    toolm.buildingAnimation();
  }
  fill(255, 0, 0);

  player.render();
  player.update();
  player.input();
  player.collide();
  if (player.grounded == false){
    player.addForce(createVector(0, 0.6));
  }
}

function mouseClicked() {
  toolm.click();
}
