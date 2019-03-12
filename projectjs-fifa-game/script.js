function getData (url,callback) {
    var request = new XMLHttpRequest;
    request.open("GET",url);
    request.send();
    request.onload = () => {
        callback(JSON.parse(request.responseText));
    }
}

getData("http://worldcup.sfg.io/matches", (data) => {
    ShowGames.show(data);
});

function showResult() {
    getData("http://worldcup.sfg.io/matches", (data) => {
    searchPlayers.submitSearch(data);
   });
}
