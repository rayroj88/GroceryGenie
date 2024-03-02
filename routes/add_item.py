from flask import Blueprint, request, redirect, session
from models import User, Item
from extensions import db

additem_blueprint = Blueprint('add_item', __name__)

@additem_blueprint.route('/add_item', methods=['POST'])
def add_item():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        item_text = request.form['item_text']
        new_item = Item(text=item_text, user_id=user.id)
        db.session.add(new_item)
        db.session.commit()
    return redirect('/')