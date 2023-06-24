const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var r=dajRandomBroj(15,40);//precnik glavnog kruga
var maxr=500;
var sirina =500;
var visina =500;
var bool = true;//kada se prekida
var pp = 0;


function boja() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function random_item(items)
{  
return items[Math.floor(Math.random()*items.length)];     
}

const mouse = {
  x: undefined,
  y: undefined
  
};
var sredina=false;


function mis (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  
}

canvas.addEventListener('mousemove',f);
function f(e){
    mis(e); //setuje mis 
    if (Math.sqrt(Math.pow((Math.abs(mouse.x - sirina/2)),2) +
    Math.pow( (Math.abs(mouse.y - visina/2)),2) ) <= r  &&  !sredina){//provjeri da li je u sredini
      sredina=true;
     // console.log(sredina);
    }    
}



function dajRandomBroj(min,max){
  return Math.round(Math.random()*(max-min)+min);
}

class Circle {
  constructor() {
      var tf=[true,false];
      var bool=random_item(tf);
      if (bool){
        let itemsx = [0,sirina];
        this.x = random_item(itemsx);
        this.y = dajRandomBroj(0,visina)
        if (this.x==0){
            this.dx=dajRandomBroj(1,1.1)
            this.dy=dajRandomBroj(1,1.1);
        }
        else{
          this.dx=-dajRandomBroj(1,1.1);//da idu unazad
          this.dy=dajRandomBroj(1,1.1);
        }

      }
      else{
        let itemsy=[0,visina];
        this.y=random_item(itemsy);
        this.x=dajRandomBroj(0,sirina);
        if (this.y==0){
            this.dy=dajRandomBroj(1,1.1);
            this.dx=dajRandomBroj(1,1.1);
        }
        else{
            this.dy=-dajRandomBroj(1,1.1);//da se vracaju
            this.dx=dajRandomBroj(1,1.1);
        }

      }
      var radius=dajRandomBroj(r-10,r+20);
      this.radius = radius;     
      this.color = boja();
  }

  
  draw() {
      ctx.beginPath(); 
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
  }
  updateSPEC(){  
  
    
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
    this.boundariesTest();
    if(
      (Math.sqrt(Math.pow((Math.abs(mouse.x - this.x)),2) +
         Math.pow( (Math.abs(mouse.y - this.y)),2) ))//ako se dodirnu specijalni i mis
      <= r+this.radius){
        if (this.radius <= r) { //ako je specijalni manji od trenutnog
                 
          r = r*2;
          this.x=sirina+this.radius;//da se skloni jer inace se ovo beskonacno povecava
          this.y=visina+this.radius;    
         
          if (r > maxr) {//pobjeda
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.fillRect(0, 0, sirina, visina); 
            ctx.fill();
            bool = false;
            pp = 1;
            }
          this.radius =0;   
        }
        else{         
          r= r-r/2;
          this.radius=0;
          if (r<0){
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.fillRect(0, 0, sirina, visina); 
            ctx.fill();
            bool = false;
            pp = -1;
          }
        }
        const randomBoolean =(Math.ceil(Math.random() >= 0.5));
        if (randomBoolean){ 
          for (const circle of dodatniArr) {
            circle.promjeniSmijer();
        }
        }
        else{
          for (const circle of dodatniArr) {
            circle.povecajBrzinu();
        }
        }
      }

     
              
    
  }
  promjeniSmijer(){
    this.dx=-this.dx;
    this.dy=-this.dy;
  }
  povecajBrzinu(){
    this.dx=this.dx+this.dx;
    this.dy=this.dy+this.dy;
  }
  update() {
      this.x += this.dx; 
      this.y += this.dy;     
      this.draw();
      this.boundariesTest();
       this.dodirSglavnim();
            
  }
  update2() {
    this.x += this.dx; 
    this.y += this.dy;      
    this.draw();
    this.boundariesTest();          
  }
  dodirSglavnim() {
     
      if(
      (Math.sqrt(Math.pow((Math.abs(mouse.x - this.x)),2) +
         Math.pow( (Math.abs(mouse.y - this.y)),2) ))
      <= r+this.radius){
        if (this.radius <= r) { //ako dotakne manji
          r = r + this.radius * 0.5;
          this.radius = 0;   

          if (r > maxr) {//pobjeda
              ctx.beginPath();
              ctx.fillStyle = "red";
              ctx.fillRect(0, 0, sirina, visina); 
              ctx.fill();
              bool = false;
              pp = 1;
          }
      }
      else { //ako dotakne veci , gubitak
          ctx.beginPath();
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, sirina, visina);
          ctx.fill();
          bool = false;
          pp = -1;
      }
      if (!bool) return bool;
      return bool;
       
    }}
  
  boundariesTest() {
       if (this.x-2*this.radius> sirina) //izadju desno
          {  
            this.radius=dajRandomBroj(r-10,r+10);
            this.color=boja();
            this.y=dajRandomBroj(0,visina);
         //   this.x ne mjenjam
            this.dx=-dajRandomBroj(1,3);
            this.dy=dajRandomBroj(-3,3);           
            
          }
       else if (this.x+2*this.radius<0){//izadju lijevo
        this.radius=dajRandomBroj(r-10,r+10);
        this.color=boja();
        this.y=dajRandomBroj(0,visina);
     //   this.x ne mjenjam
        this.dx=dajRandomBroj(1,3);
        this.dy=dajRandomBroj(-3,3);       
       }
       else{//ako je this.x izmedju 0 i sirine
       
         if (this.y-2*this.radius>visina){ //ako su ispod kanvasa
            this.radius=dajRandomBroj(r-10,r+10);
            this.color=boja();
            //this.y nemjenjam
            this.x=dajRandomBroj(0,sirina);
            this.dy=-dajRandomBroj(1,3);
            this.dx=dajRandomBroj(-3,3);

         }
         else if(this.y+2*this.radius< 0){ //ako su iznad kanvasa
            this.radius=dajRandomBroj(r-10,r+10);
            this.color=boja();
            //this.y nemjenjam
            this.x=dajRandomBroj(0,sirina);
            this.dy=dajRandomBroj(1,3);
            this.dx=dajRandomBroj(-3,3);
         }

       }
 }
}

