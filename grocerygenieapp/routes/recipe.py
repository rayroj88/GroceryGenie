from flask import Blueprint, request, jsonify
import os
from openai import OpenAI
import openai
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
OpenAI.api_key = os.getenv('OPENAI_API_KEY')

recipe_bp = Blueprint('recipe', __name__)

@recipe_bp.route('/process_recipe', methods=['POST'])
def process_recipe():  
    data = request.get_json()
    recipe_name = data['recipe_name'] 
    recipe_name = data['recipe_name'] 
    system_message = "You are a helpful assistant. Provide a list of ingredients for recipes without any additional content. Make assumptions about what ingredients need to be used and ensure every item you list is in the exact format specified and do not provide optional ingredients. List ingredients as you would see on a recipe card. For example: Flour: 2 cups Sugar: 1 cup and so on..."
    user_message = f"What are the ingredients needed for {recipe_name}?"


    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Updated to a common chat model name for example
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ]
        )
        if response.choices:
            # Given each item on new line
            ingredients_list = response.choices[0].message.content.strip().split('\n')
        else:
            ingredients_list = "No ingredients found."
        
        return jsonify({"ingredients": ingredients_list})
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return jsonify({"error": "Failed to process the recipe"}), 500

    return jsonify(parsed_ingredients)    