var canvas  = document.getElementById("game-board");
var context = canvas.getContext('2d');

var NUMBER_OF_ROWS=7;
var NUMBER_OF_COLS=9;
var drawbacks=5;


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function drawBoard(nRow, nCol) {
    var blockWidth = canvas.width;
    var blockHeight = canvas.height;

    blockWidth /= nCol;       
    blockHeight /= nRow;       


    for (var i = 0; i < nRow; ++i) {
        for (var j = 0; j < nCol; ++j) {
           
            if(i < 2 || i > 4) {
            context.fillStyle = "#8c8c8c";
            context.fillRect(2*j*blockWidth+(i%2 ?  0 : blockWidth), i*blockHeight, blockWidth, blockHeight);

            context.fillStyle = "black";
            context.fillRect(2*j*blockWidth+(i%2 ?  blockWidth : 0), i*blockHeight, blockWidth, blockHeight);
            }
            else {
                if(drawbacks && unlucky()) {
                drawbacks--;
                context.fillStyle = "#660000";
                context.fillRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
                }
                else {
                //fill blocks 
                context.fillStyle = "#ff3333";
                context.fillRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);

                //borders
                context.strokeStyle = "#black";
                context.strokeRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
                }
            }

        }
    }
}

//method for generating drawbacks
function unlucky() {
    //initially place one drawback
    if(drawbacks==5) { console.log("initial drawback"); return true;}

    //then by chance
    else {
     if(getRandomNumber(1,10)<=1) return true;
     else return false;
    }
}




drawBoard(NUMBER_OF_ROWS, NUMBER_OF_COLS);
   
