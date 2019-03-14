//When venue is clicked
//show details about its weather
//before first click, details container is invisible
//after first click it becomes visible
//in each click performed it actualizes its information 

//When team is clicked
//find which group it belongs to
//find team in that group and get info about it
//show details about team

//When (-) between two teams is clicked
//show details about goals -> player and minutes
//before click container is hidden
//after first, it appears and with each click performed, it actualizes its information appropriately


detailedView ={};

//get clicked city's fifa id
detailedView.detailClicked= function(element,detail,dataBase) {

    //variable for history storage
    var detailElement;

    Ajax.getData(dataBase, (data) => {
        
        //When venue is clicked
         //show details about its weather
         //before first click, details container is invisible
         //after first click it becomes visible
         //in each click performed it actualizes its information 
        if(detail=="cityDetails") {
            fifaId=element.value;
            var countryName=element.textContent;
            findExactCity(fifaId,countryName,data);

            detailElement = new localHistory.detailConstructor(element.textContent,detail); 
        }

        //When team is clicked
        //find which group it belongs to
        //find team in that group and get info about it
        //show details about team
        else if(detail=="teamDetails") {
            //store group of the team that is clicked for further loop
            var groupOfTargetTeam;

            //get data about team groups->find which group is clicked team in
            Ajax.getData("http://worldcup.sfg.io/teams/", (groups) => {
                  for(var i=0;i<groups.length;i++) {
                      if(groups[i].country==element.textContent) {
                          groupOfTargetTeam=groups[i].group_id;
                      }
                  } 
                  //when group of team is found 
                  findExactGroup(groupOfTargetTeam,data,element);
            });
            detailElement = new localHistory.detailConstructor(element.textContent,detail);  
        }

        //When (-) between two teams is clicked
        //show details about goals -> player and minutes
        //before click container is hidden
        //after first, it appears and with each click performed, it actualizes its information appropriately
        else if(detail=="gameDetails") {
            gameId=element.value;
            var match=null;

            for(var i=0;i<data.length;i++) {
                if(gameId==data[i].fifa_id) {
                   match=data[i];
                }
            } showGoals(match); detailElement = new localHistory.detailConstructor(element,detail); 
         }  storeData(detailElement);  
  });   
}

//store data about event
function storeData (element) {
    localHistory.saveHistory(element);
}

function goalsConstructor(player,time) {
this.player=player;
this.time=time;
}

function showGoals(match) {
    document.getElementsByClassName("goal-details")[0].style="display:inline";
    var homeTeamGoals = [];
    var awayTeamGoals =[];
    var homeTeamContainer=document.getElementById("home-team-goal-details");
    var awayTeamContainer=document.getElementById("away-team-goal-details");
    homeTeamContainer.innerHTML="";
    awayTeamContainer.innerHTML="";

    //get goals, send both arrays -> if goal-own, save goal to other team
    getGoals(match.home_team_events,homeTeamGoals,awayTeamGoals);
    getGoals(match.away_team_events,awayTeamGoals,homeTeamGoals);

    if(homeTeamGoals.length>0) {
       fillGoals(homeTeamGoals,homeTeamContainer);
    }
    if(awayTeamGoals.length>0) {
        fillGoals(awayTeamGoals,awayTeamContainer);
    }


} 

function fillGoals(goals,container) { 

    //create and append as much elements as array contains
    for(var j=0;j<goals.length;j++) {
        var newElement = document.createElement("P");
        container.appendChild(newElement);
    
        //then fill those elements with data
        container.childNodes[j].textContent=goals[j].player+" "+goals[j].time;
        }
}

function getGoals(match,team,otherTeam) {
    var newEvent;
    for(var i=0;i<match.length;i++) {
        if(match[i].type_of_event=="goal" || 
        match[i].type_of_event=="goal-penalty") 
        {
            newEvent = new goalsConstructor(match[i].player,match[i].time);
            team.push(newEvent);
        }
        else  if(match[i].type_of_event=="goal-own"){
            newEvent = new goalsConstructor(match[i].player,match[i].time);
            otherTeam.push(newEvent);
        } 
    } 
}

//loop through groups and find group of team
function findExactGroup(groupOfTargetTeam,data,teamName) {
    var country=teamName.textContent;
    for(var i=0;i<data.length;i++) {
        if(groupOfTargetTeam==data[i].id) {
            findExactTeam(data[i],country);
        }
    }
}

//loop through teams of group and find exact team
function findExactTeam(teams,clickedCountry) {
  var wins;
  var draws;
  var losses;
  var group;
  var games;
  var points;

    for(var i=0;i<teams.ordered_teams.length;i++) {
        if(clickedCountry==teams.ordered_teams[i].country) {
            //get clicked teams statistics
            wins=teams.ordered_teams[i].wins;
            draws=teams.ordered_teams[i].draws;
            losses=teams.ordered_teams[i].losses;
            group=teams.ordered_teams[i].group_letter;
            games=teams.ordered_teams[i].games_played;
            points=teams.ordered_teams[i].points;
        }
    }    showTeamDetails(wins,draws,losses,group,games,points,clickedCountry);
}

function showTeamDetails(w,d,l,gr,ga,p,c) {
    //to do
    document.getElementsByClassName("team-details")[0].style="display:inline;"

    setInnerHtml("team-name-detail",c);
    setInnerHtml("team-group-detail",gr);
    setInnerHtml("team-points-detail",p);
    setInnerHtml("team-wins-detail",w);
    setInnerHtml("team-draws-detail",d);
    setInnerHtml("team-losses-detail",l);
    setInnerHtml("team-games-detail",ga);

}

//loop through all venues and find exact one
//search by fifa_id because there are multiple matches played in one place
function findExactCity(id,country,data) {
    var countryName=country;
    var humidity;
    var temperature;
    var windSpeed;
    var description;
  
  for(var i=0;i<data.length;i++) {
      if(data[i].fifa_id==id) {
          humidity=data[i].weather.humidity;
          temperature=data[i].weather.temp_celsius;
          windSpeed=data[i].weather.wind_speed;
          description=data[i].weather.description;
      }
  } showCityDetails(humidity,temperature,windSpeed,description,countryName);
}

//update html
function showCityDetails(hum,temp,wind,desc,name) {

    document.getElementsByClassName("city-details")[0].style="display:inline";

  setInnerHtml("city-name-detail",name);
  setInnerHtml("weather-descr-detail",desc);
  setInnerHtml("weather-wind-detail",wind);
  setInnerHtml("weather-temp-detail",temp);
  setInnerHtml("weather-hum-detail",hum);
}

//helper method
function setInnerHtml(id,html) {
    document.getElementById(id).innerHTML=html;
}