from flask import Blueprint, request, jsonify
import sqlite3
import json
from datetime import datetime
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

        # Insert a new list with the current timestamp
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        c.execute("INSERT INTO lists (created_at) VALUES (?)", (current_time,))
        list_id = c.lastrowid  # Get the ID of the newly inserted list
        
        # Insert each item into the items table with the list ID
        for item_text in data:
            if isinstance(item_text, str):
                c.execute("INSERT INTO items (list_id, item_text) VALUES (?, ?)", (list_id, item_text))

        conn.commit()
        conn.close()
        return jsonify({'message': 'List saved successfully'}), 200
    else:
        return jsonify({'error': 'Invalid request. Expecting a list of items.'}), 400