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

let gravity = 1.5;

//When any keyboard key is pressed down, bird goes up
document.addEventListener("keydown", moveUp);
function moveUp(){
    bY -=25;
}

//Declare pipe coordinates
let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

//Draw Images
function draw(){
    ctx.drawImage(bg,0,0); //draws the background

   //Move pipes to the left and draw new pipes
    for (let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y); //draws the north pipe
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+pSouthHeight); //draws the south pipe

        pipe[i].x--; //move pipes to the left

        //To draw new pipes
        if (pipe[i].x === 125){
            pipe.push({ //push new pipe object to the pipe array
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height //random position
            })
        }
    }    
 

    ctx.drawImage(fg, 0, cvs.height - fg.height); //draws the fallground

    ctx.drawImage(bird, bX, bY); //draws the bird

    //Bird continuously falls downwards due to gravity
    bY += gravity

    requestAnimationFrame(draw) //This repeatedly calls the draw function
}

draw(); //calls the draw function