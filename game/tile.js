var tiles = [];
var chunkWidth = 1;
var worldSize = 1000;
var render = 150;
var curChunk;

var cd = [];

var chunks = [];

function loadChunk(){
  tiles = [];
  let px = player.pos.x;
  
  for (let i = 0; i < chunks.length; i++){
    if (Math.abs(px - chunks[i].pos) <= render){
      let d = chunks[i].data.value.split(",");
      curChunk = chunks[i];

      for (let x = 0; x < d.length; x+=6){
        var name = d[x];
        var hardness = d[x+1];
        var debri = new Debris(d[x+2], d[x+3]);
        var posx = d[x+4];
        var posy = d[x+5];
        
        new Tile(name, hardness, posx/18, posy/18, debri);
      }
    }
  }
}

function Chunk(arr, pos){
  this.data = document.createElement("textarea");
  this.data.innerText = arr;
  this.pos = pos;
  this.id = chunks.length;
  
  chunks.push(this);
}

function makeWorld(){
  chunks = [];
  tiles = [];
  machines = [];
  
  let worldBlending = 100;
  
  for (let x = 0; x < chunkWidth * worldSize; x++){
    if (x % chunkWidth == 0){
      //make new chunk
      new Chunk(cd, x * 18);
      cd = [];
    }
    for (let y = 150; y > 9; y--){
      // I want to have diffrent tiles
      // Dependent on how deep it is
      
      // Also the amount of debris is
      // Dependent on how deep it is
      
      
      // Main tile on the left
      // Rare tile on the right
      
      
      if (y < 14){
        new Tile('dirt', 10, x, y, new Debris('dirt', rng(y, y+50)));
      }else if (y + rng(-worldBlending, worldBlending) < 40){ // Dirt / Rock       40 IS THE START OF THE TEXT LAYER
        let c = rng(y, y+100) // Chance of dirt
        if (c <= y+95){
          new Tile('dirt', 10, x, y, new Debris('dirt', rng(y, y+50)));
        }else{
          new Tile('rock', 10, x, y, new Debris('rock', rng(y, y+50)));
        }
      }else if (y + rng(-worldBlending, worldBlending) < 80){ // Rock / Copper       40 IS THE START OF THE TEXT LAYER
        let c = rng(y, y+100) // Chance of dirt
        if (c <= y+90){
          new Tile('rock', 10, x, y, new Debris('rock', rng(y, y+50)));
        }else{
          new Tile('copper', 10, x, y, new Debris('copper', rng(y, y+50)));
        }
      }else if (y + rng(-worldBlending, worldBlending) < 120){// Rock / Copper / Iron y
        let c = rng(y, y+100) // Chance of dirt
        if (c <= y+90){
          new Tile('rock', 10, x, y, new Debris('rock', rng(y, y+50)));
        }else if (c <= y+95){
          new Tile('copper', 10, x, y, new Debris('copper', rng(y, y+50)));
        }else{
          new Tile('iron', 10, x, y, new Debris('iron', rng(y, y+50)));
        }
      }else if (y + rng(-worldBlending, worldBlending) < 140){// Rock / Iron / Diamond y < 120
        let c = rng(y, y+100) // Chance of dirt
        if (c <= y+90){
          new Tile('rock', 10, x, y, new Debris('rock', rng(y, y+50)));
        }else if (c <= y+110){
          new Tile('diamond', 10, x, y, new Debris('diamond', rng(y, y+50)/100));
        }else{
          new Tile('iron', 10, x, y, new Debris('iron', rng(y, y+50)));
        }
      }else if (y + rng(-worldBlending, worldBlending) < 160){// Rock / Iron / Diamond y < 120
        let c = rng(y, y+100) // Chance of dirt
        if (c <= y+110){
          new Tile('amethyst', 10, x, y, new Debris('amethyst', rng(1, 4)));
        }else if (c <= y+110){
          new Tile('rock', 10, x, y, new Debris('rock', rng(y, y+50)));
        }else{
          new Tile('rock', 10, x, y, new Debris('rock', rng(y, y+50)));
        }
      }else{
        new Tile('rock', 10, x, y, new Debris('rock', rng(y, y+50)));
      }
      // Rock / Amethyst y < 200
      
      
      
      
     tiles = []; 
    }
  }
}


