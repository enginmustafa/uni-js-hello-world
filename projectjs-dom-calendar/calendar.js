//function to get number of days of a particular month in year
function getDaysInMonth(year,month) {
    return new Date(year,month+1,0).getDate();
}

var d= new Date();
var currentYear= d.getFullYear();
currentDay= d.getDate();

//function to get current month
function getCurrentMonth(i) {
    var months = ['January', 'February', 'March', 'April', 
                  'May', 'June', 'July', 'August', 'September',
                  'October', 'November', 'December'];
    return months[i];                  
}
var currentMonth=d.getMonth();

//function to get months name by its number
function getMonthsName(month) {
return getCurrentMonth(month);
}

myLibrary.edit("year","html",currentYear);
myLibrary.edit("month","html",getMonthsName(currentMonth));

var daysInMonth = getDaysInMonth(currentYear,currentMonth);

//clear childs of an element
function removeChildren(id) {
var myNode = myLibrary.get(id);
myNode.innerHTML = '';
}

//append li for each day of particular month
function appendContainerForDays(days,id) {
    removeChildren(id);
    for(var i=0;i<days;i++) {
    myLibrary.append("id","LI",id);
    }
}
var days = [];
//store each day to array
function storeDays(arr){
    var x=1;
    for(var i =0;i<arr;i++) {
    days[i]= x;
    x++;
    }
}

//assign each day its number
function assingNumbers(arr,id) {
    for(var i=0;i<arr.length;i++) {
    var element = myLibrary.getSibling(id,"children")[i];
    myLibrary.set(element,days[i]); 

    //if li's html == current day, currentMonth variable== current month and currentYear== current year
    //make Today's number pretty on calendar
    if(element.innerHTML==currentDay && currentMonth==d.getMonth() && currentYear==d.getFullYear()){
       myLibrary.setId(myLibrary.getSibling(id,"children")[i],"current-day");
       myLibrary.addStyles("current-day",{"padding-top":"0.5%","font-size":"160%",
                                          "background-color":"red","color":"#ffe6e6", 
                                          "border-color":"blue"})
    }
    }    
}


appendContainerForDays(daysInMonth,"days-id");
storeDays(daysInMonth);
assingNumbers(days,"days-id");

//function for further use to prevent repeating
function navigationHelper(currentMonth,currentYear,daysInMonth,days) {
    myLibrary.edit("month","html",getMonthsName(currentMonth));
    daysInMonth=getDaysInMonth(currentYear,currentMonth);
    appendContainerForDays(daysInMonth,"days-id");
    storeDays(daysInMonth);
    assingNumbers(days,"days-id");
}

//go to next month
function nextMonth() {        
days=[];

//loop for next year
if(currentMonth==11) {
    currentMonth=-1;
    myLibrary.edit("year","html",++currentYear);
}
currentMonth++;
navigationHelper(currentMonth,currentYear,daysInMonth,days);
}

//go to previous month
function previousMonth() {
days=[];

//loop for previous year
if(currentMonth==0) {
    currentMonth=12;
    myLibrary.edit("year","html",--currentYear);
}
--currentMonth;
navigationHelper(currentMonth,currentYear,daysInMonth,days);
}

//go to next year
function nextYear() {
    myLibrary.edit("year","html",++currentYear);
    days=[];
    navigationHelper(currentMonth,currentYear,daysInMonth,days);
}


//go to previous year
function previousYear() {
    myLibrary.edit("year","html",--currentYear);
    days=[];
    navigationHelper(currentMonth,currentYear,daysInMonth,days);
}

//date picker function
function pickDate() {
    var day = myLibrary.get("picker-day").value;
    var month = myLibrary.get("picker-month").value;

    //if day was not given => pass month variable to pickMonth();
    if(day=="") {pickMonth(month);}
    else {
        if(month=>1 && month <=12) {
         var daysLength=getDaysInMonth(currentYear,month);
            if(day>=1 && day <=(daysLength)) {
                myLibrary.edit("month-datepicker","html",getMonthsName(month-1));
                daysInMonth=getDaysInMonth(currentYear,month-1);
                appendContainerForDays(daysInMonth,"days-datepicker-id");
                storeDays(daysInMonth);
                days = datePickerChangeDay(days,day);
                assingNumbers(days,"days-datepicker-id");
                
            }
        else {alert("This day does not belong to specified month.");}
        } 
    else alert("Invalid month number.");
        }
}

//sub date picker function activated if only month is given
function pickMonth (month) {
    if(month>=1 && month <=12) {
        var daysLength=getDaysInMonth(currentYear,month-1);
            days=[];
            myLibrary.edit("month-datepicker","html",getMonthsName(month-1));
                daysInMonth=getDaysInMonth(currentYear,month-1);
                appendContainerForDays(daysInMonth,"days-datepicker-id");
                storeDays(daysInMonth);
                assingNumbers(days,"days-datepicker-id");    
    }
    else alert("Invalid month number.");
}

//when attempt is given to input -> show datepicker
function datePickerOnFocus () {
    myLibrary.get("datepicker").style.display="";
}

//when focus is lost(click on any other element than the input boxes) -> hide datepicker
function datePickerOnBlur () {
    myLibrary.get("datepicker").style.display="none";
}

