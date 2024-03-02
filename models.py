from extensions import db 

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True, nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False)

class ShoppingList(db.Model):
    list_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    title = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False)
    last_updated = db.Column(db.DateTime, nullable=False)
    user = db.relationship('User', backref=db.backref('shoppinglists', lazy=True))

class Item(db.Model):
    item_id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('shopping_list.list_id'), nullable=False)
    name = db.Column(db.Text, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    checked = db.Column(db.Boolean, nullable=False)
    category = db.Column(db.Text, nullable=False)  # Add this line for category
    date_added = db.Column(db.DateTime, nullable=False)
    dietary_tags = db.Column(db.Text, nullable=True)  # Flexible text column, can be empty
    shopping_list = db.relationship('ShoppingList', backref=db.backref('items', lazy=True))
