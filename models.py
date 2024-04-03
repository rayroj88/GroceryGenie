from extensions import db 
 
         # Association table for Items and DietaryRestrictions
item_dietary_restriction = db.Table('item_dietary_restriction',
    db.Column('item_id', db.Integer, db.ForeignKey('item.item_id'), primary_key=True),
    db.Column('restriction_id', db.Integer, db.ForeignKey('dietary_restriction.id'), primary_key=True)
     ) 

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
    date_added = db.Column(db.DateTime, nullable=False)
    shopping_list = db.relationship('ShoppingList', backref=db.backref('items', lazy=True))
    restrictions = db.relationship('DietaryRestriction', secondary=item_dietary_restriction, lazy='subquery',
                                   backref=db.backref('items', lazy=True))
   
class DietaryRestriction(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(50), nullable=False)
        description = db.Column(db.Text)

    
