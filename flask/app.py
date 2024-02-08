from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os
load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['WEATHER_API_KEY'] = os.getenv('WEATHER_API_KEY')

secret_key = os.getenv('WEATHER_API_KEY')

@app.route('/vc/weather/api')
def get_data():
    response = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q=LasVegas&appid={secret_key}')
    if response.status_code == 200:
        data = response.json()
    return data

if __name__ == '__main__':
    app.run(debug=True)