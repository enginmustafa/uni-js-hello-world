localHistory = {};

localHistory.history = [];

localHistory.searchConstructor = function (name,position,topOrSub) {
this.type="search";
this.name=name;
this.position=position;
this.topOrSub=topOrSub;
this.time=getCurrentTime();
}

localHistory.detailConstructor =function (element,detail) {
    this.type="detail";
    this.element=element;
    this.detail=detail;
    this.time=getCurrentTime();
}

function getCurrentTime() {
    return new Date().toLocaleString();
}
localHistory.saveHistory = function () {
    localStorage.setItem('history', JSON.stringify(localHistory.history));
}

function getHistory () {
    return JSON.parse(localStorage.getItem('history'));
}


localHistory.loadHistory = function() {
    var container = document.getElementById("history-container");
    var data=getHistory();

    for(var i=0; i<data.length;i++) {
        var newElement = document.createElement("P");
        container.appendChild(newElement);

        if(data[i].type=="search") {
            var positionString=" n/a ";
            if(data[i].position) {positionString=data[i].position;}
            var topOrSubString=" n/a ";
            if(data[i].topOrSub) {topOrSubString=data[i].topOrSub;}

        container.childNodes[i].textContent="/Search operation performed/  "
                                           +"Country: "+data[i].name
                                           +"   Position:"+ positionString
                                           +"   Playing in: "+ topOrSubString
                                           +"   Time: "+data[i].time;
        }

        else if (data[i].type=="detail") {
            switch(data[i].detail) {
                case"teamDetails" : {
                         container.childNodes[i].textContent="/Team Details about: -"
                         +data[i].element+"-  viewed/ "
                         +"   Time: "+data[i].time;
                         break;
                         }
                case"cityDetails" : {
                        container.childNodes[i].textContent="/City Details about: -"
                        +data[i].element+"-  viewed/ "
                        +"   Time: "+data[i].time;
                        break;
                        }
                case"gameDetails" : {
                        container.childNodes[i].textContent="/Game Details about match with id: -"
                        +data[i].element.value+"-  viewed/ "
                        +"   Time: "+data[i].time;
                        break;
                        }        
                }
            }   
    }
}