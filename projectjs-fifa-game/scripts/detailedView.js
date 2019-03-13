//When venue is clicked
//show details about its weather
//before first click, details container is invisible
//after first click it becomes visible
//in each click performed it actualizes its information 

detailedView ={};

//get clicked city's fifa id
detailedView.cityClicked= function(element) {
    fifaId=element.value;
    var countryName=element.textContent;
    findExactCity(fifaId,countryName);
}

//loop through all venues and find exact one
//search by fifa_id because there are multiple matches played in one place
function findExactCity(id,country) {
    var countryName=country;
    var humidity;
    var temperature;
    var windSpeed;
    var description;

  Ajax.getData("http://worldcup.sfg.io/matches", (data) => {
  for(var i=0;i<data.length;i++) {
      if(data[i].fifa_id==id) {
          humidity=data[i].weather.humidity;
          temperature=data[i].weather.temp_celsius;
          windSpeed=data[i].weather.wind_speed;
          description=data[i].weather.description;
      }
  } showCityDetails(humidity,temperature,windSpeed,description,countryName);
});
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