import requests
from flask import Flask, send_from_directory, jsonify
import os
import json
from werkzeug.security import generate_password_hash, check_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR)

app = Flask(__name__, static_folder=STATIC_DIR, template_folder=STATIC_DIR)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    file_path = os.path.join(app.static_folder, filename)
    if os.path.isfile(file_path):
        return send_from_directory(app.static_folder, filename)
    else:
        # fallback to index.html for unknown routes
        return send_from_directory(app.static_folder, 'index.html')
    
@app.route('/api/news')
def get_news():
    # Load API keys from JSON file
    with open(os.path.join(BASE_DIR, 'api_keys.json')) as f:
        keys = json.load(f)
    api_key = keys.get('your_newsapi_key', '')
    url = 'https://newsapi.org/v2/everything'
    params = {
        'q': 'cybersecurity', #search query for cybersecurity news
        'language': 'en', #language set to english
        'pageSize': 5, #limit to 5 articles
        'apiKey': api_key #api key for authentication
    }
    response = requests.get(url, params=params) #make GET request to newsapi
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to fetch news'}), response.status_code

USERS_FILE = 'users.json'

def load_users():
    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    except Exception:
        return []

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'success': False, 'message': 'Missing username or password'}), 400
    users = load_users()
    if any(u['username'] == username for u in users):
        return jsonify({'success': False, 'message': 'Username already exists'}), 409
    hashed_pw = generate_password_hash(password)
    users.append({'username': username, 'password': hashed_pw})
    save_users(users)
    return jsonify({'success': True, 'message': 'User registered'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'success': False, 'message': 'Missing username or password'}), 400
    users = load_users()
    for user in users:
        if user['username'] == username and check_password_hash(user['password'], password):
            return jsonify({'success': True, 'message': 'Login successful'})
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)
