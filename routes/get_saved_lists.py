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