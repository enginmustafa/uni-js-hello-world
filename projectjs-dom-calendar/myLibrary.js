//get element by id
function getElementById(id) {
    return document.getElementById(id);   
}

//add new element to another existing, if insert position isnt given, queue it 
function appendElementToAnother(element1,element2,insertPosition) {
    var newElement = document.createElement(element1);
    var existingElement=getElementById(element2);

    existingElement.insertBefore(newElement,existingElement.childNodes[insertPosition]);
}

//delete element by id
function deleteElement(id) {
    var element = getElementById(id);
    element.parentNode.removeChild(element);
}

//edit element by given id, edit exact attribute(editType)
function editElement(id,editType,edit) {
    switch(editType) {
        case "id": {
                var element = getElementById(id).setAttribute("id",edit);
                break;
                }
        case "name": {
                var element = getElementById(id).setAttribute("name",edit);
                break;   
                }              
        case"class": {        
                var element = getElementById(id).setAttribute("class",edit);
                break;
                } 
        case "data": {
                var element = getElementById(id).setAttribute("data",edit);
                break;
                }
        case "text":{
                var element=getElementById(id).textContent=edit;
                break;
        }        
        case "html": {
                var element=getElementById(id).innerHTML=edit;
                break;

        }
}
}

//function to edit style of an exact type
function editStyle(id,styleType,style) {
        getElementById(id).style[styleType]=style;
}

//function to add styles from object element
function addStyles(id,styles) {
        var elem = getElementById(id);
        for (i in styles) {
                elem.style[i]=styles[i];
        }
}

//get elements sibling by given id and the sibling type that is wanted to be returned
function getSibling(id,sibling) {
        switch(sibling) {
                case "parent": {
                        return getElementById(id).parentNode;
                }
                case "nextSibling":{
                        return getElementById(id).nextElementSibling;
                }
                case "previousSibling": {
                        return getElementById(id).previousElementSibling;
                }
                case "children": {
                        var children=[];
                        for(var i=0;i<getElementById(id).childNodes.length;i++) {
                        children.push(getElementById(id).childNodes[i]);
                        }
                        return children;
                }
        }
}

