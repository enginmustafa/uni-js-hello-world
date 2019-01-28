console.log("Event organizer!\n\n");

//constructor for clients
function Person(fname,sname,sex,age) {
    this.fname=fname;
    this.sname=sname;
    this.sex=sex;
    this.age=age;
}

//object constructor for event
function Event(id,name,onlyAdults,Clients,dateOfEvent) {
    this.id=id,
    this.name=name,
    this.onlyAdults=onlyAdults 
    this.Clients=Clients;
    this.dateOfEvent=dateOfEvent
};

//array to store events
var Events=[];


//function to add events
function addEvent(name,onlyAdults,dateOfEvent) {

//check if event organizer is open      
if(organizerEventsOpen) console.log("Event organizer is currently closed for events.");

//if its open, do the following
else{
     //if name isn't given, terminate operation
     if(name==undefined) {
         console.log("Invalid operation. (Name of the event is required)"); 
         return;}
     else {
        var newEvent = new Event(getId(),name,onlyAdults,[],dateOfEvent);
        pushEvent(newEvent); }
    }
}

//add events
addEvent("Grand opening of new Club", true," 01/03/2018 ");
addEvent("Casino Royale",true," 01/03/2019 ");
addEvent("Student party",false,);
addEvent("Bowling club opening");
addEvent();

//function to get unique id
function getId() {
    return (Events.length);
}

//function to push Event to array of Events
function pushEvent(newEvent) {
    Events.push(newEvent);
}

//function to show an event in particular way, extracted as new method for further use
function prettyVisualization(i) {
    console.log(Events[i].name+Events[i].dateOfEvent+" (Minors are "+(Events[i].onlyAdults ? "not allowed.)" : "allowed.)"));
}

//function to show events
function showEvents() {
    for (var i=0;i<Events.length;i++) {
        //if no date of event was given, show a message instead of date
        if(Events[i].dateOfEvent==undefined) Events[i].dateOfEvent=" -n/a- ";
       prettyVisualization(i);
    } console.log("\n");
}

//show events before termination
showEvents();

//function to delete events by id
function deleteEvent (n) {
    var index=null;
   for(var i=0;i<Events.length;i++) {
       if(Events[i].id==n); index=n; 
   } 
   if(index!=null) Events.splice(index,1);
   console.log("\nEvent with id= "+n+" succesfully deleted.")
}

//delete event with id=1
deleteEvent(1);

//show events after change
showEvents();

//function to edit event by id
function editEvent(n,name,onlyAdults) {
    if(Events.length>=n) {
        if(name==undefined) {
        console.log("Name of the event is required.");
        }
        else{
        Events[n].name=name;
        Events[n].onlyAdults=onlyAdults; 
        console.log("Changes applied successfully.");
          }
    }
    else {
        console.log("No event with id: "+n+"is registered.");
    }
}

//edit event, without name = no changes, error
editEvent(1);
showEvents();

//edit event, with name but without access provided => edited event (new name, access by default)
editEvent(1,"New era Club anniversary");
showEvents();

var p1=new Person ("Engin","Mustafa","M",20);
var p2=new Person("Mustafa","Engin","M",15);
var p3=new Person ("Ivana","Ivanova","F",19);
var p4=new Person("Ivan","Georgiev","M",19);

//add person for an event using id
function addClientToEvent (n,Person) {
    //check whether event organizer is open
    if(organizerClientsOpen) console.log("Event organizer is currently closed for clients.");
    else {
         //check if client is allowed at the party
        if(Events[n].onlyAdults && Person.age<18) {
        console.log("This client is not allowed at "+Events[n].name);
        }

         //if everything is fine => add the client 
        else {
        Events[n].Clients.push(Person);
        }
    }
}

//client is minor => not allowed, message alert(terminated operation)
addClientToEvent(0,p2);

//client is adult => allowed(registered to clients)
addClientToEvent(0,p1);
addClientToEvent(0,p3);


//function to show clients attending an event by id
function showClients(n,sex) {

    //if sex wasnt input, show all 
    var flag;
    if(sex==undefined) flag=true; //if filter option wasn't selected, turn flag to true, show all attendants
    console.log("\n");
       if(Events[n].Clients.length==0) console.log("There are no clients attending this event.");
       else {
           console.log("Clients attending "+Events[n].name);
           for(var i=0;i<Events[n].Clients.length;i++) {
                if(Events[n].Clients[i].sex==sex || flag) {
                    console.log(Events[n].Clients[i].fname
                    +" "+Events[n].Clients[i].sname
                    +" "+Events[n].Clients[i].sex
                    +" "+Events[n].Clients[i].age);
                    }
                else if(Events[n].Clients[i].sex==sex || flag) {
                    console.log(Events[n].Clients[i].fname
                        +" "+Events[n].Clients[i].sname
                        +" "+Events[n].Clients[i].sex
                        +" "+Events[n].Clients[i].age);
                }    
                }
           }
}

showClients(0); //no filter option added, show clients from all genders

showClients(0,"M"); // male gender chosen, show only male attendats

//show particular client
console.log(Events[0].Clients[0])

//delete that client 
delete Events[0].Clients[0];

//undefined
console.log(Events[0].Clients[0])

console.log("\n..............*Main task* done!...................\n")

//variables to store whether system is open to addition of new events or clients
var organizerEventsOpen=false;
var organizerClientsOpen=false;

//function to open organizer for events
function openEventsOrganizer() {
    organizerEventsOpen=false;
}

//function to close organizer for events
function closeEventsOrganizer() {
    organizerEventsOpen=true;
}

//function to open organizer for clients
function openClientsOrganizer() {
    organizerClientsOpen=false;
}

//function to close organizer for clients
function closeClientsOrganizer() {
    organizerClientsOpen=true;
}

//close event organizer for clients
closeClientsOrganizer();
//try to add a client => error message
addClientToEvent(1,p4);
showClients(1);

//open it, then add => successful operation
openClientsOrganizer();
addClientToEvent(1,p4);
showClients(1);

//function to show the event with most clients registered
function showEventWithMostClients() {
    //If there are no events registered to compare
    if(!Events.length){console.log("No events are currently registered.")}
    else {
        //helper for comparing lenght, eventsName for saving the name of the event that has the most clients
        var helper=Events[0].Clients.length;
        var eventsName=Events[0].name;
        for(var i=1;i<Events.length;i++) {
             if(Events[i].Clients.length>helper) {
             eventsName=Events[i].name;
                }
            } console.log("Event with most clients is: "+eventsName);
        }      
}

showEventWithMostClients();

//visualize all events suitable for minors
console.log("\nEvents suitable for minors only:")
for(var i=0;i<Events.length;i++) {
    if(!Events[i].onlyAdults) {
        console.log(Events[i].name);
    }
}

//show all events grouped by *adults/minors#
console.log("\nEvents groupped by age range:")
for(var i=0;i<Events.length;i++) {
    if(Events[i].onlyAdults) {
        console.log("* "+Events[i].name);
    }
    else {
        console.log("# "+Events[i].name);
    }
}

//function to show events by given age range
function filterEventsByAgeRange(flag) {
    console.log("\n Events that only "+flag+ " are allowed:")
    if(flag=="adults") flag=true;
    else flag=false;
    for(var i=0;i<Events.length;i++) {
        if(Events[i].onlyAdults==flag || (Events[i].onlyAdults==undefined && !flag)) {
            prettyVisualization(i);
        }
    }
}

filterEventsByAgeRange("minors");

console.log("\n...........*Additional tasks - Part 1* done!.............\n")
















 












