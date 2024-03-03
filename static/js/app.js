function addItem() {
    try {
        const newItem = document.getElementById("itemInput").value.trim();
        if (newItem !== "") {
            const categoryFound = categorizeItem(newItem);

            ensureCategoryExists(categoryFound); // Ensure the category exists

            const li = document.createElement("li");
            li.textContent = newItem;

            const categoryId = categoryFound.replace(/\s+/g, '');

            const categoryList = document.getElementById(categoryId).querySelector(".shoppingList");
            categoryList.appendChild(li);

            fetch('/add_item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_text: newItem })
            })
            .then(response => {
                if (response.ok) {
                    console.log('Item added successfully');
                } else {
                    console.error('Failed to add item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    } catch (error) {
        console.error('Error adding item:', error);
    } finally {
        // This will execute regardless of the try/catch outcome
        document.getElementById("itemInput").value = ""; // Clear the input field
    }
}


function ensureCategoryExists(category) {
    let categoryId = category.replace(/\s+/g, '');
    let categoryContainer = document.getElementById("categoriesContainer");
    let categoryDiv = document.getElementById(categoryId);

    if (!categoryDiv) {
        categoryDiv = document.createElement("div");
        categoryDiv.id = categoryId;
        categoryDiv.className = "category";
        categoryDiv.style.display = "block";
        categoryDiv.innerHTML = `<h2>${category}</h2><ul class="shoppingList"></ul>`;
        categoryContainer.appendChild(categoryDiv);
    } else {
        categoryDiv.style.display = "block";
    }
}

function categorizeItem(itemName) {
    // Define a mapping of keywords to categories
    const categoryKeywords = {
        "Dairy & Eggs": ["milk", "cheese", "yogurt", "butter", "eggs", "cream", "plant-based milk"],
        "Produce": ["apple", "banana", "orange", "berry", "carrot", "lettuce", "tomato", "broccoli", "onion", "potato"],
        "Meat & Seafood": ["beef", "chicken", "pork", "turkey", "fish", "shrimp", "lobster", "crab"],
        "Bakery": ["bread", "roll", "bagel", "pastry", "cake", "pie"],
        "Frozen Foods": ["ice cream", "frozen vegetable", "frozen dinner", "pizza", "frozen fruit", "frozen dessert"],
        "Pantry Staples": ["cereal", "pasta", "rice", "bean", "nut", "spice", "oil", "flour", "sugar", "baking supply"],
        "Snacks": ["chip", "cookie", "cracker", "candy", "chocolate", "popcorn", "granola bar"],
        "Drinks": ["soda", "juice", "water", "sports drink", "coffee", "tea", "alcoholic beverage"],
        "Household & Cleaning": ["laundry detergent", "dish soap", "cleaner", "paper towel", "toilet paper", "trash bag"],
        "Health & Beauty": ["shampoo", "conditioner", "soap", "toothpaste", "razor", "lotion", "over-the-counter medicine"],
        "Baby Products": ["diaper", "baby wipe", "baby food", "formula", "baby shampoo"],
        "Pet Supplies": ["dog food", "cat food", "litter", "treat", "toy"],
        "Canned & Jarred Goods": ["soup", "vegetable", "fruit", "peanut butter", "jelly", "condiment"],
        "International Foods": ["asian food", "hispanic food", "european food", "indian food", "international spice"],
        "Deli & Prepared Foods": ["deli meat", "cheese", "prepared salad", "rotisserie chicken", "sandwich", "sushi"],
        "Baking Goods": ["flour", "sugar", "baking powder", "baking soda", "yeast", "chocolate chip"],
        "Spices & Seasonings": ["salt", "pepper", "garlic powder", "paprika", "cinnamon", "spice mix"],
        "Alcoholic Beverages": ["beer", "wine", "spirit", "mixer"],
        "Pharmacy": ["prescription medication", "first aid supply", "vitamin", "supplement"],
        "Floral & Garden": ["fresh flower", "potted plant", "garden tool", "seed", "soil"]
    };

    // Convert the item name to lowercase for case-insensitive comparison
    const lowerItemName = itemName.toLowerCase();

    // Iterate over the categories to find a match
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        for (const keyword of keywords) {
            if (lowerItemName.includes(keyword)) {
                return category; // Return the category if a keyword matches
            }
        }
    }
    return "Other"; // Default category if no match is found
}


function clearList() {
    var categoriesContainer = document.getElementById("categoriesContainer");
    while (categoriesContainer.firstChild) {
        categoriesContainer.removeChild(categoriesContainer.firstChild);
    }
}

function downloadList() {
    var listContent = "";
    var categories = document.querySelectorAll("#categoriesContainer .category");
    
    categories.forEach(function(category) {
        // Include the category name
        var categoryName = category.querySelector("h2").textContent;
        listContent += categoryName + ":\n";
        
        // Include the items within this category
        var items = category.querySelectorAll(".shoppingList li");
        items.forEach(function(item) {
            listContent += "- " + item.textContent + "\n";
        });
        
        listContent += "\n"; // Add a newline for spacing between categories
    });

    // Create a Blob with the list content
    var blob = new Blob([listContent], { type: "text/plain" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shopping_list.txt";
    
    // Simulate a click to initiate the download
    document.body.appendChild(link); // Append the link to the body
    link.click();
    document.body.removeChild(link); // Clean up and remove the link
    
}