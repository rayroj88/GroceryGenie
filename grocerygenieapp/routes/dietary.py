from flask import Blueprint, request, jsonify
from ..models import db, User, ShoppingList, Item, DietaryRestriction
import os


dietary_bp = Blueprint('dietary', __name__)

@dietary_bp.route('/filter_items', methods=['GET'])
def filter_items():
    # Get the diet type from the query parameter
    diet_type = request.args.get('diet', type=str)

    # Return an error if no diet type is provided
    if not diet_type:
        return jsonify({'error': 'Dietary restriction type is required.'}), 400

    # Query the database for the dietary restriction
    diet_restriction = DietaryRestriction.query.filter(DietaryRestriction.name.ilike(diet_type)).first()

    # Return an error if the dietary restriction is not found
    if not diet_restriction:
        return jsonify({'error': 'Dietary restriction not found.'}), 404

    # Query for items that have the specified dietary restriction
    items = Item.query.join(Item.restrictions).filter(DietaryRestriction.id == diet_restriction.id).all()

    # Convert the items to a JSON-friendly format
    items_json = [{'item_id': item.item_id, 'name': item.name, 'quantity': item.quantity} for item in items]

    # Return the filtered items
    return jsonify(items_json)