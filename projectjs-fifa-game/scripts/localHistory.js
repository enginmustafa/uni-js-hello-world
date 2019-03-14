localHistory = {};


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

function historyEventConstructor() {
this.type="history";
this.time=getCurrentTime();
}

//save event when history-page is viewved
localHistory.saveEvent = function() {
    var event = new historyEventConstructor();
    localHistory.saveHistory(event);
}

function getCurrentTime() {
    return new Date().toLocaleString();
}
localHistory.counter = 0;

localHistory.saveHistory = function (data) {
    localStorage.setItem('history' + localHistory.counter, JSON.stringify(data));
    localHistory.counter++;
}

function getHistory (n) {
    return JSON.parse(localStorage.getItem('history'+n));
}


localHistory.loadHistory = function() {
    var container = document.getElementById("history-container");

    for(var i=0; i<localStorage.length-1;i++) {
        var data=getHistory(i);

        var newElement = document.createElement("P");
        container.appendChild(newElement);

        if(data.type=="search") {
            var positionString=" n/a ";
            if(data.position) {positionString=data.position;}
            var topOrSubString=" n/a ";
            if(data.topOrSub) {topOrSubString=data.topOrSub;}

        container.childNodes[i].textContent="/Search operation performed/  "
                                           +"Country: "+data.name
                                           +"   Position:"+ positionString
                                           +"   Playing in: "+ topOrSubString
                                           +"   Time: "+data.time;
        }

        else if (data.type=="detail") {
            switch(data.detail) {
                case"teamDetails" : {
                         container.childNodes[i].textContent="/Team Details about: -"
                         +data.element+"-  viewed/ "
                         +"   Time: "+data.time;
                         break;
                         }
                case"cityDetails" : {
                        container.childNodes[i].textContent="/City Details about: -"
                        +data.element+"-  viewed/ "
                        +"   Time: "+data.time;
                        break;
                        }
                case"gameDetails" : {
                        container.childNodes[i].textContent="/Game Details about match with id: -"
                        +data.element.value+"-  viewed/ "
                        +"   Time: "+data.time;
                        break;
                        }        
                }
            }
            else if(data.type=="history") {
                container.childNodes[i].textContent="/History of events viewed/  "
                                           +"Time: "+data.time;
                                          
            }   
    }
}