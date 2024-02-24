from flask import Flask, render_template, request, redirect, url_for, session
import os
from datetime import datetime
from extensions import db

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

# Import models after db is defined
from models import User, ShoppingList, Item

# Homepage currently index.html
@app.route('/')
def home():
    #return render_template('index.html')
    
    if 'user_id' in session:
        return render_template('index.html')  # Render home page if user is logged in
    else:
        return redirect(url_for('login'))  # Redirect to login page if not logged in

# Login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Placeholder for the basic authentication logic, this will need to be changed.
        username = request.form['username']
        password = request.form['password']
        
        # This is a placeholder, this will need to check against a databse in the future?
        if username == "admin" and password == "password":
            session['user_id'] = username
            return redirect(url_for('home'))
        else:
            return 'Invalid credentials'
    return render_template('login.html')

# Logout route
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login'))

# Register page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Example: Retrieve username, email, and password from form data
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        new_user = User(username=username, email=email, password_hash=password, date_created=datetime.now())
        
        db.session.add(new_user)
        try:
            db.session.commit()
            return "User registered successfully!"
        except Exception as e:
            db.session.rollback()
            return "Error: " + str(e)

if __name__ == '__main__':
    app.run(debug=True)
