//get element by id 
console.log("Show element found by library method.");
console.log(myLibrary.get("p1"));

//create new element and append it to another
myLibrary.append("p","p1");
console.log("\n Show appended new element as children of the parent.");
console.log(myLibrary.getSibling("p1","children"));

//edit id of an element
myLibrary.edit("p1","id","para1");
console.log("\nSearch and show element by new id(after change).");
console.log(myLibrary.get("para1"));

//delete element
myLibrary.del("para1");

//edit style
myLibrary.editStyle("p2","background-color","red");

//add multiply object-like styles
styles = {"background-color": "red",
"color": "blue"
}
myLibrary.addStyles("p3",styles);

//get previous sibling by id
console.log("\nPrevious sibling.");
console.log(myLibrary.getSibling("h1-container","previousSibling"));

//add event by library function
console.log("\nShow new event:")
var e1 = new myLibrary.event("New Event",1,1,2018,"20:41");
console.log(e1.name+"|Day:"+e1.day);