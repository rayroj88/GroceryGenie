from flask import Flask, jsonify, render_template, request, redirect, url_for, session
import os
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from routes.auth import auth_blueprint
from routes.logout import logout_blueprint
from routes.register import register_blueprint
from routes.save_list import save_list_bp
from routes.get_saved_lists import saved_lists_bp
from dotenv import load_dotenv
from openai import OpenAI
from flask_migrate import Migrate

from models import db, User, ShoppingList, Item, DietaryRestriction



load_dotenv()

app = Flask(__name__)


client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

OpenAI.api_key = os.getenv('OPENAI_API_KEY')


# Secret key needed?
app.secret_key = os.urandom(24)

# Config db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shopping_list.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
# Initialize Flask-Migrate right after db.init_app(app)
migrate = Migrate(app, db)
# Create all tables in db
with app.app_context():
    db.create_all()

app.register_blueprint(auth_blueprint)
app.register_blueprint(logout_blueprint)
app.register_blueprint(register_blueprint)
app.register_blueprint(save_list_bp)
app.register_blueprint(saved_lists_bp)


# Homepage currently index.html but sent to login if not logged in
@app.route('/')
def home():
    
    if 'user_id' in session:
        return render_template('index.html')  # Render home page if user is logged in
    else:
        return redirect(url_for('auth.login'))  # Redirect to login page if not logged in

@app.route('/process_recipe', methods=['POST'])
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

# About page
@app.route('/about')
def about():
    return render_template('about.html')

# Contact page
@app.route('/contact')
def contact():
    return render_template('contact.html')

# Add this new route here
@app.route('/api/items/filter', methods=['GET'])
def filter_items():
    # Get the diet type from the query parameter
    diet_type = request.args.get('diet', type=str)

    # Return an error if no diet type is provided
    if not diet_type:
        return jsonify({'error': 'Dietary restriction type is required.'}), 400

    # Query the database for the dietary restriction
    diet_restriction = DietaryRestriction.query.filter(DietaryRestriction.name.ilike(diet_type)).first()

    # Return an error if the dietary restriction is not found
    if not diet_restriction:
        return jsonify({'error': 'Dietary restriction not found.'}), 404

    # Query for items that have the specified dietary restriction
    items = Item.query.join(Item.restrictions).filter(DietaryRestriction.id == diet_restriction.id).all()

    # Convert the items to a JSON-friendly format
    items_json = [{'item_id': item.item_id, 'name': item.name, 'quantity': item.quantity} for item in items]

    # Return the filtered items
    return jsonify(items_json)



if __name__ == '__main__':
    app.run(debug=True)
