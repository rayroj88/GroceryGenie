items = []
// Hardcoded list of items for each diet
const dietItems = {
    'Vegan': {
     
    items:['Almond milk', 'Coconut yogurt', 'Tempeh', 'Chickpeas', 
    'Black beans', 'Lentils', 'Quinoa', 'Vegan cheese', 
    'Seitan', 'Jackfruit', 'Tofu', 'Soy milk', 
    'Nutritional yeast', 'Chia seeds', 'Flax seeds', 
    'Spirulina', 'Cashew butter', 'Agave syrup', 
    'Vegan chocolate', 'Maple syrup','Falafel', 'Veggie burgers', 'Hummus', 'Edamame',
    'Avocado toast', 'Mushroom steak', 'Vegetable sushi', 'Lentil soup',
    'Ratatouille', 'Vegan curry', 'Stuffed bell peppers', 'Marinated tofu stir-fry',
    'Vegan lasagna', 'Rice and bean burritos', 'Peanut butter', 'Tabbouleh',
    'Vegan pizza', 'Roasted chickpeas', 'Kale chips', 'Guacamole'],
    favoriteItem: 'Almond milk',
    tip: 'Vegan diets exclude all animal products, making them rich in plant-based nutrients.',
    },

    'Vegetarian': {
    
     items:['Eggs', 'Greek yogurt', 'Paneer', 'Halloumi', 
    'Feta cheese', 'Ricotta cheese', 'Cheddar cheese', 'Mozzarella', 
    'Butter', 'Milk', 'Ice cream', 'Whey protein', 
    'Cottage cheese', 'Sour cream', 'Pesto sauce', 
    'Macaroni and cheese', 'Cheese pizza', 'Omelet', 
    'Quiche', 'French toast','Mushroom risotto', 'Spinach and cheese ravioli', 'Grilled cheese sandwich', 'Vegetable quiche',
    'Stuffed pasta shells', 'Cheese enchiladas', 'Paneer tikka', 'Vegetarian chili',
    'Brie and apple sandwich', 'Greek salad', 'Caprese salad', 'Eggplant parmesan',
    'Vegetable lasagna', 'Cheese fondue', 'Gnocchi', 'Mushroom stroganoff',
    'Spinach pie', 'Egg fried rice', 'Zucchini fritters', 'Arugula and goat cheese salad'],
    favoriteItem: 'Paneer',
    tip: 'Vegetarian diets include dairy and eggs but exclude meat, fish, and poultry.',
    },

    'Gluten-Free':{

     items:['Rice cakes', 'Gluten-free pasta', 'Quinoa', 'Buckwheat', 
    'Gluten-free bread', 'Corn tortillas', 'Gluten-free oats', 'Rice flour', 
    'Almond flour', 'Coconut flour', 'Corn chips', 'Popcorn', 
    'Rice crackers', 'Gluten-free cereal', 'Millet', 
    'Polenta', 'Tapioca', 'Gluten-free pancakes', 
    'Gluten-free soy sauce', 'Gluten-free beer','Gluten-free waffles', 'Gluten-free granola', 'Gluten-free bagels', 'Gluten-free muffins',
    'Gluten-free pizza crust', 'Cornmeal', 'Gluten-free brownies', 'Gluten-free cupcakes',
    'Amaranth', 'Teff', 'Arrowroot', 'Sorghum',
    'Gluten-free croutons', 'Gluten-free tortilla chips', 'Gluten-free pita', 'Gluten-free beer',
    'Gluten-free pretzels', 'Gluten-free cookies', 'Gluten-free cake mix', 'Gluten-free mac and cheese'],
    favoriteItem: 'Quinoa',
    tip: 'Gluten-Free diets exclude wheat, barley, and rye, and are essential for those with celiac disease.',
    },
    // Add more diets and items here
    'Keto': {

     items:['Avocado', 'Eggs', 'Bacon', 'Ground beef', 
        'Salmon', 'Tuna', 'Butter', 'Heavy cream', 
        'Olive oil', 'Coconut oil', 'Almond flour', 'Macadamia nuts', 
        'Pecans', 'Cheddar cheese', 'Cream cheese', 
        'MCT oil', 'Grass-fed steak', 'Pork chops', 
        'Chicken thighs', 'Sardines', 'Zucchini noodles', 'Cauliflower rice', 'Collagen peptides', 'Beef jerky',
        'Chia seed pudding', 'Keto bread', 'Pork rinds', 'Keto brownies',
        'String cheese', 'Keto cookies', 'Egg muffins', 'Spinach and feta stuffed chicken',
        'Keto chocolate', 'Keto ice cream', 'Bone broth', 'Brussels sprouts with bacon',
        'Cobb salad', 'Keto pizza', 'Almond butter', 'Keto smoothie'],
    favoriteItem: 'Avocado',
    tip: 'Keto diets are high in fat, low in carbs, and help in potentially losing weight by achieving ketosis.',
    },
    'Paleo': {
    
        items:['Grass-fed meat', 'Fish', 'Nuts and seeds', 'Eggs', 
        'Fresh fruits', 'Fresh vegetables', 'Sweet potatoes', 'Coconut oil', 
        'Olive oil', 'Avocado', 'Almond butter', 'Squash', 
        'Zucchini', 'Beef jerky', 'Coconut milk', 
        'Almond milk', 'Bone broth', 'Bacon', 
        'Chicken breast', 'Spinach','Grilled vegetables', 'Bacon-wrapped asparagus', 'Cauliflower rice', 'Paleo beef stew',
        'Roasted turkey', 'Baked sweet potato fries', 'Grain-free granola', 'Paleo protein bars',
        'Shakshuka', 'Tuna salad lettuce wraps', 'Paleo banana bread', 'Almond crusted chicken',
        'Coconut shrimp', 'Beef jerky', 'Fruit leather', 'Vegetable chips',
        'Bison burgers', 'Chicken zoodle soup', 'Stuffed avocados', 'Paleo pancakes'],
        favoriteItem: 'Grass-fed Beef Jerky',
        tip: 'Paleo diets focus on eating like our ancestors, emphasizing whole foods and avoiding processed items.',
    },
    
    'Dairy-Free': {
    

        items:['Almond milk', 'Coconut milk', 'Oat milk', 'Rice milk', 
        'Soy milk', 'Dairy-free cheese', 'Coconut cream', 'Dairy-free yogurt', 
        'Sorbet', 'Dairy-free chocolate', 'Dairy-free ice cream', 'Dairy-free margarine', 
        'Dairy-free smoothies', 'Almond-based desserts', 'Cashew-based spreads', 
        'Dairy-free cream cheese', 'Vegan butter', 'Non-dairy whipped cream', 
        'Egg-based dishes', 'Dairy-free protein powders','Dairy-free lasagna', 'Dairy-free salad dressing', 'Dairy-free sour cream', 'Dairy-free mayonnaise',
        'Dairy-free pesto', 'Dairy-free flatbread', 'Dairy-free biscuits', 'Dairy-free creamer',
        'Dairy-free custard', 'Dairy-free gravy', 'Dairy-free protein shake', 'Dairy-free Caesar salad',
        'Dairy-free garlic bread', 'Dairy-free Alfredo sauce', 'Dairy-free queso', 'Dairy-free enchiladas',
        'Dairy-free pancakes', 'Dairy-free brownies', 'Dairy-free mozzarella sticks', 'Dairy-free ranch'],
        favoriteItem: 'Almond Milk',
        tip: 'Dairy-Free diets exclude all dairy products, often due to allergies or lactose intolerance.',
    },
    'Pescatarian': {
        items:['Salmon', 'Tuna', 'Trout', 'Cod', 
        'Shrimp', 'Scallops', 'Lobster', 'Mussels', 
        'Oysters', 'Sushi', 'Crab', 'Clams', 
        'Sardines', 'Anchovies', 'Seaweed', 
        'Caviar', 'Fish sticks', 'Fish tacos', 
        'Grilled fish', 'Fish chowder','Grilled octopus', 'Seafood paella', 'Fish and chips', 'Prawn cocktail',
        'Seafood risotto', 'Seared scallops', 'Grilled sea bass', 'Halibut steaks',
        'Spicy tuna rolls', 'Clam chowder', 'Fish ceviche', 'Seafood gumbo',
        'Smoked salmon', 'Calamari', 'Lobster bisque', 'Crab cakes',
        'Grilled mackerel', 'Seared ahi tuna', 'Poke bowl', 'Shrimp scampi'],
        favoriteItem: 'Grilled Salmon',
        tip: 'Pescatarian diets include fish and seafood as sources of protein instead of meat from land animals.',
    },
    'Food Allergens': {
        items:['Gluten-free bread', 'Nut-free granola bars', 'Dairy-free milk', 'Soy-free sauces', 
        'Egg-free mayo', 'Seed butters', 'Coconut yogurt', 'Allergen-free chocolates', 
        'Gluten-free pasta', 'Nut-free trail mix', 'Dairy-free cheeses', 'Soy-free veggie burgers', 
        'Egg-free cake mixes', 'Hypoallergenic cereals', 'Non-dairy ice cream', 
        'Wheat-free crackers', 'Corn-free tortillas','Allergen-free bread', 'Allergen-free pasta', 'Allergen-free cookies', 'Allergen-free cakes',
        'Soy-free chocolate', 'Soy-free ice cream', 'Nut-free peanut butter substitute', 'Nut-free chocolate',
        'Dairy-free protein bars', 'Egg-free protein bars', 'Wheat-free soy sauce', 'Gluten-free vegan pizza',
        'Dairy and egg-free pancake mix', 'Soy-free veggie chips', 'Nut-free energy balls', 'Dairy-free vegan cheese',
        'Gluten and nut-free granola', 'Allergen-free snack bars', 'Corn and gluten-free tortillas', 'Gluten and dairy-free cupcakes'],
        favoriteItem: 'Gluten-Free Vegan Pizza',
        tip: 'Food Allergen-friendly diets avoid common allergens like nuts, dairy, gluten, etc., to prevent allergic reactions.',
    },
};

