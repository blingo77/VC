from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route('/vc/weather/api')
def get_data():
    response = requests.get('https://api.openweathermap.org/data/2.5/weather?q=LasVegas&appid=4853bfbd9f9ef6b8a3d62c364c7a4011')
    if response.status_code == 200:
        data = response.json()
    return data

if __name__ == '__main__':
    app.run(debug=True)