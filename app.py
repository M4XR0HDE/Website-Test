import requests
from flask import Flask, send_from_directory, jsonify
import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR)

app = Flask(__name__, static_folder=STATIC_DIR, template_folder=STATIC_DIR)

@app.route('/')
@app.route('/index.html')
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

if __name__ == '__main__':
    app.run(debug=True)