//attach a * to searched day
function datePickerChangeDay (arr,target) {
   for(var i=0;i<arr.length;i++) {
    if(arr[i]==target) {

        arr[i]+="*";
    } 
   }return arr;
}

//function to highlight the next weekdays

function weekDaysPrettyVisualization() {

    //this method returns number (0-6), 0=Sunday 6=Saturday
    var thisDay = new Date().getDay();
    var saturday,sunday;

    //for further id giving
    var dayIds=["saturday","sunday"];
    switch(thisDay) {
        //if thisDay == 0(Sunday) -> Next saturday is currentDay + 6 days away; Sunday is equal to Saturday-1
        case 0:
            saturday=currentDay+6;
            sunday=saturday+1;
            styleWeekdays(saturday-1,dayIds[0]);
            styleWeekdays(sunday-1,dayIds[1]);
            break;
        case 1:
            saturday=currentDay+5;
            sunday=saturday+1;
            styleWeekdays(saturday-1,dayIds[0]);
            styleWeekdays(sunday-1,dayIds[1]);
            break;
        case 2:
            saturday=currentDay+4;
            sunday=saturday+1;
            styleWeekdays(saturday-1,dayIds[0]);
            styleWeekdays(sunday-1,dayIds[1]);
            break;
        case 3:
            saturday=currentDay+3;
            sunday=saturday+1;
            styleWeekdays(saturday-1,dayIds[0]);
            styleWeekdays(sunday-1,dayIds[1]);
            break;
        case 4:
            saturday=currentDay+2;
            sunday=saturday+1;
            styleWeekdays(saturday-1,dayIds[0]);
            styleWeekdays(sunday-1,dayIds[1]);
            break;
        case 5:
            saturday=currentDay+1;
            sunday=saturday+1;
            styleWeekdays(saturday-1,dayIds[0]);
            styleWeekdays(sunday-1,dayIds[1]);
            break;

        //If current day is saturday, make pretty only sunday    
        case 6:
            saturday=currentDay;
            sunday=saturday+1;
            styleWeekdays(sunday-1,dayIds[1]);
            break;
    }
}

//style weekdays
function styleWeekdays(i,dayId) {
            myLibrary.setId(myLibrary.getSibling("days-id","children")[i],dayId);
            myLibrary.addStyles(dayId,{"background-color":"#FF00FF","color":"#ffe6e6"})
    
}

//unstyle weekdays
function weekDaysUglyVisualization() {
    myLibrary.addStyles("saturday",{"background-color":"","color":"black"})
    myLibrary.addStyles("sunday",{"background-color":"","color":"black"})
}

//position the buttons
myLibrary.addStyles("week-days-visualize",{"position":"absolute","top":"0"});
myLibrary.addStyles("week-days-unvisualize",{"position":"absolute","top":"0","left":"115px"});
//set onclick event to button by id (when button is pressed, make weekdays pretty)
myLibrary.set(myLibrary.get("week-days-visualize"),"weekDaysPrettyVisualization();",1);
//set onclick event to button by id (when button is pressed, go back to normal visualization)
myLibrary.set(myLibrary.get("week-days-unvisualize"),"weekDaysUglyVisualization();",1);


//EVENTS TASK 
/*
//collection to store events
var events=[];

//create some events
var e1 = new myLibrary.event("Gym",14,2,2019,"17:30");
var e2 = new myLibrary.event("Kickboxing",15,2,2019,"19:30");
var e3 = new myLibrary.event("JS course",1,2,2019,"12:45");
var e4 = new myLibrary.event("JS in depth course",1,2,2019,"08:45");
events.push(e1);
events.push(e2);
events.push(e3);
events.push(e4);

//set classname to all days that has events
for(var i=0;i<events.length;i++) {
   if(events[i].month == (currentMonth+1) && events[i].year == currentYear) {
           for(var x=0;x<days.length;x++) {
           if(events[i].day==days[x]) {
            myLibrary.setId(myLibrary.getSibling("days-id","children")[x],"got-events",1);
            //myLibrary.setId(myLibrary.getSibling("days-id","children"))
           }
       }
   }
}


var clickedDay;
//get all days with events 
var daysWithEvents = myLibrary.getS("got-events");
for(var i=0;i<daysWithEvents.length;i++) {
    var el = document.createElement("SPAN");
    daysWithEvents[i].insertBefore(el,daysWithEvents[i].childNodes[0]);
    myLibrary.set(daysWithEvents[i],"*");
    myLibrary.set(daysWithEvents[i].childNodes[0],"eventShow();",1);
    var spanId=daysWithEvents[i].childNodes[1].nodeValue;
    myLibrary.setId(daysWithEvents[i].childNodes[0],spanId);
}

console.log(myLibrary.get("14*"));

function eventShow() {
    //CLICKED DAY SHOULD GET THE ID OF SPAN THAT INVOKED HIM
    clickedDay=0;
    myLibrary.edit("clicked-date","html",events[clickedDay].day) 
    var event =[];
    for(var i=0;i<events.length;i++) {
        if(events[clickedDay].day==events[i].day) {
        event.push(events[clickedDay].name+" "+events[clickedDay].time);
        } myLibrary.edit("clicked-date-event","html",event);
    } 
}

*/







