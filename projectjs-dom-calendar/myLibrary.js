var myLibrary = {

//pass object -> change html of it
set : function(elem,edit) {
        elem.innerHTML=edit;
}       , 
//get element by id
get : function(id) {
    return document.getElementById(id);   
},

//add new element to another existing, if insert position isnt given, queue it 
append : function (element1,element2,insertPosition) {
    var newElement = document.createElement(element1);
     var existingElement=this.get(element2);

    existingElement.insertBefore(newElement,existingElement.childNodes[insertPosition]);
},

//delete element by id
del : function (id) {
    var element = this.get(id);
    element.parentNode.removeChild(element);
},

//pass object, set id to it
setId : function(obj,id) {
        obj.setAttribute("id",id);
},

//edit element by given id, edit exact attribute(editType)
edit : function (id,editType,edit) {
    switch(editType) {
        case "id": {
                var element = this.get(id).setAttribute("id",edit);
                break;
                }
        case "name": {
                var element = this.get(id).setAttribute("name",edit);
                break;   
                }              
        case"class": {        
                var element = this.get(id).setAttribute("class",edit);
                break;
                } 
        case "data": {
                var element = this.get(id).setAttribute("data",edit);
                break;
                }
        case "text":{
                var element=this.get(id).textContent=edit;
                break;
        }        
        case "html": {
                this.get(id).innerHTML=edit;
                break;

        }
}
},

//function to edit style of an exact type
editStyle : function (id,styleType,style) {
        this.get(id).style[styleType]=style;
},

//function to add styles from object element
addStyles :function (id,styles) {
        var elem = this.get(id);
        for (i in styles) {
                elem.style[i]=styles[i];
        }
},

//get elements sibling by given id and the sibling type that is wanted to be returned
getSibling : function (id,sibling) {
        switch(sibling) {
                case "parent": {
                        return this.get(id).parentNode;
                }
                case "nextSibling":{
                        return this.get(id).nextElementSibling;
                }
                case "previousSibling": {
                        return this.get(id).previousElementSibling;
                }
                case "children": {
                        var children=[];
                        for(var i=0;i<this.get(id).childNodes.length;i++) {
                        children.push(this.get(id).childNodes[i]);
                        }
                        return children;
                }
        }
},

//event model constructor 
event : function (name,day,month,year,time) {
        this.name=name;
        this.day=day;
        this.month=month;
        this.year=year;
        this.time=time;
}

}