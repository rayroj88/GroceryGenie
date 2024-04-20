from flask import Blueprint, jsonify, request
import requests
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
OpenAI.api_key = os.getenv('OPENAI_API_KEY')
recipe_recommendation_bp = Blueprint('recipe_recommendation_bp', __name__)

@recipe_recommendation_bp.route('/recommend_recipes', methods=['POST'])
def recommend_recipes():
    # Retrieve items from the database or request payload
    items = request.json.get('items', [])

    # Construct input for OpenAI API
    prompt = "Recommend recipes based on the following items:\n" + "\n".join(items)

    # Make request to OpenAI API
    openai_api_key = OpenAI.api_key
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + openai_api_key
    }
    data = {
        'prompt': prompt,
        'max_tokens': 5,  # Adjust as needed
        'temperature': 0.7  # Adjust as needed
    }
    response = requests.post('https://api.openai.com/v1/completions', headers=headers, json=data)

    # Process response
    if response.ok:
        recommended_recipes = response.json().get('choices', [])
        # Extract relevant information from response and format as needed
        formatted_recipes = [recipe['text'].strip() for recipe in recommended_recipes]
        return jsonify(formatted_recipes)
    else:
        return jsonify({'error': 'Failed to fetch recipe recommendations'}), 500