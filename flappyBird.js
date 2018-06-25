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

const gap = 90; //space between north and south pipes
let pSouthHeight = pipeNorth.height+gap;

let bX = 10; //x position of bird
let bY = 150; //y position of bird

let gravity = 1;

let score = 0;

//Load audio files
let flySound = new Audio();
flySound.src = "sounds/fly.mp3"
let scoreSound = new Audio();
scoreSound.src = "sounds/score.mp3"

//When any keyboard key is pressed down, bird goes up
document.addEventListener("keydown", moveUp);
function moveUp(){
    bY -=20;
    flySound.play();
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
        if (pipe[i].x === 90){
            pipe.push({ //push new pipe object to the pipe array
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height //random position
            })
        }

        //Detect collision and reload the page if there's one
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width 
            && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+pSouthHeight) 
            || bY +bird.height >= cvs.height - fg.height){
                location.reload();
        }
        //Increment score and play sound if bird crosses pipe
        if (pipe[i].x == 5){
                score++
                scoreSound.play()
        }
    }    
     
    
        ctx.drawImage(fg, 0, cvs.height - fg.height); //draws the fallground
    
        ctx.drawImage(bird, bX, bY); //draws the bird
    
        //Bird continuously falls downwards due to gravity
        bY += gravity
    
        //Insert score on canvas
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : "+score, 10, cvs.height-20);
    
        requestAnimationFrame(draw) //This repeatedly calls the draw function
    }

draw(); //calls the draw function