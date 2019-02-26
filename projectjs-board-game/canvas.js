var CanvasManager = {};

CanvasManager.canvas=null;
CanvasManager.context=null;

//store rectangles of heroes during placing for further use
var selectionRects=[];

//store drawback rectangles
var drawbackRects=[];

//store rectangle while drawing hero-selection-area
var initialRect=null;
var heroType=null;

var hero=null;
//store heroes
var heroes=[];

//variables to count heroes
var k=0;
var d=0;
var e=0;

//randomly generate position for a drawback and store it to variable
var initialDrawbackPosition =  {
    "x":getRandomNumber(3,5)-1,"y":getRandomNumber(1,9)-1
}

function initialRects (bX,bY,bWidth,bHeight,bColor) {
    this.bX=bX;
    this.bY=bY;
    this.bWidth=bWidth;
    this.bHeight=bHeight;
    this.bColor=bColor;
}

function heroConstructor (bX,bY,bName) {
    this.bX=bX;
    this.bY=bY;
    this.bWidth=55;
    this.bHeight=55;
    this.bColor="white";
    this.bName=bName;
    this.bType=getTypeOfHero(bName);
}
function getRandomNumber (min,max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getTypeOfHero(name) {
    switch(name) {
        case "K":
            return Knight;
        case "E":
            return Elf;
        case "D":
            return Dwarf;
    }
}
CanvasManager.setCanCon = function(element) {
    CanvasManager.canvas  = document.getElementById(element);
    CanvasManager.context = CanvasManager.canvas.getContext('2d');
}

//pass array of rectangles -> fill them
function fillContext(element) {
    CanvasManager.context.fillStyle=element.bColor;
    CanvasManager.context.fillRect(element.bX,element.bY,element.bWidth,element.bHeight);

 }  

 //pass array of rectangles -> fill them with text
 function fillWithText(element) {
    CanvasManager.context.font="30px Arial";
    CanvasManager.context.fillStyle="black";
    CanvasManager.context.fillText("X",element.bX+20,element.bY+40);
}

//get coordinates of clicked place
CanvasManager.getRelativeCoords = function(event) {
    clickedX=event.offsetX;
    clickedY=event.offsetY;

    placeUnit(clickedX,clickedY);
}

CanvasManager.selectHero = function(selectedHero) {
    heroType=selectedHero;
}

//check availability of hero type
function isAvailable (hero) {
  switch(hero.bName) {
      case "K": 
          k++;
          break;
      case "E":
          e++;

          break;
      case "D":
          d++;

          break;
  }
    if(k==2) {
    document.getElementById("Knight").style="display: none";
    k=0;
  }
  else if(e==2) {
        document.getElementById("Elf").style="display: none";
        e=0;
  }
  else if(d==2) {
    d=0;

    document.getElementById("Dwarf").style="display: none";
  }
}

//place hero
function placeUnit(x,y) {
    if(heroType) {
    for(var i =0;i<selectionRects.length;i++) {
        var left = selectionRects[i].bX;
        var right = selectionRects[i].bX+selectionRects[i].bWidth;
        var top = selectionRects[i].bY;
        var bottom = selectionRects[i].bY+selectionRects[i].bHeight;

        if (right >= x && left <= x && bottom >= y && top <= y ) 
        {
            var hero = new heroConstructor(selectionRects[i].bX,selectionRects[i].bY,heroType);
            if(isRectAvailable(hero)) {
            isAvailable(hero);
            fillContext(hero);
            heroes.push(hero); 
            CanvasManager.context.font="30px Arial";
            CanvasManager.context.fillStyle="black";
            CanvasManager.context.fillText(hero.bName,selectionRects[i].bX+20, selectionRects[i].bY+40);}
            }
    }          heroType=null; 
               if(heroes.length==6) {CanvasManager.drawSelectionBoard(2); reShowAvailablePlayers();} 
               else if(heroes.length==12) {drawBattleBoard();}
    }
}
function setPlayer(n) {
    var whichPlayersTurn=document.getElementById("player-turn");
if(n) {
    whichPlayersTurn.innerHTML="Player Two's turn";
}
else {
    whichPlayersTurn.innerHTML="Player One's turn";
}
}

//check if desired rect isnt taken by another one already
function isRectAvailable(element) {
    var rectAvailable=true;
    for(var i=0;i<heroes.length;i++) {
        if(element.bX==heroes[i].bX && element.bY==heroes[i].bY)
        {rectAvailable=false;}
    }
    return rectAvailable;
}

//show available players for player two
function reShowAvailablePlayers() {
    setPlayer(2);
    var arr = document.getElementsByClassName("heroes");
    for(var i=0;i<arr.length;i++) {
        arr[i].style="display:";
    }
}

CanvasManager.drawSelectionBoard = function(n) {
    setPlayer();
    var blockWidth = CanvasManager.canvas.width;
    var blockHeight = CanvasManager.canvas.height;

    nRow=Constants.NUMBER_OF_ROWS;
    nCol=Constants.NUMBER_OF_COLS;

    blockWidth /= nCol;       
    blockHeight /= nRow;       

    for (var i = 0; i < nRow; ++i) {
        for (var j = 0; j < nCol; ++j) {

            if(n==1 ? i < 2:i>4) {
                
            initialRect = new initialRects(2*j*blockWidth+(i%2 ?  0 : blockWidth), i*blockHeight, blockWidth, blockHeight,"#8c8c8c");
            fillContext(initialRect);
            selectionRects.push(initialRect);

            
            initialRect = new initialRects(2*j*blockWidth+(i%2 ?  blockWidth : 0), i*blockHeight, blockWidth, blockHeight,"black");
            fillContext(initialRect);
            selectionRects.push(initialRect);

            }
            else {
                //battlefield
                //fill blocks 
               initialRect= new initialRects(j*blockWidth,i*blockHeight,blockWidth,blockHeight,"#ff3333");
               fillContext(initialRect);
               fillWithText(initialRect);
                
                //borders
                CanvasManager.context.strokeStyle = "#black";
                CanvasManager.context.strokeRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
                
            }
        }               
    }    
} 


function shapeVariableConstructor (bX,bY,bWidth,bHeight,bColor) {
    this.bX=bX;
    this.bY=bY;
    this.bWidth=bWidth;
    this.bHeight=bHeight;
    this.bColor=bColor;
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

//place heroes on battle table
function placeHeroes(arr) {
   for(var i=0;i<arr.length;i++) {
       fillContext(arr[i]);
       CanvasManager.context.font="30px Arial";
       CanvasManager.context.fillStyle="black";
       if(i>5) {arr[i].bName+="*";}
       CanvasManager.context.fillText(arr[i].bName,arr[i].bX+20, arr[i].bY+40);
   }
}

function drawBattleBoard() {
    document.getElementById("hero-placing-div").style="display: none";
    document.getElementById("hero-action-div").style="display:inline";

   CanvasManager.setCanCon("game-board");
    var shapeVariable=null;

    var blockWidth = CanvasManager.canvas.width;
    var blockHeight = CanvasManager.canvas.height;

    nRow=Constants.NUMBER_OF_ROWS;
    nCol=Constants.NUMBER_OF_COLS;

    blockWidth /= nCol;       
    blockHeight /= nRow;       

    for (var i = 0; i < nRow; ++i) {
        for (var j = 0; j < nCol; ++j) {

            if(i < 2 || i > 4) {
                
            shapeVariable = new shapeVariableConstructor(2*j*blockWidth+(i%2 ?  0 : blockWidth), i*blockHeight, blockWidth, blockHeight,"#8c8c8c");
            fillContext(shapeVariable); 

            shapeVariable = new shapeVariableConstructor(2*j*blockWidth+(i%2 ?  blockWidth : 0), i*blockHeight, blockWidth, blockHeight,"black");
            fillContext(shapeVariable); 

            }
            else {
                 //generate obstacles
                 if(Constants.drawbacks && unlucky(i,j)) {
                 Constants.drawbacks--;
                 shapeVariable= new shapeVariableConstructor(j*blockWidth,i*blockHeight,blockWidth,blockHeight,"#660000");
                 drawbackRects.push(shapeVariable);
                 fillContext(shapeVariable); 
                }

                //battlefield
                else {
                //fill blocks 
               shapeVariable= new shapeVariableConstructor(j*blockWidth,i*blockHeight,blockWidth,blockHeight,"#ff3333");
                fillContext(shapeVariable); 

                //borders
                CanvasManager.context.strokeStyle = "#black";
                CanvasManager.context.strokeRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
                }
            }
        }               
    }   placeHeroes(heroes); 
} 
