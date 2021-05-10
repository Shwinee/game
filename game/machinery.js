var machines = []

var mm = new MachineManager();

function MachineManager(){
  this.render = function(){
    for (let i = 0; i < machines.length; i++){
      let machine = machines[i];


      switch (machine.name){
        case "Solar pannel":
          fill(100, 100, 100, 255);
          break;
        case "Tile":
          fill(200, 200, 200, 200);
      }

      rect(machine.x, machine.y, machine.w, machine.h);

      if (collidePointRect(mouseX, mouseY-cam.y, machine.x, machine.y, machine.w, machine.h)){
        let out = [];
        out[0] = "Name: "+machine.name+add2str('', 35-6+machine.name.length, ' ');
        out[1] = "Description: "+machine.description+add2str('', 35-6+machine.description.length, ' ');


        ta.changeTText(out.join(' '));
      }
    }
  }

  this.update = function(){
    for (let i = 0; i < machines.length; i++){
      let machine = machines[i];
      machine.update();
    }
  }
}

function Machine(x, y, w, h, name, desc, updateFunc){
  this.x = x-0.1;
  this.y = y-0.1;

  this.w = w;
  this.h = h;

  this.name = name;

  this.description = desc;

  this.update = updateFunc;

  machines.push(this);
}