var broj_krugova=dajRandomBroj(5,15);
let circlesArray = [];

let dodatniArr=[];
function dodatni(){

  dodatniArr=[];
  for (let i =0;i<dajRandomBroj(1,5);i++){
    dodatniArr.push(new Circle());
  }
  for (const circle of dodatniArr) {
    circle.draw();
}
}

var specijalni=new Circle();

function init() {
    crtajKrug();
    bool = true;
    circlesArray = [];
    for (let i = 0; i < dajRandomBroj(1,10); i++) {
        circlesArray.push(new Circle());
    }
    for (const circle of circlesArray) {
        circle.draw();
    }
    dodatni();   
    let s= circlesArray.length;
}

let tezina1c = document.getElementById('tezina1c');
let tezina2c= document.getElementById('tezina2c');
let tezina3c=document.getElementById('tezina3c');

tezina1c.addEventListener("click",
    function () {
       window.location="tezina1.html";
    });
tezina2c.addEventListener("click",
    function () {
      window.location ="tezina2.html";
    });
tezina3c.addEventListener("click",
    function () {
      window.location ="tezina3.html";
    });
let gameOverVar = document.getElementById('kraj-igrec');

function gameOver() {
        console.log("GAMEOVER");
        canvas.style = 'display:none';
        gameOverVar.style = 'display: block';
        document.getElementById("text-za-kraj").innerHTML = "Izgubili ste!";
        ctx.clearRect(0, 0, sirina, visina);
     
}

function youWon() {  
    console.log("Pobijedio si");
    canvas.style = 'display:none';
    gameOverVar.style = 'display: block';
    document.getElementById("text-za-kraj").innerHTML = "Pobijedili ste!";
    ctx.clearRect(0, 0, sirina, visina);
  }


var rafReference;
function animate() {
    if (bool ) {
     // if (sredina==true){
        ctx.clearRect(0, 0, sirina, visina);
        for (const circle of circlesArray) {
            circle.update();
            if (bool == false)
                break;
        }
        specijalni.updateSPEC();
        
        for (const c of dodatniArr){       
         
          if (bool==false)
            break;
          c.update();
        }
        crtajKrug();
        rafReference = requestAnimationFrame(animate);
    //  }
    }
    else {
      console.log("game over")
        cancelAnimationFrame(rafReference);
        if (pp == -1) {
            gameOver();
            console.log("Poraz")
        }
        if (pp == 1) {
            youWon();
            console.log("Pobjeda")
           
        }
    }}

function crtajKrug() {
    if (mouse.x >= 0 && mouse.x < sirina && mouse.y >= 0 && mouse.y < visina)// && POCETAK)
     {
        ctx.beginPath(); // to separate the two shapes from being connected with each other.
        ctx.arc(mouse.x, mouse.y, r, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
    }
    else {
        ctx.beginPath();
        ctx.arc(sirina/2, visina/2, r, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}

function prviKrug(){
  ctx.beginPath();
  ctx.arc(sirina/2, visina/2, r, 0, Math.PI * 2, false);
  ctx.fillStyle = "red";
  ctx.fill();
}
var animatefirstref;

function animatefirst() {
  if (!sredina ) {
    
      ctx.clearRect(0, 0, sirina, visina);
      for (const circle of circlesArray) {
          circle.update2();
          if (bool == false)
              break;
      }
      for (const circle of dodatniArr) {
        circle.update2();
        if (bool == false)
            break;
    }

      prviKrug();
      animatefirstref = requestAnimationFrame(animatefirst);

  }
  else{
    cancelAnimationFrame(animatefirstref);
    animate();

  }
}
init();
animatefirst();
