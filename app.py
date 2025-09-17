from flask import Flask, send_from_directory
import os

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
        # fallback to index.html for unknown routes (SPA behavior)
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
