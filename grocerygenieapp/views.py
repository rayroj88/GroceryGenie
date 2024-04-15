from flask import render_template, request, Blueprint
from flask import url_for

site = Blueprint('site', __name__)

@site.route('/')
def home():
    
        return (url_for('auth.login'))  # Redirect to login page if not logged in

@site.route('/about')
def about():
    return render_template('about.html')

# Contact page
@site.route('/contact')
def contact():
    return render_template('contact.html')