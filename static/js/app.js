function addItem() {
    //Get text in input field and store into newItem
    var newItem = document.getElementById("itemInput").value;
    //If input is not empty
    if (newItem !== "") {
        //create a list item li
        var li = document.createElement("li");
        //set text of li to newItem from input field
        li.textContent = newItem;
        //Append shoppingList with this new li 
        document.getElementById("shoppingList").appendChild(li);
        //Clear the input field
        document.getElementById("itemInput").value = "";
    }
}

function clearList() {
    //Store shoppingList into ul
    var ul = document.getElementById("shoppingList");
    //while not empty, delete firstChild until empty
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

function downloadList() {
    // Get the list content
    var listContent = "";
    // Store entire shoppingList in listItems
    var listItems = document.querySelectorAll("#shoppingList li");
    //For each item in ShoppingList store on a new line
    listItems.forEach(function(item) {
        listContent += item.textContent + "\n";
    });

    // Create a Blob containing the list content
    var blob = new Blob([listContent], { type: "text/plain" });

    // Create a temporary link element
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shopping_list.txt";

    // Simulate a click to initiate the download
    link.click();
}