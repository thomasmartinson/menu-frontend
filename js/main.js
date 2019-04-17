// main JS object that stores data
var menu = {MenuSection:[]};
// color of highlighted gridboxes
var highlightColor = "aqua";
// index of the section that is highlighted on the page
var currSection = null;

// adds to the section list in the DOM and in the data
function addSection() {
    // get the name from the input
    var sectionName = document.getElementById("section-name").value;
    // do nothing if the field is left blank
    if (sectionName == null || sectionName == "") {
        return;
    }
    // index in the menu object
    var index = menu.MenuSection.length;
    // reset the form
    document.getElementById("sectionForm").reset();
    $("#addSectionModal").modal("hide");
    // make another section element and append it to the section list
    var newSection = newBox(sectionName);
    newSection.setAttribute("onclick", "clickSection(\""+index+"\")");
    newSection.id = "section" + index;
    document.getElementById("sectionList").appendChild(newSection);
    // add a section to the data
    menu.MenuSection.push({ Items:[], name:sectionName });
}

// prompts the user for an item, but only if a section is selected
function promptItem() {
    // corner cases: no sections created or selected
    var sections = document.getElementById("sectionList").getElementsByClassName("row");
    if (sections.length == 0) {
        // TODO show a modal
        alert("You must add a menu section before you can add items.");
    }
    else if (currSection == null) {
        // TODO show a modal
        alert("You must select a section before you can add items.");
    }
    else {
        // display the prompt to add and item
        $("#addItemModal").modal("show");
    }
}

// adds to the item list in the DOM and in the data
function addItem() {
    var itemName = document.getElementById("item-name").value;
    var itemPrice = document.getElementById("item-price").value;
    // if either is blank, do nothing
    if (itemName == null || itemName == "" || itemPrice == null || itemPrice == "") {
        return;
    }
    // reset the form
    document.getElementById("itemForm").reset();
    $("#addItemModal").modal("hide");
    // add item to DOM and data
    appendItem(itemName);
    menu.MenuSection[currSection].Items.push({ title:itemName, price:itemPrice });
}

// adds a new item with the given name to the end of the item list
function appendItem(name) {
    var index = document.getElementById("itemList").getElementsByClassName("row").length - 1;
    var newItem = newBox(name);
    newItem.setAttribute("onclick", "clickItem(\""+index+"\")");
    newItem.id = "item" + index;
    document.getElementById("itemList").appendChild(newItem);
}

// highlights the appropriate section and displays the appropriate items
function clickSection(index) {
    // un-highlight other sections
    if (currSection != null) {
        var section = document.getElementById("section"+currSection);
        section.style.backgroundColor = "";
    }
    // highlight the section
    document.getElementById("section" + index).style.backgroundColor = highlightColor;    
    // remove all items currently displayed
    while (document.getElementById("itemList").getElementsByClassName("row").length > 1) {
        document.getElementById("itemList").getElementsByClassName("row")[1].remove();
    }
    // display all items associated with the section
    for (var item of menu.MenuSection[index].Items) {
        appendItem(item.title);
    }
    // update variables
    currSection = index;   
}

// changes the highlight focus to only that item
function clickItem(index) {
    // un-highlight all sections
    var items = document.getElementById("itemList").getElementsByClassName("row");
    for (var item of items) {
        item.style.backgroundColor = "";
    }
    // highlight the section
    document.getElementById("item" + index).style.backgroundColor = highlightColor;    
}

// helper function, returns a preformatted gridbox element containing the given text
function newBox(text) {
    var newBox = document.createElement("DIV");
    newBox.classList.add("row");
    newBox.classList.add("border");
    newBox.classList.add("border-dark");
    // make the text element and append
    var newText = document.createElement("H2");
    newText.classList.add("mx-auto");
    newText.appendChild(document.createTextNode(text));
    newBox.appendChild(newText);
    return newBox;
}
