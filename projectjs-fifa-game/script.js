function getData (url,callback) {
    var request = new XMLHttpRequest;
    request.open("GET",url);
    request.send();
    request.onload = () => {
        callback(JSON.parse(request.responseText));
    }
}

getData("https://worldcup.sfg.io/matches", (data) => {
    ShowGames.show(data);
});

