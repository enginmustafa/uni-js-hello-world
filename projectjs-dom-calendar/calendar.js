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
function appendContainerForDays(days) {
    removeChildren("days-id");
    for(var i=0;i<days;i++) {
    myLibrary.append("LI","days-id");
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
function assingNumbers(arr) {
    for(var i=0;i<arr.length;i++) {
    var element = myLibrary.getSibling("days-id","children")[i];
    myLibrary.set(element,days[i]); 

    //if li's html == current day, currentMonth variable== current month and currentYear== current year
    //make Today's number pretty on calendar
    if(element.innerHTML==currentDay && currentMonth==d.getMonth() && currentYear==d.getFullYear()){
       myLibrary.setId(myLibrary.getSibling("days-id","children")[i],"current-day");
       myLibrary.addStyles("current-day",{"padding-top":"0.5%","font-size":"160%",
                                          "background-color":"red","color":"#ffe6e6", 
                                          "border-color":"blue"})
    }
    }    
}


appendContainerForDays(daysInMonth);
storeDays(daysInMonth);
assingNumbers(days);

//function for furthery use to prevent repeating
function navigationHelper(currentMonth,currentYear,daysInMonth,days) {
    myLibrary.edit("month","html",getMonthsName(currentMonth));
    daysInMonth=getDaysInMonth(currentYear,currentMonth);
    appendContainerForDays(daysInMonth);
    storeDays(daysInMonth);
    assingNumbers(days);
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

