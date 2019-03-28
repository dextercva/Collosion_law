//function preload (){
  //   blockImg = loadImage('block.png');
  //   clack = loadSound('clack.wav');
  //let blockImg = sketch.loadImage('block.png');
  
 // let clack=sketch.loadSound('clack.wav');
  
 //  }
    
  var s = function(sketch){

  let digits = document.getElementById('d').value;
  const mass2 = document.getElementById('m1').value;
  let vio2 = document.getElementById('rat').value;


    
  let blockImg = sketch.loadImage('block.png');
  let block1;
  let block2;
  
  let clack=sketch.loadSound('clack.wav');
  
  let count = 0;
  let countDiv;

  let timeSteps;

  if (vio2 == 0)  {timeSteps = 10 ** (digits - 1);} else  {timeSteps=vio2;} 
  
  let m2;
  if (mass2 ==0 ) {m2 = Math.pow(100, digits - 1);} else {m2 = mass2;}
  
    
    
    
    
    
    
    
    
    
    class Block {
    constructor(x, w, m, v, xc) {
      this.x = x;
      this.y = sketch.height - w;
      this.w = w;
      this.v = v;
      this.m = m;
      this.xConstraint = xc;
    }
  
    hitWall() {
      return (this.x <= 0)
    }
  
    reverse() {
      this.v *= -1;
    }
  
    collide(other) {
      return !(this.x + this.w < other.x ||
        this.x > other.x + other.w);
    }
  
    bounce(other) {
      let sumM = this.m + other.m;
      let newV = (this.m - other.m) / sumM * this.v;
      newV += (2 * other.m / sumM) * other.v;
      return newV;
    }
  
    update() {
      this.x += this.v;
    }
      
      
  
  
    show() {
  
      const x = sketch.constrain(this.x, this.xConstraint, sketch.width);
      sketch.image(blockImg, x, this.y, this.w, this.w);
    }
  }
    
    
  
   
   
  
    
    
    
    
    
    
    
    
    
    
    
  
  
    
    
    
    
    
    
    
    
  sketch.setup = function (){
    sketch.createCanvas(sketch.windowWidth, 200);
//    let m1 = document.getElementById('m1').value;
    block1 = new Block(100, 20, 1, 0, 0);
    
    block2 = new Block(300, 100, m2, -1 / timeSteps, 20);
    countDiv = sketch.createDiv(count);
    countDiv.style('font-size', '72pt');
  
  }
  
  sketch.draw = function() {
    sketch.background(200);
  
    let clackSound = false;
  
    for (let i = 0; i < timeSteps; i++) {
      if (block1.collide(block2)) {
        const v1 = block1.bounce(block2);
        const v2 = block2.bounce(block1);
        block1.v = v1;
        block2.v = v2;
        clackSound = true;
        count++;
      }
  
      if (block1.hitWall()) {
        block1.reverse();
        clackSound = true;
        count++;
      }
  
      block1.update();
      block2.update();
    }
  
    if (clackSound) {
      clack.play();
    }
    block1.show();
    block2.show();
  
    countDiv.html(sketch.nf(count, digits));
  }
  }
  