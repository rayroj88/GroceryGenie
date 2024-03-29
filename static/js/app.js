

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
        "Dairy & Eggs": [
            "milk", "cheese", "yogurt", "butter", "eggs", 
            "cream", "plant-based milk", "sour cream", "cottage cheese", 
            "cream cheese", "mozzarella", "cheddar", "gouda", 
            "brie", "camembert", "feta", "ricotta", "parmesan", 
            "ghee", "kefir", "buttermilk", "half and half", 
            "provolone", "swiss cheese", "blue cheese"
          ],
        "Produce": [
            "apples", "bananas", "carrots", "dates", "eggplant", 
            "figs", "grapes", "honeydew melon", "iceberg lettuce", 
            "jalapeno peppers", "kale", "lemons", "mangoes", 
            "nectarines", "oranges", "peaches", "quinces", 
            "raspberries", "strawberries", "tomatoes", "ugli fruit", 
            "vanilla beans", "watermelon", "xigua", "yams", "zucchini"
          ],
        "Meats & Seafood": [
            "beef", "chicken", "duck", "eggs", "fish", 
            "goat", "ham", "italian sausage", "jerk chicken", 
            "kangaroo", "lamb", "mussels", "nuggets", "octopus", 
            "pork", "quail", "rabbit", "salmon", "turkey", 
            "veal", "whale", "xiphias (swordfish)", "yellowtail", 
            "zebra (not common)"
          ],
        "Bakery": [
            "bread", "roll", "bagel", "pastry", "cake", "pie", "whole wheat bread", 
            "croissants", "bagels", "muffins", "sourdough loaf", "gluten-free bread",
            "rye bread", "banana bread", "biscotti", "danish pastry",
            "pita bread", "pizza dough", "pretzels", "scones", "ciabatta",
            "panettone", "fruitcake", "pound cake", "challah", "donuts",
            "garlic bread", "gingerbread", "baguette", "brioche", "cornbread"
      ],
        "Frozen Foods": [
            "ice cream", "frozen vegetable", "frozen dinner", "pizza", "frozen fruit", "frozen dessert", 
            "frozen vegetables", "ice cream", "frozen pizza", "frozen dinners", "frozen berries",
            "frozen waffles", "frozen fish", "frozen shrimp", "frozen fries", "frozen chicken nuggets",
            "frozen burgers", "frozen fruit bars", "frozen pie crusts", "frozen dumplings", "frozen bread dough",
            "frozen bagels", "frozen cheesecake", "frozen meatballs", "frozen corn", "frozen spinach",
            "frozen broccoli", "frozen breakfast sandwiches", "frozen edamame", "frozen mixed fruit", "frozen yogurt"
      ],
        "Pantry Staples": [
            "rice", "pasta", "canned tomatoes", "olive oil", "flour",
            "sugar", "chicken broth", "canned beans", "peanut butter", "honey",
            "vinegar", "cereal", "oatmeal", "lentils", "quinoa",
            "spices", "soy sauce", "nuts", "dried fruit", "tea",
            "coffee", "baking powder", "baking soda", "yeast", "chocolate chips"
      ],
        "Snacks": [
            "chips", "popcorn", "granola bars", "chocolate", "trail mix",
            "pretzels", "fruit snacks", "nuts", "jerky", "rice cakes",
            "cookies", "crackers", "candy", "dried fruit", "yogurt covered raisins",
            "cheese snacks", "fruit cups", "pudding cups", "pop tarts", "gummies",
            "energy bars", "protein bars", "sunflower seeds", "almonds", "cashews"
      ],
        "Drinks": [
            "water", "soda", "juice", "milk", "coffee",
            "tea", "energy drinks", "sports drinks", "iced tea", "lemonade",
            "sparkling water", "almond milk", "soy milk", "coconut water", "vegetable juice",
            "fruit punch", "hot chocolate", "beer", "wine", "spirits",
            "smoothies", "cider", "matcha", "kombucha", "milkshakes"
      ],
        "Household & Cleaning": [
            "laundry detergent", "dish soap", "all-purpose cleaner", "paper towels", "trash bags",
            "bleach", "fabric softener", "glass cleaner", "toilet paper", "sponges",
            "disinfectant wipes", "floor cleaner", "furniture polish", "air freshener", "dishwasher detergent",
            "hand soap", "stain remover", "window cleaner", "bathroom cleaner", "kitchen cleaner",
            "duster", "mop", "broom", "vacuum bags", "light bulbs"
      ],
        "Health & Beauty": [
            "shampoo", "conditioner", "toothpaste", "soap", "body wash",
            "deodorant", "face wash", "moisturizer", "sunscreen", "makeup remover",
            "razors", "shaving cream", "lip balm", "hand sanitizer", "first aid kit",
            "pain relievers", "allergy medication", "cotton swabs", "nail clippers", "toothbrushes",
            "floss", "hair gel", "perfume", "cologne", "makeup"
      ],
        "Baby Products": [
            "diapers", "baby wipes", "baby formula", "baby food", "bottles",
            "pacifiers", "teething rings", "baby lotion", "baby shampoo", "baby powder",
            "diaper rash cream", "baby oil", "nursing pads", "bottle cleaner", "sippy cups",
            "baby bibs", "strollers", "car seats", "baby monitors", "high chairs",
            "crib sheets", "baby blankets", "changing tables", "baby gates", "teethers",
            "nursery decor", "breast pumps", "infant toys", "baby carriers", "night lights"
      ],
        "Pet Supplies": [
            "dog food", "cat food", "bird seed", "fish food", "flea and tick treatment",
            "pet shampoo", "litter", "litter boxes", "pet toys", "pet beds",
            "collars", "leashes", "pet treats", "aquarium supplies", "pet vitamins",
            "grooming tools", "pet carriers", "water bowls", "feeders", "pet sweaters",
            "pet gates", "nail clippers", "pet toothpaste", "pet brushes", "training pads"
      ],
        "Canned & Jarred Goods": [
            "beans", "corn", "peas", "tomatoes", "soup",
            "fruit cocktail", "tuna", "salmon", "chicken", "beef stew",
            "olives", "pickles", "jam", "jelly", "peanut butter",
            "honey", "salsa", "pasta sauce", "coconut milk", "artichoke hearts",
            "chili", "curry paste", "apple sauce", "condensed milk", "pumpkin puree"
      ],
        "International Foods": [
            "asian food", "hispanic food", "european food", "indian food", "international spice",
            "african food", "middle eastern food", "caribbean food", "japanese snacks", "korean kimchi",
            "italian pasta", "greek olives", "thai curry paste", "chinese sauces", "french cheeses",
            "spanish chorizo", "russian pickles", "dutch stroopwafel", "turkish delight", "vietnamese pho spice",
            "polish kielbasa", "british tea", "mexican tortillas", "ethiopian berbere", "australian vegemite"
      ],
        "Deli & Prepared Foods": [
            "deli meat", "cheese", "prepared salad", "rotisserie chicken", "sandwich", "sushi",
            "quiche", "pasta salad", "antipasto", "coleslaw", "taco kit",
            "falafel", "hummus", "deviled eggs", "stuffed peppers", "egg salad",
            "chicken salad", "tuna salad", "macaroni salad", "fruit salad", "potato salad",
            "lasagna", "meatballs", "bbq ribs", "vegetable tray", "cheese platter"
      ],
        "Baking Goods": [
            "flour", "sugar", "baking powder", "baking soda", "yeast", "chocolate chip",
            "vanilla extract", "cocoa powder", "almond flour", "coconut flour", "cake mix",
            "brown sugar", "powdered sugar", "cornstarch", "maple syrup", "honey",
            "molasses", "agave nectar", "food coloring", "sprinkles", "pastry flour",
            "wheat germ", "baking chocolate", "buttermilk powder", "pie crust"
      ],
        "Spices & Seasonings": [
            "salt", "pepper", "garlic powder", "paprika", "cinnamon", "spice mix",
            "cumin", "turmeric", "oregano", "basil", "rosemary", "thyme",
            "chili powder", "curry powder", "bay leaves", "saffron", "nutmeg",
            "coriander", "allspice", "cloves", "ginger", "mustard seeds", "fennel seeds",
            "cardamom", "star anise"
      ],
        "Alcoholic Beverages": [
            "beer", "wine", "spirit", "mixer",
            "vodka", "whiskey", "rum", "tequila", "gin",
            "brandy", "liqueur", "champagne", "cider", "sake",
            "craft beer", "red wine", "white wine", "rose wine", "prosecco",
            "margarita mix", "bloody mary mix", "mojito mix", "old fashioned mix", "martini mix"
      ],
        "Pharmacy": [
            "prescription medication", "first aid supply", "vitamin", "supplement",
            "pain reliever", "allergy medication", "cold and flu remedy", "antacid", "cough syrup",
            "antibiotic ointment", "bandages", "thermometer", "blood pressure monitor", "glucose meter",
            "sunscreen", "insect repellent", "hand sanitizer", "lip balm", "eye drops",
            "contact solution", "nasal spray", "sleep aid", "digestive aid", "moisturizing lotion"
      ],
        "Floral & Garden": [
            "fresh flower", "potted plant", "garden tool", "seed", "soil",
            "mulch", "fertilizer", "watering can", "garden hose", "pruning shears",
            "gloves", "plant food", "herb seeds", "vegetable seeds", "flower seeds",
            "succulents", "orchids", "rose bush", "lawn mower", "leaf blower",
            "garden decor", "outdoor lighting", "compost bin", "bird feeder", "insecticide"
      ]
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