function addItem() {
    var newItem = document.getElementById("itemInput").value;
    if (newItem !== "") {
        var li = document.createElement("li");
        li.textContent = newItem;
        document.getElementById("shoppingList").appendChild(li);
        document.getElementById("itemInput").value = "";
    }
}

function clearList() {
    console.log("Clear List function called");
    var ul = document.getElementById("shoppingList");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}