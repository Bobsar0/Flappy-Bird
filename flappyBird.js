let cvs = document.getElementById("canvas"); //select the canvas
let ctx = cvs.getContext("2d");


//Load canvas
let bg = new Image();
bg.src = "images/background.png";

//Draw canvas
ctx.drawImage(bg, 0, 0)

