from flask import Blueprint, jsonify, request
import sqlite3

saved_lists_bp = Blueprint('saved_lists_bp', __name__)
fetch_list_bp = Blueprint('fetch_list_bp', __name__)

@saved_lists_bp.route('/get_saved_lists', methods=['GET'])
def get_saved_lists():
    conn = sqlite3.connect('shopping_list.db')
    c = conn.cursor()

    # Execute a custom query to retrieve saved list data
    # For example, assume you have a table named 'saved_lists'
    # with a column 'list_data' where each row contains JSON
    # data representing a saved list
    c.execute("SELECT list_data FROM saved_lists")
    saved_lists = [row[0] for row in c.fetchall()]

    conn.close()

    return jsonify({'saved_lists': saved_lists})
from flask import Blueprint, jsonify
import sqlite3

saved_lists_bp = Blueprint('saved_lists_bp', __name__)
@saved_lists_bp.route('/get_saved_lists', methods=['GET'])
def get_saved_lists():
    conn = sqlite3.connect('shopping_list.db')
    c = conn.cursor()

    # Fetch all lists from the database
    c.execute("SELECT id, list_data, created_at FROM lists")
    rows = c.fetchall()

    lists = []
    for row in rows:
        list_dict = {
            'id': row[0],
            'list_data': row[1],
            'created_at': row[2]
        }
        lists.append(list_dict)

    conn.close()
    return jsonify(lists)

@fetch_list_bp.route('/fetch_list_items', methods=['POST'])
def fetch_list_items():
    print('entered detch_list_items') #DELETEME
    list_id = request.json.get('listId')  # Extract list ID from request body

    conn = sqlite3.connect('shopping_list.db')
    c = conn.cursor()

    # Fetch items for the specified list ID from the database
    c.execute("SELECT item FROM list_items WHERE list_id = ?", (list_id,))
    rows = c.fetchall()

    items = [row[0] for row in rows]

    print('returning', items)

    conn.close()
    return jsonify(items)