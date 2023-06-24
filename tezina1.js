const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var sirina = canvas.clientWidth;
var visina = canvas.clientHeight;
var bool = true;//kada se prekida
var pp = 0;
var r = dajRandomBroj(10, 30);//precnik glavnog kruga
var maxr = 200;//max precnik do pobjede
var sredina=false;

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
        this.x = sirina + this.radius * 2;
        this.y = dajRandomBroj(this.radius / 2, visina);
        this.dx = -dajRandomBroj(1, 1.5);
        this.dy = 0;
        this.color = boja();

    }

    draw() {
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }


    update() {
        this.x += this.dx;
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
            <= r+this.radius){

            if (this.radius <= r) { //ako dotakne manji

                r = r + this.radius * 0.5;//nestaje kruzic kad ga dotakne mouse
                this.radius = 0;
                //okrene se skroz i pomjeriskroz do kraja
                this.x = 450;
                this.dx = -this.dx;
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

    boundariesTest() { 
        if (this.x > sirina + this.radius) {  //ako izadje desno dodaje se novi krugic tj.samo promjenim osobine ovom trenutnom
            this.radius = dajRandomBroj(r - 10, r + 10);
            this.x= sirina+this.radius;
            this.dx = dajRandomBroj(1, 3);
            this.dx = -this.dx;
            this.dy = 0;
            this.y = dajRandomBroj(0, visina - this.radius);
            



        }
        if (this.x - this.radius < 0) {   
            this.x = 0 + this.radius;
            this.dx = -this.dx;
            this.dy = 0;
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

let tezina1a = document.getElementById('tezina1a');
let tezina2a= document.getElementById('tezina2a');
let tezina3a=document.getElementById('tezina3a');


tezina1a.addEventListener("click",
    function () {
       window.location="tezina1.html";
    });
tezina2a.addEventListener("click",
    function () {
      window.location ="tezina2.html";
    });
tezina3a.addEventListener("click",
    function () {
      window.location ="tezina3.html";
    });
let gameOverVara = document.getElementById('kraj-igrea');
function gameOver() {
        console.log("GAMEOVER");
        canvas.style = 'display:none';
        gameOverVara.style = 'display: block';
        document.getElementById("text-za-kraja").innerHTML = "Izgubili ste!";
        ctx.clearRect(0, 0, sirina, visina);
     
}
function youWon() {  
    console.log("Pobijedio si");
    canvas.style = 'display:none';
    gameOverVara.style = 'display: block';
    document.getElementById("text-za-kraja").innerHTML = "Pobijedili ste!";
    ctx.clearRect(0, 0, sirina, visina);
   

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




function crtajKrug() {
    if (mouse.x >= 0 && mouse.x < sirina && mouse.y >= 0 && mouse.y < visina)// && POCETAK)
     {
        ctx.beginPath(); 
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
  