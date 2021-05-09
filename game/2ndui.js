function TextDebris(id){
  this.element = getEle(id);
  
  this.dirt = 0;
  this.rock = 0;
  this.copper = 0;
  this.iron = 0;
  
  this.update = function(){
    this.element.innerText = '- debris - Dirt: '+this.dirt+add2str(' ', 10-6+this.dirt.toString().length, ' ')+'Rock: '+this.rock+add2str(' ', 10-6+this.rock.toString().length, ' ')+"Copper: "+this.copper+add2str(' ', 10-8+this.copper.toString().length, ' ')+"Iron: "+this.iron+add2str(' ', 10-6+this.iron.toString().length, ' '); 
  }
}