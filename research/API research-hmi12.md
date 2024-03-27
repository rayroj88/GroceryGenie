## key element is prompt crafting
examples: 
-    "List all the ingredients needed to make a classic Margherita pizza."
-    "What ingredients do I need for making vegan chocolate cake?"

general case: List all the ingredients needed to make a "user input"

## Making API request

Completions is the best api type for this use case

- Create a New Request: Select POST as the method and use the URL https://api.openai.com/v1/completions.
- Authorization: Choose "Bearer Token" and enter your API key.
- Headers: Set Content-Type to application/json.
- Body: Choose raw and enter your JSON data, including the model, prompt, and other parameters as shown in the CURL example.

## Parsing response into ingredients

- No found way to completely standarize the api response so it will be neccesarry to ask for a certain response and parse from there.

ex. "List ingredients as you would see on a recipe card. For example:
- Flour: 2 cups
- Sugar: 1 cup
Provide a list like this for a classic New York-style cheesecake."

## User input needs to be narrowly defined

- the UI should include something like: making a recipe? we'll add the ingredients neccesary to make it into your cart.

- Enter recipe you are making "  "

- Then go to api and ask the parsing response prompt using the user entered recipe.