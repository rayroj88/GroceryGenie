from flask import Blueprint, jsonify
import sqlite3

saved_lists_bp = Blueprint('saved_lists_bp', __name__)
def get_saved_lists():
    conn = sqlite3.connect('shopping_list.db')
    c = conn.cursor()

    c.execute("SELECT id, created_at FROM lists")
    saved_lists = [{'id': row[0], 'created_at': row[1]} for row in c.fetchall()]

    conn.close()

    return jsonify({'saved_lists': saved_lists})