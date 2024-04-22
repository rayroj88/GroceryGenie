from flask import Blueprint, request, jsonify
import sqlite3
import json
from datetime import datetime

add_item_bp = Blueprint('add_item_bp', __name__)

# SQLite database setup
def create_table():
    conn = sqlite3.connect('shopping_list.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, list_data TEXT, created_at TIMESTAMP)''')
    conn.commit()
    conn.close()

@add_item_bp.route('/add_item', methods=['POST'])
def add_item():
    create_table()  # Ensure table exists
    data = request.get_json()
    
    if isinstance(data, list):
        conn = sqlite3.connect('shopping_list.db')
        c = conn.cursor()

        # Convert list data to JSON string
        #list_data = json.dumps(data)
        for item in data:
            # Get the item details and dietary restrictions from the request data
            item_data = item.get("item", {})
            name = item_data.get("name")
            quantity = item_data.get("quantity")
            dietary_restrictions = ','.join(item.get("dietary_restrictions", []))
            current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            # Insert the data into the database
            c.execute("INSERT INTO items (name, quantity, dietary_restrictions, created_at) VALUES (?, ?, ?, ?)", 
                      (name, quantity, dietary_restrictions, current_time))
        
        conn.commit()
        conn.close()
        return jsonify({'message': 'Items added successfully'}), 200
    else:
        return jsonify({'error': 'Invalid request. Expecting a list of items.'}), 400

# Add any other Flask route definitions here