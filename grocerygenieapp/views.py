from flask import render_template, request, Blueprint, redirect
from flask import url_for

site = Blueprint('site', __name__)

@site.route('/')
def home():
    
    return redirect(url_for('auth.login'))  # Redirect to login page if not logged in

@site.route('/shoplist')
def main():
    return render_template('index.html')

@site.route('/about')
def about():
    return render_template('about.html')

@site.route('/contact')
def contact():
    return render_template('contact.html')