let cvs = document.getElementById("canvas"); //select the canvas
let ctx = cvs.getContext("2d");


//Load images
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth =new Image();

bird.src = "images/bird.png";
bg.src = 'images/background.png';
fg.src = "images/fallground.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

const gap = 85; //space between north and south pipes
let pSouthHeight = pipeNorth.height+gap;

let bX = 10; //x position of bird
let bY = 150; //y position of bird

let gravity = 1;

//When any keyboard key is pressed down, bird goes up
document.addEventListener("keydown", moveUp);
function moveUp(){
    bY -=20;
}

//Draw Images
function draw(){
    ctx.drawImage(bg,0,0); //draws the background
    
    ctx.drawImage(pipeNorth, 100, 0); //draws the north pipe
    ctx.drawImage(pipeSouth, 100, pSouthHeight); //draws the south pipe

    ctx.drawImage(fg, 0, cvs.height - fg.height); //draws the fallground

    ctx.drawImage(bird, bX, bY); //draws the bird

    //Bird continuously falls downwards due to gravity
    bY += gravity

    requestAnimationFrame(draw) //This repeatedly calls the draw function
}

draw(); //calls the draw function