var sprites = [];

function Sprite(imgObject, name){
  this.img = imgObject;
  this.name = name;

  sprites.push(this);
}

function findSprite(name){
  let n = name;
  for (let i = 0; i < sprites.length; i++){
    if (n == sprites[i].name){
      return sprites[i];
    }
  }
}