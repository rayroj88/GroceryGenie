from flask import Flask
from flask_migrate import Migrate
from .extensions import db
from .routes.auth import auth_blueprint
from .routes.logout import logout_blueprint
from .routes.register import register_blueprint
from .routes.save_list import save_list_bp
from .routes.get_saved_lists import saved_lists_bp, fetch_list_bp
import os

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.urandom(24)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/shopping_list.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate = Migrate(app, db)

    app.register_blueprint(auth_blueprint)
    app.register_blueprint(logout_blueprint)
    app.register_blueprint(register_blueprint)
    app.register_blueprint(save_list_bp)
    app.register_blueprint(saved_lists_bp)
    app.register_blueprint(fetch_list_bp)

    return app