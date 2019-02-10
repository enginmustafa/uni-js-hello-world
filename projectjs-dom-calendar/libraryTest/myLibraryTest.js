//get element by id 
console.log("Show element found by library method.");
console.log(getElementById("p1"));

//create new element and append it to another
appendElementToAnother("p","p1");
console.log("\n Show appended new element as children of the parent.");
console.log(getSibling("p1","children"));

//edit id of an element
editElement("p1","id","para1");
console.log("\nSearch and show element by new id(after change).");
console.log(getElementById("para1"));

//delete element
deleteElement("para1");

//edit style
editStyle("p2","background-color","red");

//add multiply object-like styles
styles = {"background-color": "red",
"color": "blue"
}
addStyles("p3",styles);

//get previous sibling by id
console.log("\nPrevious sibling.");
console.log(getSibling("h1-container","previousSibling"));