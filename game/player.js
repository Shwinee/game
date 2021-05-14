function Player(x, y){
  this.pos = createVector(x, y);
  this.vel = createVector(0, 1);
  
  this.w = 17;
  this.h = 17;
  
  this.grounded = false;
  
  this.update = function(){
    this.vel.limit(10);
    this.pos.add(this.vel);
  }
  
  this.render = function(){
    fill(255, 255, 255);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
  
  this.addForce = function(force){
    this.vel.add(force);
  }
  
  this.collide = function(){
    if (this.pos.y < 0){
      this.grounded = false;
    }
    
    //only collide with tiles
    for (let i = 0; i < tiles.length; i++){
      let d = dist(this.pos.x, this.pos.y, tiles[i].x, tiles[i].y);
      
      if (d <= 25){
        //collision logic
        if (collideRectRect(this.pos.x, this.pos.y, this.w, this.h, tiles[i].x, tiles[i].y, 17, 17)){
          this.grounded = true;

          //collision response//    
          this.vel.mult(0.98);
          
          let tv = createVector(tiles[i].x, tiles[i].y);
          
          let vector_ = p5.Vector.sub(this.pos, tv);
        
          if (vector_.y * vector_.y > vector_.x * vector_.x){
            // y collision.
            if (vector_.y > 0){
              this.pos.y = tiles[i].y + 17 + 1;
              //down
            }else{
              this.pos.y = tiles[i].y - this.h;              
              //up
            }
          }else {
            if (vector_.x > 0){
              //left
              this.pos.x = tiles[i].x + 17;
            }else{
              //right
              this.pos.x = tiles[i].x - 17;
            }
          }
          
        }else{
          this.grounded = false;
        }
      }
    }
  }
  
  this.input = function(){
    if (keyIsDown(65)){
      player.addForce(createVector(-0.2, 0));
    }
    if (keyIsDown(68)){
      player.addForce(createVector(0.2, 0));
    }
  }
}