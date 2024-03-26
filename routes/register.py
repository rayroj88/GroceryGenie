from flask import Flask
from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash
from datetime import datetime
from models import User
from extensions import db
from models import User


register_blueprint = Blueprint('register', __name__)

# Register page
@register_blueprint.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        # Hash the password before storing it
        hashed_password = generate_password_hash(password)
        
        new_user = User(username=username, email=email, password_hash=hashed_password, date_created=datetime.now(), list_counter=0)
        
        db.session.add(new_user)
        try:
            db.session.commit()
            # Flash a message to the user
            flash("User registered successfully!", "success")
            # Redirect to the login page
            return redirect(url_for('auth.login'))
        except Exception as e:
            db.session.rollback()
            return "Error: " + str(e)
    
    else:
        return render_template('create_account.html')