from flask import Blueprint, request, jsonify
import sqlite3

add_item_bp = Blueprint('add_item_bp', __name__)

# SQLite database setup
def create_table():
    conn = sqlite3.connect('shopping_list.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, item_text TEXT)''')
    conn.commit()
    conn.close()

@add_item_bp.route('/add_item', methods=['POST'])
def add_item():
    create_table()  # Ensure table exists
    data = request.get_json()
    item_text = data.get('item_text')

    if item_text:
        conn = sqlite3.connect('shopping_list.db')
        c = conn.cursor()
        c.execute("INSERT INTO items (item_text) VALUES (?)", (item_text,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Item added successfully'}), 200
    else:
        return jsonify({'error': 'Invalid request'}), 400