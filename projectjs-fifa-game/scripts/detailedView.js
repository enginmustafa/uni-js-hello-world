//When venue is clicked
//show details about its weather
//before first click, details container is invisible
//after first click it becomes visible
//in each click performed it actualizes its information 

//When team is clicked
//find which group it belongs to
//find team in that group and get info about it
//show details about team


detailedView ={};

//get clicked city's fifa id
detailedView.cityClicked= function(element,detail,dataBase) {
    Ajax.getData(dataBase, (data) => {
        //if city was clicked
        if(detail=="cityDetails") {
            fifaId=element.value;
            var countryName=element.textContent;
            findExactCity(fifaId,countryName,data);
        }
        //if team was clicked
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
        }
  });   
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
    }    showTeamDetails(wins,draws,losses,group,games,points);
}

function showTeamDetails(w,d,l,gr,ga,p) {
    //to do
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