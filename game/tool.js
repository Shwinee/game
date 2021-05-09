var structures = [new Structure(100, 'copper', 'Solar panel', 'creates energy dependent on how close it is to the surface during the day.'),
 new Structure(10, 'rock', 'Tile', '...its just a tile')];


function Structure(cost, cItem, name, desc) {
  this.cost = cost;
  this.cItem = cItem;

  this.name = name;
  this.desc = desc;

}


function ToolManager() {
  this.curentTool = 'dig';
  this.structure = structures[0];
  this.building = false;
  this.builditem = '';
  this.dragging = false;

  this.buildAble = false;

  this.openUI = false;

  this.changeTool = function(tool){
    this.curentTool = tool.toLowerCase();
    if (tool == 'build'){
      this.openUI = true;



      //put up build ui
      ta.showButtons();
      ta.buttons[0].innerText = 'Build';
      ta.buttons[1].innerText = 'Next';
      ta.changeTText(
        this.structure.name+add2str(' ', 35-this.structure.name.length, ' ')+
        'Cost: '+this.structure.cost+' '+this.structure.cItem+add2str(' ', 35-7-this.structure.cost.toString().length-this.structure.cItem.length, ' ')+
        'Description: '+this.structure.desc);
      ta.buttons[0].onclick = () => {
        this.building = true;
        this.builditem = this.structure;
      }
      ta.buttons[1].onclick = () => {
        if (structures.indexOf(this.structure) + 1 >> structures.length-1){
          this.structure = structures[0];
        }else {
          this.structure = structures[structures.indexOf(this.structure) + 1];
        }
        // console.log(this.structure);
        this.changeTool('build');
      }


      //have to do this LASTg
      // ta.animate('Selected tool: Build', 1000);
    }else{
      this.openUI = false;
      ta.hideButtons();
    }
  }

  this.buildingAnimation = function() {
    // console.log('ani');

    let x = Math.floor(map(mouseX, 0, width, 0, 21)+1);
    let y = Math.floor(map(mouseY-cam.y, 0, 1816, 0, 100)+1);

    let clean = true;

    if (this.structure.name == 'Solar panel'){
      for (let i = 0; i < tiles.length; i++){
        if (collideRectRect(x*18, y*18, 51, 34, tiles[i].x, tiles[i].y, 17, 17) == true){
          clean = false;
        }
      }
    }else if (this.structure.name == 'Tile'){
      for (let i = 0; i < tiles.length; i++){
        if (collideRectRect(x*18, y*18, 17, 17, tiles[i].x, tiles[i].y, 17, 17) == true){
          clean = false;
        }
      }
    }


    if (clean == true){
      fill(0, 0, 0, 0);
      stroke(100, 100, 100);
      if (this.structure.name == 'Solar panel'){
        rect(x*18, y*18, 51, 34);
      }else if (this.structure.name == 'Tile'){
        rect(x*18, y*18, 17, 17);
      }

      //if click make the solar pannel
      this.buildAble = true;
      if (mouseIsPressed){

        //click

        // if (dta.rock-100 >= 0){
        //   if (this.structure.name == 'Solar panel'){
        //     new Machine((x*18)+1, (y*18)+1, 51, 34, 'Solar pannel', this.structure.desc);
        //   }else if(this.structure.name == 'Tile'){
        //     new Machine((x*18)+1, (y*18)+1, 17, 17, 'Tile', this.structure.desc);
        //   }
        //
        //   dta.rock-=100;
        //   this.building = false; //stops the animation
        // }
      }
    }else {
      this.buildAble = false;

      //things are touching stop
      stroke(255, 100, 100);
      fill(0, 0, 0, 0);
      if (this.structure.name == 'Solar panel'){
        rect(x*18, y*18, 51, 34);
      }else if (this.structure.name == 'Tile'){
        rect(x*18, y*18, 17, 17);
      }
    }
  }


  this.click = function(){
    if (toolm.curentTool == 'dig'){
      for (let i = 0; i < tiles.length; i++){
        if (collidePointRect(mouseX, mouseY-cam.y, tiles[i].x, tiles[i].y, 17, 17)){

          if (toolm.curentTool == 'dig'){
            tm.digTile(tiles[i]);
          }

        }
      }
    }else if (toolm.curentTool == 'build'){
      if (toolm.buildAble == true && toolm.building == true){
        let x = Math.floor(map(mouseX, 0, width, 0, 21)+1);
        let y = Math.floor(map(mouseY-cam.y, 0, 1816, 0, 100)+1);

        if (dta.rock-100 >= 0){
          if (toolm.structure.name == 'Solar panel'){
            new Machine((x*18)+1, (y*18)+1, 51, 34, 'Solar pannel', toolm.structure.desc);
          }else if(toolm.structure.name == 'Tile'){
            new Machine((x*18)+1, (y*18)+1, 17, 17, 'Tile', toolm.structure.desc);
          }

          dta.rock-=100;
        }

      }
    }
  }
}

function keyPressed() {
  if (key == 'd'){
    ta.animate('Selected tool: Dig', 1000);
    toolm.changeTool('dig');
    toolm.building = false;
  }else if (key == 'b'){
    toolm.changeTool('build');
  }

  if (key == 'c'){
    makeWorld();
  }
}
