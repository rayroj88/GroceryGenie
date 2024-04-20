# test_dietary.py
import pytest
from grocerygenieapp import create_app, db
from grocerygenieapp.models import User, ShoppingList, Item, DietaryRestriction
from datetime import datetime

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/shopping_list.db'  # Adjust the path if necessary
    
    with app.app_context():
        db.create_all()
        yield app.test_client()  # This allows you to use the test client in your tests
        db.drop_all()

def test_filter_items_no_diet(client):
    response = client.get('/filter_items')  # No diet provided in the query
    assert response.status_code == 400
    assert response.get_json() == {'error': 'Dietary restriction type is required.'}

def test_filter_items_valid_diet(client):
    # Create instances required for the Item with the 'Vegan' restriction
    user = User(username='testuser', email='test@example.com', password_hash='hashedpassword', date_created=datetime.utcnow())
    db.session.add(user)
    db.session.commit()

    shopping_list = ShoppingList(user_id=user.user_id, title='Test List', date_created=datetime.utcnow(), last_updated=datetime.utcnow())
    db.session.add(shopping_list)
    db.session.commit()

    vegan = DietaryRestriction(name='Vegan')
    db.session.add(vegan)
    db.session.commit()

    tofu = Item(name='Tofu', quantity=1, checked=False, date_added=datetime.utcnow(), list_id=shopping_list.list_id, restrictions=[vegan])
    db.session.add(tofu)
    db.session.commit()

    response = client.get('/filter_items?diet=Vegan')
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1
    assert data[0]['name'] == 'Tofu'

def test_filter_items_invalid_diet(client):
    response = client.get('/filter_items?diet=NonExistentDiet')
    assert response.status_code == 404
    assert response.get_json() == {'error': 'Dietary restriction not found.'}

# Add more tests as
