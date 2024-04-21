from flask import Flask, jsonify, request, Blueprint
import sqlite3
from openai import OpenAI
import os
from dotenv import load_dotenv

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
            print(combined_items)

        system_message = 'You are a helpful assistant. Provide a recipe based on the items list given without any additional content. Only provide the name of the recipe.'
        user_message = f"What is a recipe that uses {combined_items}?"

        # Assuming you have configured your OpenAI API Key correctly
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Updated to a common chat model name for example
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ]
        )
        recipe = response.choices[0].message.content.strip()
        print('recipe:', recipe)
        return jsonify({'recipe': recipe})
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return jsonify({'error': 'Error processing your request'}), 500