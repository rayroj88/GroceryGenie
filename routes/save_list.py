from flask import Blueprint, request, jsonify
import sqlite3
import json
from datetime import datetime
from datetime import datetime

save_list_bp = Blueprint('save_list_bp', __name__)

# SQLite database setup
def create_table():
    conn = sqlite3.connect('shopping_list.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, list_data TEXT, created_at TIMESTAMP)''')
    conn.commit()
    conn.close()

@save_list_bp.route('/save_list', methods=['POST'])
def save_list():
    create_table()  # Ensure table exists
    data = request.get_json()
    
    if isinstance(data, list):
        conn = sqlite3.connect('shopping_list.db')
        c = conn.cursor()

        # Convert list data to JSON string
        list_data = json.dumps(data)
        
        # Insert the list data and timestamp into the lists table
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        c.execute("INSERT INTO lists (list_data, created_at) VALUES (?, ?)", (list_data, current_time))

        conn.commit()
        conn.close()
        return jsonify({'message': 'List saved successfully'}), 200
    else:
        return jsonify({'error': 'Invalid request. Expecting a list of items.'}), 400