# tests/test_routes.py
import pytest
from flask import Flask
from groverygenie.routes import recipe_bp 
from unittest.mock import patch, MagicMock


@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(recipe_bp)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_process_recipe(client):
    # Mock data to be sent via POST
    test_data = {"recipe_name": "Chocolate Cake"}
    # Expected response format
    expected_response = {
        "ingredients": ["Flour: 2 cups", "Sugar: 1 cup"]
    }
    # Patch the OpenAI API call
    with patch('yourapplication.routes.openai.ChatCompletion.create') as mock_openai:
        mock_openai.return_value = MagicMock(choices=[
            MagicMock(content="Flour: 2 cups\nSugar: 1 cup")
        ])
        response = client.post('/process_recipe', json=test_data)
        assert response.status_code == 200
        assert response.json == expected_response