// Bind the change event to the dietaryFilter dropdown
$('#dietaryFilter').change(function() {
    const selectedDiet = $(this).val();
    
    // Clear the current items
    $('#groceryList').empty();

    // Check if the selected diet has associated items and it's in the correct format
    if (dietItems[selectedDiet] && Array.isArray(dietItems[selectedDiet].items)) {
        // Add each hardcoded item to the grocery list
        dietItems[selectedDiet].items.forEach(function(item) {
            $('#groceryList').append('<li>' + item + '</li>');
        });

        // Check if there is a favorite item and tip for the diet
        if (dietItems[selectedDiet].favoriteItem && dietItems[selectedDiet].tip) {
            // Display the favorite item and tip
            $('#groceryList').append('<li><strong>Favorite Item:</strong> ' + dietItems[selectedDiet].favoriteItem + '</li>');
            $('#groceryList').append('<li><strong>Tip:</strong> ' + dietItems[selectedDiet].tip + '</li>');
        }
    } else {
        // Handle diets with no items or a placeholder message
        $('#groceryList').append('<li>No items listed for this diet.</li>');
    }
});
// ... (the rest of your existing app.js code)


// Function to gather items and their dietary restrictions from the form inputs
function gatherItemsAndRestrictions() {
    const items = []; 
    // The code here should be modified according to the actual class or ID names used in your HTML
    document.querySelectorAll('.item-input').forEach(input => {
        const itemName = input.value; 
        const quantity = 1; // Replace with logic to get quantity if needed
        const dietaryRestrictions = [];
        // The selector should be modified according to your actual dietary restriction checkboxes or input
        document.querySelectorAll(`.dietary-${itemName}:checked`).forEach(checkbox => {
            dietaryRestrictions.push(checkbox.value);
        });
        
        items.push({
            item: { name: itemName, quantity: quantity },
            dietary_restrictions: dietaryRestrictions
        });
    });
    return items;
}

