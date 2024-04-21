from flask import Blueprint, jsonify, request
import sqlite3

fetch_list_bp = Blueprint('fetch_list_bp', __name__)
saved_lists_bp = Blueprint('saved_lists_bp', __name__)
@saved_lists_bp.route('/get_saved_lists', methods=['GET'])
def get_saved_lists():
    try:
        with sqlite3.connect('instance/list.db') as conn:
            c = conn.cursor()
            c.execute("SELECT id, list_data, created_at FROM lists")
            rows = c.fetchall()
            lists = [{'id': row[0], 'list_data': row[1], 'created_at': row[2]} for row in rows]
        return jsonify(lists)
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500

@fetch_list_bp.route('/fetch_list_items', methods=['POST'])
def fetch_list_items():
    list_id = request.json.get('listId')
    if not list_id:
        return jsonify({'error': 'No list ID provided'}), 400

    try:
        with sqlite3.connect('instance/list.db') as conn:
            c = conn.cursor()
            c.execute("SELECT list_data FROM lists WHERE id = ?", (list_id,))
            rows = c.fetchall()
            items = [row[0] for row in rows]
        return jsonify(items)
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500