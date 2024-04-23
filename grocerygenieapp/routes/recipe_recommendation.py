from flask import Flask, jsonify, request, Blueprint
import sqlite3
from openai import OpenAI
import os
from dotenv import load_dotenv
import re

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
OpenAI.api_key = os.getenv('OPENAI_API_KEY')
recipe_recommendation_bp = Blueprint('recipe_recommendation_bp', __name__)

@recipe_recommendation_bp.route('/get_recipe_recommendations', methods=['GET'])
def get_recipe_recommendations():
    try:
        with sqlite3.connect('instance/list.db') as conn:
            c = conn.cursor()
            c.execute("SELECT list_data FROM lists")
            all_items = c.fetchall()
            if not all_items:
                return jsonify({'error': 'No saved lists available'}), 404

            # Combine all items into a single string, assuming each list_data contains a CSV of items
            combined_items = ', '.join([item[0] for item in all_items])

        system_message = 'You are a helpful assistant. Provide 10 recipes based on the items list given without any additional content. Only provide the names of the recipes.'
        user_message = f"What are 10 recipes that use {combined_items}?"

        # Assuming you have configured your OpenAI API Key correctly
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Updated to a common chat model name for example
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ]
        )
        recipes = response.choices[0].message.content.strip().split('\n')
        # Split the text by double newlines assuming recipes are well separated
        # Use regular expressions to remove numeric prefixes from each recipe
        cleaned_recipes = [re.sub(r'^\d+\.\s*', '', recipe).strip() for recipe in recipes]
        return jsonify({'recipes': cleaned_recipes})
    except sqlite3.Error as e:
        return jsonify({'error': 'Database error occurred: ' + str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Error processing your request: ' + str(e)}), 500