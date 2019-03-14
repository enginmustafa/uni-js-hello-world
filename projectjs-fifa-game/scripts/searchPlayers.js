//Search requires only input of Country
//if position and top eleven or susbstitute input is not given -> show all players that play for exact country
//regardless of their position or if they are top eleven or susbstitute players
//if they are given -> filter players appropriately


searchPlayers={};

searchPlayers.submitSearch = function(data) {
    getPlayers(data);
}

function getPlayers(data) {
    //clear out the result box first
    document.getElementById("result-box").innerHTML="";

    //get value of search box
    var countryName = document.getElementById("search-country").value;
    
    //get selected position--if so
    var position = document.getElementById("select-pos");
    var chosenPosition = position.options[position.selectedIndex].value;
     
    //if radio button is selected -> get chosen (top eleven or substitute) 
    //else return null;
    var topOrSub = document.querySelector('input[name="topsub"]:checked');
    var chosenTopOrSub = topOrSub ? topOrSub.value : null;

    //store info of search to history
    var search = new localHistory.searchConstructor(countryName,chosenPosition,chosenTopOrSub);
    localHistory.saveHistory(search);

    searchAmongstAll(countryName,chosenPosition,chosenTopOrSub,data);

   //reset search-box after each submit
   document.getElementById('search-box').reset()
}

function searchAmongstAll(country,position,topOrSub,data) {
     var isCountryFound=false;

    //search amongst all teams if there is one == searched team name
     for(var i=0;i<data.length;i++) {
         if(data[i].home_team_statistics.country==country) {
             whichPlayersToShow(topOrSub,position,data[i].home_team_statistics);
             isCountryFound=true;
             break;
         }  
     } if(!isCountryFound) { alert("Couldn't found given country on database, try again."); } 
}

//sort by position -> return sorted players 
function sortByPosition(unsorted,position) {
    var sorted=[];
    //if no position was selected -> show all players
   if(!position) {
    for(var j=0;j<unsorted.length;j++) {
        for(var i=0;i<unsorted[j].length;i++) {
             sorted.push(unsorted[j][i]);
         }
      }
     return sorted;
   }
   else if(position) {
       //two fors because if no substitute or top eleven was chosen
       //unsorted array would contain two arrays of players
       //one array for top eleven 
       //second for substitudes
       for(var j=0;j<unsorted.length;j++) {
          for(var i=0;i<unsorted[j].length;i++) {
              if(unsorted[j][i].position==position) {
               sorted.push(unsorted[j][i]);
               }
           }
        }
       return sorted;
   } 
}

//top eleven or substitutes
function whichPlayersToShow(topOrSub,position,element) {
    var players=[];

    //if top-eleven or substitutes werent selected
    if(!topOrSub) {
        players.push(element.starting_eleven);
        players.push(element.substitutes);
        //if team found -> get players, then break -> eliminate chance of saving same players twice or more
    }
    //if top eleven was selected
    else if(topOrSub=="topeleven") {
        players.push(element.starting_eleven);
        //if team found -> get players, then break -> eliminate chance of saving same players twice or more
    }
    //if substitutes were selected
    if(topOrSub=="substitute") {
        players.push(element.substitutes);
        //if team found -> get players, then break -> eliminate chance of saving same players twice or more
    }
    players = sortByPosition(players,position);
    showData(players);
}

function fillData(players) {
    //div container where result of search will appear
    var resultBox = document.getElementById("result-box");

    //create and append as much elements as players-array contains
    for(var j=0;j<players.length;j++) {
    var newElement = document.createElement("P");
    resultBox.appendChild(newElement);

    //then fill those elements with data
    resultBox.childNodes[j].textContent=players[j].name+" "+players[j].number;
    }
}

function playerConstructor(name,number) {
    this.name=name;
    this.number=number;
}

function showData(players) {
    var playersToShow=[];

        for(var i=0;i<players.length;i++) {
            var helper = new playerConstructor(players[i].name,players[i].shirt_number);
            playersToShow.push(helper);
        }
        
        //send array full of players(name,shirt number) that should be displayed
        fillData(playersToShow);
}



