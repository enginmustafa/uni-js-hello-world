var ShowGames = {};

ShowGames.gameContainer=document.getElementById("matches");

//create and append containers
ShowGames.appendContainers = function(data,type) {
    for(var i=0;i<data.length*9;i++) { 
        var newNode = document.createElement(type);  
        this.gameContainer.appendChild(newNode); 
        }
}

//fill containers with data

//Data visualized as shown below: 
//Country
//Stadium 
//(Team A) (Goals) (On-target-shoots) - (Goals) (On-target-shoots) (Team B)

ShowGames.fillData = function(data) {
    var j=0;
    element = ShowGames.gameContainer.childNodes;
    for(var i=0;i<data.length;i++) {
    element[j].className="country-name";
    element[j].textContent=data[i].venue;
    //for further use(details-city)
    element[j].value=data[i].fifa_id;
    element[j].style.cursor="pointer";
    element[j].onclick = function() {detailedView.cityClicked(this,"cityDetails","http://worldcup.sfg.io/matches")};
    j++;
    element[j].className="stadium-name"; 
    element[j].textContent=data[i].location;
    j++;
    element[j].className="teams"; 
    element[j].textContent=data[i].home_team.country;
    //on click show details about clicked team
    element[j].onclick = function() {detailedView.cityClicked(this,"teamDetails","http://worldcup.sfg.io/teams/group_results")};
    j++;
    element[j].className="goals";
    element[j].textContent=data[i].home_team.goals;
    j++;
    element[j].className="on-target";
    element[j].textContent="("+data[i].home_team_statistics.on_target+")";
    j++;
    element[j].textContent="-";
    j++;
    element[j].className="goals";
    element[j].textContent=data[i].away_team.goals;
    j++;
    element[j].className="on-target";
    element[j].textContent="("+data[i].away_team_statistics.on_target+")";
    j++;
    element[j].className="teams";
    element[j].textContent=data[i].away_team.country;
    //on click show details about clicked team
    element[j].onclick = function() {detailedView.cityClicked(this,"teamDetails","http://worldcup.sfg.io/teams/group_results")};
    j++;
    }
}

ShowGames.show = function(data) {
    this.appendContainers(data,"SPAN");
    this.fillData(data);    
}