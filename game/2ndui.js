function TextDebris(id){
  this.element = getEle(id);

  this.dirt = 0;
  this.rock = 0;
  this.copper = 0;
  this.iron = 0;

  this.take = function(item, amount){
    switch (item) {
      case 'dirt':
        if (this.dirt-amount >= 0){
          this.dirt -= amount;
        }else{
          return true;
        }
        break;
      case 'rock':
        if (this.rock-amount >= 0){
          this.rock -= amount;
        }else{
          return true;
        }
        break;
      case 'copper':
        if (this.copper-amount >= 0){
          this.copper -= amount;
        }else{
          return true;
        }
        break;
      case 'iron':
        if (this.iron-amount >= 0){
          this.iron -= amount;
        }else{
          return true;
        }
        break;
    }
  }
// +Math.floor(frameRate()).toString().length
  this.update = function(){
    this.element.innerText =
    ' Fps: '+Math.floor(frameRate())+add2str(' ', 10-6-Math.floor(frameRate()).toString().length, ' ')+
    '- debris -'+
    'Dirt: '+this.dirt+add2str(' ', 10-6+this.dirt.toString().length, ' ')+
    'Rock: '+this.rock+add2str(' ', 10-6+this.rock.toString().length, ' ')+
    "Copper: "+this.copper+add2str(' ', 10-8+this.copper.toString().length, ' ')+
    "Iron: "+this.iron+add2str(' ', 10-6+this.iron.toString().length, ' ');
  }
}
