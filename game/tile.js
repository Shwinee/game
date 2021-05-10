var tiles = [];

function makeWorld(){
  tiles = [];
  machines = [];

  for (let i = 0; i < 22; i++){
    for (let y = 100; y > 9; y--){
      if (y > 68){
        if (rng(68, 100) <= y){
          new Tile('iron', 10, i, y, new Debris('iron', rng(20, 50)));
        }else if (rng(0, 100) <= 90){
          new Tile('copper', 10, i, y, new Debris('copper', rng(20, 50)));
        }else{
          new Tile('rock', 10, i, y, new Debris('hard rock', rng(y, y+10)));
        }
      }else{
        if (y > 32){
          if (rng(22, 58) <= y){
            new Tile('copper', 10, i, y, new Debris('copper', rng(20, 50)));
          }else{
            new Tile('rock', 10, i, y, new Debris('hard rock', rng(y, y+10)));
            //copper
          }
        }else{
          if (rng(13, 22) <= y){
            new Tile('rock', 10, i, y, new Debris('hard rock', rng(y, y+10)));
          }else {
            new Tile('dirt', 10, i, y, new Debris('soft dirt', rng(20, 50)));
          }
        }
      }
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
  tiles.push(this);
}


function TileManager(){
  this.render = function(){
    for (let i = 0; i < tiles.length; i++){
      if (Math.abs(tiles[i].y - (-cam.y+height/2)) <= 300){
        let imgg;

        if (tiles[i].name == 'dirt'){
          imgg = findSprite('dirt');
        }else if (tiles[i].name == 'rock'){
          imgg = findSprite('rock');
        }else if (tiles[i].name == 'copper'){
          imgg = findSprite('copper');
        }else if (tiles[i].name == 'iron'){
          imgg = findSprite('iron');
        }
        stroke(0, 0, 0, 100);
        if (imgg){
          image(imgg.img, tiles[i].x, tiles[i].y, 17, 17);
        }else{
          rect(tiles[i].x, tiles[i].y, 17, 17);
        }
        if (collidePointRect(mouseX, mouseY-cam.y, tiles[i].x, tiles[i].y, 17, 17)  && toolm.building == false){
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
          if (tiles[i].name == 'rock'){
            dta.rock+=tiles[i].debris.amount;
          }else if (tiles[i].name == 'dirt'){
            dta.dirt+=tiles[i].debris.amount;
          }else if (tiles[i].name == 'copper'){
            dta.copper+=tiles[i].debris.amount;
          }else if (tiles[i].name == 'iron'){
            dta.iron+=tiles[i].debris.amount;
          }
          tiles.splice(i, 1);
        }
      }
    }
  }
}
