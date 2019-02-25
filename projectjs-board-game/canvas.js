var CanvasManager = {};

CanvasManager.canvas=null;
CanvasManager.context=null;

CanvasManager.setCanCon = function(element) {
    CanvasManager.canvas  = document.getElementById(element);
    CanvasManager.context = CanvasManager.canvas.getContext('2d');
}

var allShapes=[];
var allShapesCopy=[];
var shapeVariable=null;
var clickedX=null;
var clickedY=null;
var heroType=null;


//flag for randomly choosing drawback place
//(needed for randomness of placing drawback 
//if there is not any[at least one should exist])
//object storey row and coloumn of setback
initialDrawbackPosition =  {
    "x":getRandomNumber(3,5)-1,"y":getRandomNumber(1,9)-1
}

function getRandomNumber (min,max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function shapeVariableConstructor (bX,bY,bWidth,bHeight,bColor) {
    this.bX=bX;
    this.bY=bY;
    this.bWidth=bWidth;
    this.bHeight=bHeight;
    this.bColor=bColor;
}
function pushShapeVariable (shapeVar,arr) {

    //check if x isnt out of bonds    
    if(shapeVar.bX<499) {
        arr.push(shapeVar);
    }
}
function unlucky  (blockX,blockY) {
    //if not any drawback was put on the board
    // & x & y parameters are equal
    //place drawback to that position
    if(Constants.drawbacks==5 && blockX == initialDrawbackPosition.x 
       && blockY == initialDrawbackPosition.y) 
       { Constants.drawbacks--; return true;}

    //add drawback randomly
     else {
      if(getRandomNumber(1,20)==1) return true;
      }
} 
function fillContext(arr) {
    for(var i=0;i<arr.length;i++) {
    CanvasManager.context.fillStyle=arr[i].bColor;
    CanvasManager.context.fillRect(arr[i].bX,arr[i].bY,arr[i].bWidth,arr[i].bHeight);
     }
 }   
function copyArray (arr) {
    return arr.slice();
    }
    
function fillWithText(arr,startFrom,fillUntill) {
        for(var i=startFrom;i<arr.length-fillUntill;i++) {
        CanvasManager.context.font="30px Arial";
        CanvasManager.context.fillStyle="black";
        CanvasManager.context.fillText("X",arr[i].bX+20,arr[i].bY+40);
        arr[i].bColor="red";
        }
}
CanvasManager.unitPlacingView = function(player) {
    var startingPosition;
    var finishPosition;
    if(player==2) {
        startingPosition=0;
        finishPosition=18;
    }
    else if(player==1) {
        startingPosition=18;
        finishPosition=0;
    }
    fillWithText(allShapesCopy,startingPosition,finishPosition);

    CanvasManager.drawBoardS(allShapesCopy,startingPosition,finishPosition);
}

CanvasManager.drawBoard = function(nRow, nCol) {
    var blockWidth = CanvasManager.canvas.width;
    var blockHeight = CanvasManager.canvas.height;

    blockWidth /= nCol;       
    blockHeight /= nRow;       

    for (var i = 0; i < nRow; ++i) {
        for (var j = 0; j < nCol; ++j) {

            if(i < 2 || i > 4) {
                
            shapeVariable = new shapeVariableConstructor(2*j*blockWidth+(i%2 ?  0 : blockWidth), i*blockHeight, blockWidth, blockHeight,"#8c8c8c");
            pushShapeVariable(shapeVariable,allShapes);
       
            shapeVariable = new shapeVariableConstructor(2*j*blockWidth+(i%2 ?  blockWidth : 0), i*blockHeight, blockWidth, blockHeight,"black");
            pushShapeVariable(shapeVariable,allShapes);

            }
            else {
                //generate obstacles
                if(Constants.drawbacks && unlucky(i,j)) {
                Constants.drawbacks--;
                shapeVariable= new shapeVariableConstructor(j*blockWidth,i*blockHeight,blockWidth,blockHeight,"#660000");
                pushShapeVariable(shapeVariable,allShapes);
                }

                //battlefield
                else {
                //fill blocks 
               shapeVariable= new shapeVariableConstructor(j*blockWidth,i*blockHeight,blockWidth,blockHeight,"#ff3333");
               pushShapeVariable(shapeVariable,allShapes);

                //borders
                CanvasManager.context.strokeStyle = "#black";
                CanvasManager.context.strokeRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
                }
            }
        }               
    }    fillContext(allShapes); allShapesCopy=copyArray(allShapes);
} 

//unit placing view
CanvasManager.drawBoardS = function(arr,start,finish) {     
        
    fillContext(arr);  fillWithText(arr,start,finish); 

} 
CanvasManager.battleView = function() {
    Constants.drawbacks=5;
    CanvasManager.drawBoard(Constants.NUMBER_OF_ROWS,Constants.NUMBER_OF_COLS);
}

//get coordinates of clicked place in canvas
CanvasManager.getRelativeCoords = function(event) {
    clickedX=event.offsetX;
    clickedY=event.offsetY;

    placeUnit(clickedX,clickedY);
}

function placeUnit(x,y) {
    if(heroType) {
    CanvasManager.context.fillStyle="white";
    for(var i =0;i<allShapesCopy.length;i++) {
        var left = allShapesCopy[i].bX;
        var right = allShapesCopy[i].bX+allShapesCopy[i].bWidth;
        var top = allShapesCopy[i].bY;
        var bottom = allShapesCopy[i].bY+allShapesCopy[i].bHeight;

        if (right >= x && left <= x && bottom >= y && top <= y 
            && checkBattlefield(bottom)) {
            console.log(bottom);  
            CanvasManager.context.fillRect(allShapesCopy[i].bX,allShapesCopy[i].bY,55,55);
            CanvasManager.context.font="30px Arial";
            CanvasManager.context.fillStyle="black";
            CanvasManager.context.fillText(heroType,allShapesCopy[i].bX+20, allShapesCopy[i].bY+40);
            }
    } heroType=null;
}

}

CanvasManager.selectHero = function(selectedHero) {
heroType=selectedHero;
}

//check whether 
function checkBattlefield(bottom) {
 return bottom>Players.playerTwoBattlefield.start && bottom<Players.playerTwoBattlefield.end
}