// Function to send the collected item data and dietary restrictions to the backend
function addNewItemWithRestrictions() {
    const data = gatherItemsAndRestrictions();

    fetch('/add_item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Add logic to handle the response, such as updating the UI or clearing the form
    })
    .catch(error => console.error('Error:', error));
}

// Bind the addNewItemWithRestrictions function to the "Add Item" button
// Make sure 'addItemButton' matches the ID of your actual add item button
document.getElementById('addItemButton').addEventListener('click', addNewItemWithRestrictions);


function addItem() {
        const newItem = document.getElementById("itemInput").value.trim();
        if (newItem !== "") {
            const categoryFound = categorizeItem(newItem);

            ensureCategoryExists(categoryFound); // Ensure the category exists

            const li = document.createElement("li");
            li.textContent = newItem;

            const categoryId = categoryFound.replace(/\s+/g, '');

            const categoryList = document.getElementById(categoryId).querySelector(".shoppingList");
            categoryList.appendChild(li);

            items.push(newItem);
            document.getElementById("itemInput").value = "";
        }
}

function addItemFromAPI(itemName) {
        const newItem = itemName.trim();
        if (newItem !== "") {
            const categoryFound = categorizeItem(newItem); // Assumes this function categorizes items

            ensureCategoryExists(categoryFound); // Ensure the category exists

            const li = document.createElement("li");
            li.textContent = newItem;

            const categoryId = categoryFound.replace(/\s+/g, '');

            const categoryList = document.getElementById(categoryId).querySelector(".shoppingList");
            categoryList.appendChild(li);
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
            "provolone", "swiss cheese", "blue cheese", "egg"
          ],
        "Produce": [
            "apples", "bananas", "carrots", "dates", "eggplant", 
            "figs", "grapes", "honeydew melon", "iceberg lettuce", 
            "jalapeno peppers", "kale", "lemons", "mangoes", 
            "nectarines", "oranges", "peaches", "quinces", 
            "raspberries", "strawberries", "tomatoes", "ugli fruit", 
            "vanilla beans", "watermelon", "xigua", "yams", "zucchini", "onion", "lettuce", "tomato", "ketchup", "mustard"
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
            "chili", "curry paste", "apple sauce", "condensed milk", "pumpkin puree" , "tomato sauce" , "tomato paste"
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
            "cardamom", "star anise", "italian seasoning"
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
    items = [];
}

function submitRecipe() {
    const recipeName = document.getElementById("recipeName").value;
    fetch('/process_recipe', {
        method: 'POST',
        body: JSON.stringify({ recipe_name: recipeName }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // For debugging
        
        if (Array.isArray(data.ingredients) && data.ingredients.length > 0) {
            // Iterate over the array of ingredients
            data.ingredients.forEach(ingredient => {
                
                addItemFromAPI(ingredient.trim()); 
            });
        } else {
            
            console.log('No ingredients found or incorrect format received');
        }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById("toggleSideWindowBtn").addEventListener("click", function() {
    var sideWindow = document.querySelector(".side-window");
    if (sideWindow.style.display === "none" || sideWindow.style.display === "") {
        sideWindow.style.display = "block"; // Show the side window
    } else {
        sideWindow.style.display = "none"; // Hide the side window
    }
});


// Function to filter items based on the selected dietary restriction
function filterItemsByDiet(dietType) {
    // Select all list items
    const allListItems = document.querySelectorAll('.shoppingList li');

    // Loop over each item and check its data-diet attribute
    allListItems.forEach(item => {
        // If no diet is selected or the item's diet includes the selected diet, show the item
        if (dietType === '' || item.getAttribute('data-diet').includes(dietType)) {
            item.style.display = '';
        } else {
            // Otherwise, hide the item
            item.style.display = 'none';
        }
    });
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

function saveList() {
    // Convert the items array to a JSON string
    const itemsJson = JSON.stringify(items);

    // Send the JSON string to the server
    fetch('/save_list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: itemsJson
    })
    .then(response => {
        if (response.ok) {
            console.log('Items saved successfully');
        } else {
            console.error('Failed to save items');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

async function displaySavedHistory() {
    try {
        const response = await fetch('/get_saved_lists');
        if (!response.ok) {
            throw new Error('Failed to fetch lists');
        }
        const lists = await response.json();
        console.log('Fetched lists:', lists);
        return lists;
    } catch (error) {
        console.error('Error fetching lists:', error);
        return [];
    }
}

function submitRecommendedRecipe(recommendedRecipe) {
    const recipeName = document.getElementById("recipeName").value;
    fetch('/process_recipe', {
        method: 'POST',
        body: JSON.stringify({ recipe_name: recommendedRecipe }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // For debugging
        
        if (Array.isArray(data.ingredients) && data.ingredients.length > 0) {
            // Iterate over the array of ingredients
            data.ingredients.forEach(ingredient => {
                
                addItemFromAPI(ingredient.trim()); 
            });
        } else {
            
            console.log('No ingredients found or incorrect format received');
        }
    })
    .catch(error => console.error('Error:', error));
}