from flask import Flask
from flask import Blueprint, render_template, request, redirect, url_for, session
from werkzeug.security import check_password_hash
from models import User

auth_blueprint = Blueprint('auth', __name__)


# NEED TO ADD REGISTER FUNCTIONALITY
# Login page
@auth_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username == "admin" and password == "password":
            session['user_id'] = "admin"  # You can decide what to store in the session
            return redirect(url_for('home'))  # Assuming 'home' is the function name of your home page route
        
        # Query the database for the user
        user = User.query.filter_by(username=username).first()
        
        # If user exists and password is correct
        if user and check_password_hash(user.password_hash, password):
            session['user_id'] = user.user_id  # Store the user's ID in the session
            session['list_counter'] = user.list_counter  # Store the user's list counter in the session
            return redirect(url_for('home'))  # Redirect to the home page or dashboard
        else:
            return 'Invalid credentials'
    return render_template('login.html')