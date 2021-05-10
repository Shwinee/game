function TextArea(id){
  this.buttons  = [];

  this.textArea = getEle(id);

  this.locked = false;
  this.animating = false;

  this.value = '';

  for (let i = 1; i < 3; i++){
    this.buttons.push(getEle('button'+i));
  }

  // this.buttons[0].innerText = ' ';
  // this.buttons[1].innerText = ' ';
  this.showButtons = function(){
    this.buttons[0].style = "color: rgba(0, 0, 0, 255); width: 55px; border: 1; margin-left: 10px;";
    this.buttons[1].style = "color: rgba(0, 0, 0, 255); width: 55px; border: 1; margin-left: 10px;";

    this.buttons[0].disabled = false;
    this.buttons[1].disabled = false;
  }

    this.hideButtons = function(){
    this.buttons[0].style = "color: rgba(0, 0, 0, 0); width: 55px; border: 0; margin-left: 10px;";
    this.buttons[1].style = "color: rgba(0, 0, 0, 0); width: 55px; border: 0; margin-left: 10px;";

    this.buttons[0].disabled = true;
    this.buttons[1].disabled = true;
  }

  this.hideButtons();

  this.faded = false;
  this.toggleFade = function(){
    if (this.faded == true){
      this.fadeIn();
    }else {
      this.fadeOut();
    }
  }

  this.fadeInter = '';

  this.fadeOut = function(){
    this.faded = true;
    let f = 0.255;
    this.fadeInter = setInterval(() => {
      f-=0.01;
      console.log(f);
      this.textArea.style = 'resize: none; color: rgba(0,0,0,'+f+'); border: 0'
      if (f <= 0){
        clearInterval(this.fadeInter);
        this.textArea.disabled = true;
      }
    }, 10);
  }
  this.fadeIn = function(){
    this.faded = false;
    let f = 0.255;
    this.fadeInter = setInterval(() => {
      f+=0.01;
      console.log(f);
      this.textArea.style = 'resize: none; color: rgba(0,0,0,'+f+'); border: 0'
      if (f >= 1){
        clearInterval(this.fadeInter);
        this.textArea.disabled = false;
      }
    }, 10);
  }

  this.toggleLock = function() {
    if (this.locked == true){
      this.locked = false;
    }else if (this.locked == false){
      this.locked = true;
    }
  }


  this.changeTText = function(text){
    if (this.locked == false && this.animating == false){
      this.value = text;
      this.textArea.innerText = text;
    }
  }

  this.animate = function(text, time){
    let bv = this.value;

    ta.changeTText(text);
    this.animating = true;
    setTimeout(() => {
      this.animating = false;
      ta.changeTText(bv);
    }, time)
  }
}
