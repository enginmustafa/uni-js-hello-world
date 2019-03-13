Ajax={};

Ajax.getData = function (url,callback) {
    var request = new XMLHttpRequest;
    request.open("GET",url);
    request.send();
    request.onload = () => {
        callback(JSON.parse(request.responseText));
    }
}

Ajax.getData("http://worldcup.sfg.io/matches", (data) => {
    ShowGames.show(data);
});

function showResult() {
    Ajax.getData("http://worldcup.sfg.io/matches", (data) => {
    searchPlayers.submitSearch(data);
   });
}


//on click to search image -> show or hide search box
var searchFlag=true;
function searchClicked() {
    if(searchFlag) {
    document.getElementById("search-box").style="display:inline";
    searchFlag=false;
    }
    else {
        document.getElementById("search-box").style="display:none";
        searchFlag=true;

    }
}

