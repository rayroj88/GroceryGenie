from flask import Flask
from flask import Blueprint, render_template, request, redirect, url_for, session
from werkzeug.security import check_password_hash
from models import User

logout_blueprint = Blueprint('logout', __name__)

# Logout route
@logout_blueprint.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('auth.login'))