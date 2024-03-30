from flask import Flask, jsonify, render_template, request, redirect, url_for, session
import os
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from routes.auth import auth_blueprint
from routes.logout import logout_blueprint
from routes.register import register_blueprint
from routes.add_item import add_item_bp


#USE 'admin' AS USERNAME
#USE 'password' AS PASSWORD

app = Flask(__name__)
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

    # Placeholder for OpenAI API call and response parsing
    # Example: parsed_ingredients = ['Ingredient 1', 'Ingredient 2', ...]

    # For demonstration, echo back the received recipe name
    parsed_ingredients = [f"Received: {recipe_name}"]

    return jsonify(parsed_ingredients)

if __name__ == '__main__':
    app.run(debug=True)
