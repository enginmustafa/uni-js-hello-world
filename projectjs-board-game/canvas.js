var canvas  = document.getElementById("game-board");
var context = canvas.getContext('2d');

var NUMBER_OF_ROWS=7;
var NUMBER_OF_COLS=9;
var drawbacks=5;
var shapeVariable;
var allShapes=[];

//copy of allShapes
var allShapesCopy;


//flag for randomly choosing drawback place
//(needed for randomness of placing drawback 
//if there is not any[at least one should exist])
//object storey row and coloumn of setback
var initialDrawbackPosition= {"x":getRandomNumber(3,5)-1,"y":getRandomNumber(1,9)-1}



function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function drawBoard(arr,nRow, nCol) {
    var blockWidth = canvas.width;
    var blockHeight = canvas.height;

    blockWidth /= nCol;       
    blockHeight /= nRow;       


    for (var i = 0; i < nRow; ++i) {
        for (var j = 0; j < nCol; ++j) {


            if(i < 2 || i > 4) {
                
            shapeVariable = new shapeVariableConstructor(2*j*blockWidth+(i%2 ?  0 : blockWidth), i*blockHeight, blockWidth, blockHeight,"#8c8c8c");
            pushShapeVariable(shapeVariable,arr);

            
       
            shapeVariable = new shapeVariableConstructor(2*j*blockWidth+(i%2 ?  blockWidth : 0), i*blockHeight, blockWidth, blockHeight,"black");
            pushShapeVariable(shapeVariable,arr);

                

            }
            else {
                //generate obstacles
                if(drawbacks && unlucky(i,j)) {
                drawbacks--;
                shapeVariable= new shapeVariableConstructor(j*blockWidth,i*blockHeight,blockWidth,blockHeight,"#660000");
                pushShapeVariable(shapeVariable,arr);

                }

                //battlefield
                else {
                //fill blocks 
               shapeVariable= new shapeVariableConstructor(j*blockWidth,i*blockHeight,blockWidth,blockHeight,"#ff3333");
               pushShapeVariable(shapeVariable,arr);

                //borders
                context.strokeStyle = "#black";
                context.strokeRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
                }
            }

        }               

    }    fillContext(arr); allShapesCopy=copyArray(allShapes);
} 


//method for generating drawbacks
function unlucky(blockX,blockY) {
    //if not any drawback was put on the board
    // & x & y parameters are equal
    //place drawback to that position
    if(drawbacks==5 && blockX == initialDrawbackPosition.x && blockY == initialDrawbackPosition.y) { drawbacks--; return true;}

    //add drawback randomly
     else {
      if(getRandomNumber(1,20)==1) return true;
      }
}

function shapeVariableConstructor(bX,bY,bWidth,bHeight,bColor) {
       this.bX=bX;
       this.bY=bY;
       this.bWidth=bWidth;
       this.bHeight=bHeight;
       this.bColor=bColor;

}

function fillContext(arr) {
       for(var i=0;i<arr.length;i++) {
       context.fillStyle=arr[i].bColor;
       context.fillRect(arr[i].bX,arr[i].bY,arr[i].bWidth,arr[i].bHeight);
        }
    }


function pushShapeVariable(shapeVar,arr) {

//check if x isnt out of bonds    
if(shapeVar.bX<499) {
    arr.push(shapeVar);
}
}    
    
function copyArray (arr) {
return arr.slice();
}

drawBoard(allShapes,NUMBER_OF_ROWS, NUMBER_OF_COLS);


function fillWithText (arr,startFrom,fillUntill) {
    for(var i=startFrom;i<arr.length-fillUntill;i++) {
    context.font="30px Arial";
    context.fillStyle="black";
    context.fillText("X",arr[i].bX+20,arr[i].bY+40);
    arr[i].bColor="red";
    }
}

function unitPlacingView(player) {
    var startingPosition;
    var finishPosition;
    if(player==1) {
        startingPosition=0;
        finishPosition=18;
    }
    else if(player==2) {
        startingPosition=18;
        finishPosition=0;
    }
    fillWithText(allShapesCopy,startingPosition,finishPosition);

    drawBoardS(allShapesCopy,startingPosition,finishPosition);

}

function battleView() {
    drawbacks=5;
    drawBoard(allShapes,NUMBER_OF_ROWS,NUMBER_OF_COLS);
}

unitPlacingView(1);
//battleView();


function drawBoardS(arr,start,finish) {     
        
    fillContext(arr);  fillWithText(arr,start,finish); 

} 










 