function Debris (name, amount){
  this.name = name;
  this.amount = Math.floor(amount);
}


function Tile(name, hardness, x, y, debris){
  this.name = name;
  this.hardness = hardness;

  this.debris = debris;

  this.x = x*18;
  this.y = y*18;

  this.id = tiles.length-1;
  cd.push(this.name, this.hardness, this.debris.name ,this.debris.amount, this.x, this.y);
  tiles.push(this);
}


function TileManager(){
  this.render = function(){
    for (let i = 0; i < tiles.length; i++){
      if (Math.abs(dist(player.pos.x, player.pos.y, tiles[i].x, tiles[i].y)) <= 140){
        let imgg;
        
        
        // Alpha dependent on how far away this is to the player (mouseX mouseY)
        let d = dist(player.pos.x, player.pos.y, tiles[i].x, tiles[i].y);
        a = map(d, 0, 140, 255, 10);
        
        if (tiles[i].name == 'dirt'){
          fill(155, 118, 83, a);
        }else if (tiles[i].name == 'rock'){
          fill(150, 150, 140, a);
        }else if (tiles[i].name == 'copper'){
          fill(184, 115, 51, a)
        }else if (tiles[i].name == 'iron'){
          fill(161, 157, 148, a);
        }else if (tiles[i].name == 'diamond'){
          fill(185, 242, 255, a);
        }else if (tiles[i].name == 'amethyst'){
          fill(153, 102, 204, a);
        }
        noStroke();
        if (imgg){
          image(imgg.img, tiles[i].x, tiles[i].y, 17, 17);
        }else{
          rect(tiles[i].x, tiles[i].y, 17, 17);
        }
        if (collidePointRect(mouseX-cam.x, mouseY-cam.y, tiles[i].x, tiles[i].y, 17, 17)  && toolm.building == false){
          let tile = tiles[i];


          //hilight the tile
          fill(255, 255, 255, 0);
          stroke(0, 0, 0);
          rect(tile.x, tile.y,17,17);
          stroke(0, 0, 0, 100);

          //make ta text
          if (toolm.openUI == false){
            let out = [];
            out[0] = "Name: "+tile.name+add2str('', 35-6+tile.name.length, ' ');
            out[1] = "Hardness: "+tile.hardness+add2str('', 35-6+tile.hardness.toString().length, ' ');
            out[2] = "Contains "+tile.debris.amount+" "+tile.debris.name;

            ta.changeTText(out.join(' '));
          }
        }
      }
    }
  }

  this.digTile = function(tile){
    if (toolm.building == false){
      for (let i = 0; i < tiles.length; i++){
        if (tiles[i] == tile){
          
          dta.add(tiles[i].debris.name, tiles[i].debris.amount)
          tiles.splice(i, 1);

          for (let c = 0; c < chunks.length; c++){
            
            if (Math.abs(player.pos.x - chunks[c].pos) <= render){
              
              let d = chunks[c].data.value.split(",");

              for (let x = 0; x < d.length; x+=6){
                
                var name = d[x];
                var hardness = d[x+1];
                var debri = new Debris(d[x+2], d[x+3]);
                var posx = d[x+4];
                var posy = d[x+5];

                if (posx == tile.x && posy == tile.y && name == tile.name && hardness == tile.hardness){
                  d.splice(x, 1);
                  d.splice(x+1, 1);
                  d.splice(x+2, 1);
                  d.splice(x+3, 1);
                  d.splice(x+4, 1);
                  d.splice(x+5, 1);
                  chunks[c].data.innerText = d;
                  return;
                }
              }
              
            }
          }
        }
      }
    }
  }
}