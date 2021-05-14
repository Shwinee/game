console.log('2nd ui');


function TextDebris(id){
  this.element = getEle(id);

  this.dirt = 0;
  this.rock = 0;
  this.copper = 0;
  this.iron = 0;
  this.diamond = 0;
  this.amethyst = 0;

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
      case 'diamond':
        if (this.diamond-amount >= 0){
          this.diamond -= amount;
        }else{
          return true;
        }
        break;
      case 'amethyst':
        if (this.amethyst-amount >= 0){
          this.amethyst -= amount;
        }else{
          return true;
        }
        break;
    }
  }
  this.add = function(item, amount){
    switch (item) {
      case 'dirt':
        this.dirt += amount;
        break;
      case 'rock':
        this.rock += amount;
        break;
      case 'copper':
        this.copper += amount;
        break;
      case 'iron':
          this.iron += amount;
        break;
      case 'diamond':
        this.diamond += amount;
        break;
      case 'amethyst':
        this.amethyst += amount;
        break;
    }
  }
  this.update = function(){
    this.element.innerText =
    ' Fps: '+Math.floor(frameRate())+add2str(' ', 10-6-Math.floor(frameRate()).toString().length, ' ')+
    '- debris -'+
    'Dirt: '+this.dirt+add2str(' ', 10-6+this.dirt.toString().length, ' ')+
    'Rock: '+this.rock+add2str(' ', 10-6+this.rock.toString().length, ' ')+
    "Copper: "+this.copper+add2str(' ', 10-8+this.copper.toString().length, ' ')+
    "Iron: "+this.iron+add2str(' ', 10-6+this.iron.toString().length, ' ')+
    'Diamond: '+this.diamond+add2str(' ', 10-9+this.diamond.toString().length, ' ')+
    'Amethyst: '+this.amethyst+add2str(' ', this.amethyst.toString().length, ' ');
  }
}