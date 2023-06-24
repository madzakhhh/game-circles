const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
function dajRandomBroj(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function boja() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
var sirina = canvas.clientWidth;
var visina = canvas.clientHeight;
var bool = true;//kada se prekida
var pp = 0;
var sredina=false;

var r = dajRandomBroj(10, 30);//precnik glavnog kruga
var maxr = 400;//max precnik do pobjede

const mouse = {
    x: undefined,
    y: undefined
};


function mis(e) {
    
    mouse.x = e.x;
    mouse.y = e.y;
}

canvas.addEventListener('mousemove',f);
function f(e){
    mis(e); //setuje mis 
    if (Math.sqrt(Math.pow((Math.abs(mouse.x - sirina/2)),2) +
    Math.pow( (Math.abs(mouse.y - visina/2)),2) ) <= r  &&  !sredina){//provjeri da li je u sredini
      sredina=true;
      console.log(sredina);
    }    
}

class Circle {
    constructor() {
        var radius = dajRandomBroj(r - r * 0.4, r + r * 0.3);
        this.radius = radius;
        this.x = dajRandomBroj(this.radius / 2, visina);
        this.y =  visina + this.radius * 2;/**************** */ 
        this.dx = dajRandomBroj(1,1.5);//brzina kojom mjenja x koord ali unaazd jer tek ulaze
        this.dy = dajRandomBroj(1,1.5);
        this.color = boja();

    }

    draw() {
        ctx.beginPath(); // to separate the two shapes from being connected with each other.
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }


    update() {
        this.y += this.dy;
        this.x +=this.dx;
        this.draw();
        this.boundariesTest();
        this.dodirSglavnim();
    }
    update2(){
        this.x += this.dx;
        this.draw();
        this.boundariesTest();
        
    }

    dodirSglavnim() {
   
        if(
            (Math.sqrt(Math.pow((Math.abs(mouse.x - this.x)),2) +
               Math.pow( (Math.abs(mouse.y - this.y)),2) ))
            <= r+this.radius) {

            if (this.radius <= r) { //ako dotakne manji

                r = r + this.radius * 0.5;//nestaje kruzic kad ga dotakne mouse
                this.radius = 0;
                //okrene se skroz i pomjeriskroz do kraja
                this.y = 450;
                this.dy = -this.dy;
                if (r > maxr) {//pobjeda boji u crveno
                    ctx.beginPath();
                    ctx.fillStyle = "red";
                    ctx.fillRect(0, 0, sirina, visina); 
                    ctx.fill();
                    bool = false;
                    pp = 1;
                }
            }
            else { //ako dotakne veci 
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, sirina, visina);
                ctx.fill();
                bool = false;
                pp = -1;
            }
            if (!bool) return bool;
        }
        return bool;

    }

    boundariesTest() { //treba dodat napustanje
        if (this.y > visina + this.radius) {  //ako izadje desno dodaje se novi krugic tj.samo promjenim osobine ovom trenutnom
            this.radius = dajRandomBroj(r - 10, r + 10);
            this.y= visina+this.radius;
            this.dy = dajRandomBroj(1, 3);
            this.dy = -this.dy; //brzina kojom mjenja x koord
            this.dx = 0;
            this.x = dajRandomBroj(0, sirina - this.radius);
            



        }
        if (this.y - this.radius < 0) {   //ako izadje lijevo odbija se
           
            this.y= 0 + this.radius;
            
            this.dy = -this.dy;//brzina kojom mjenja x koord
            this.dx = 0;
            // this.color = boja();
        }


    }
}

var broj_krugova=dajRandomBroj(5,15);
let circlesArray = [];
function init() {
    crtajKrug();
    bool = true;
    circlesArray = [];
    for (let i = 0; i < broj_krugova; i++) {
        circlesArray.push(new Circle());
    }
    for (const circle of circlesArray) {
        circle.draw();
    }
    
}
init();

let tezina1b = document.getElementById('tezina1b');
let tezina2b= document.getElementById('tezina2b');
let tezina3b=document.getElementById('tezina3b');


tezina1b.addEventListener("click",
    function () {
       window.location="tezina1.html";
    });
tezina2b.addEventListener("click",
    function () {
      window.location ="tezina2.html";
    });
tezina3b.addEventListener("click",
    function () {
      window.location ="tezina3.html";
    });
let gameOverVarb = document.getElementById('kraj-igreb');
function gameOver() {
        console.log("GAMEOVER");
        canvas.style = 'display:none';
        gameOverVarb.style = 'display: block';
        document.getElementById("text-za-krajb").innerHTML = "Izgubili ste!";
        ctx.clearRect(0, 0, sirina, visina);
        // init();
        // animate();
}
function youWon() {  
    console.log("Pobijedio si");
    canvas.style = 'display:none';
    gameOverVarb.style = 'display: block';
    document.getElementById("text-za-krajb").innerHTML = "Pobijedili ste!";
    ctx.clearRect(0, 0, sirina, visina);
    // init();
    // animate();

}

var rafReference;

function animate() {
    if (bool) {
        ctx.clearRect(0, 0, sirina, visina);
        for (const circle of circlesArray) {
            circle.update();
            if (bool == false)
                break;
        }
        crtajKrug();
        rafReference = requestAnimationFrame(animate);
    }
    else {
        cancelAnimationFrame(rafReference);
        if (pp == -1) {
            gameOver();
        }
        if (pp == 1) {
            youWon();
           
        }
    }}

animate();


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
  