from flask import Blueprint, jsonify
import sqlite3

saved_lists_bp = Blueprint('saved_lists_bp', __name__)
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