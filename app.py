from flask import Flask, jsonify, render_template, request, redirect, url_for, session
import os
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from routes.auth import auth_blueprint
from routes.logout import logout_blueprint
from routes.register import register_blueprint
from routes.add_item import add_item_bp
from dotenv import load_dotenv
<<<<<<< HEAD
<<<<<<< HEAD
from openai import OpenAI
=======
import openai
>>>>>>> acce994 (got api key set up and working on api call)
=======
from openai import OpenAI
>>>>>>> 1dc8868 (Getting 200 on api call no output to grocery list)

load_dotenv()

app = Flask(__name__)

<<<<<<< HEAD
<<<<<<< HEAD
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
=======
openai.api_key = os.getenv('OPENAI_API_KEY')
>>>>>>> acce994 (got api key set up and working on api call)
=======
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
>>>>>>> 1dc8868 (Getting 200 on api call no output to grocery list)
# Secret key needed?
app.secret_key = os.urandom(24)

# Config db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shopping_list.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
# Create all tables in db
with app.app_context():
    db.create_all()

app.register_blueprint(auth_blueprint)
app.register_blueprint(logout_blueprint)
app.register_blueprint(register_blueprint)
app.register_blueprint(add_item_bp)


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
<<<<<<< HEAD
<<<<<<< HEAD
    
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

=======
=======
    
<<<<<<< HEAD
    prompt = f"Give me the required ingredients to make a recipe for {recipe_name}. " \
        "List ingredients as you would see on a recipe card. For example:\n" \
        "- Flour: 2 cups\n" \
        "- Sugar: 1 cup\n" \
        f"Provide a list like this for {recipe_name}"
>>>>>>> acce994 (got api key set up and working on api call)
=======
    system_message = "You are a helpful assistant. Provide a list of ingredients for recipes without any additional content. List ingredients as you would see on a recipe card. For example: Flour: 2 cups. Sugar: 1 cup. and so on..."
    user_message = f"What are the ingredients needed for {recipe_name}?"
>>>>>>> 1dc8868 (Getting 200 on api call no output to grocery list)


    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Updated to a common chat model name for example
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ]
        )
        if response.choices:
            ingredients_list = response.choices[0].message.content.strip()
        else:
            ingredients_list = "No ingredients found."
        
        return jsonify({"ingredients": ingredients_list})
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return jsonify({"error": "Failed to process the recipe"}), 500

<<<<<<< HEAD
    return jsonify(parsed_ingredients)
>>>>>>> acbb55a (Route added for api call)
=======
>>>>>>> 1dc8868 (Getting 200 on api call no output to grocery list)

if __name__ == '__main__':
    app.run(debug=True)
