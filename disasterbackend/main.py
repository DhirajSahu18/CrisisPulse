from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
from hugchat import hugchat
from hugchat.login import Login
import json
from dotenv import load_dotenv
import os

app = Flask(__name__)

CORS(app,origins="*")

# Load the saved model
loaded_model1 = joblib.load('model_precip.joblib')
loaded_model2 = joblib.load('model_max.joblib')
loaded_model3 = joblib.load('model_min.joblib')
load_dotenv()

email = os.getenv('HUGGINGFACE_EMAIL')
password = os.getenv('HUGGINGFACE_PASSWORD')


# Log in to huggingface and grant authorization to huggingchat
sign = Login(email, password)
cookies = sign.login()

# Save cookies to the local directory
cookie_path_dir = "./cookies_snapshot"
sign.saveCookiesToDir(cookie_path_dir)

# Load cookies when you restart your program:
# sign = login(email, None)
# cookies = sign.loadCookiesFromDir(cookie_path_dir) # This will detect if the JSON file exists, return cookies if it does and raise an Exception if it's not.

# Create a ChatBot
chatbot = hugchat.ChatBot(cookies=cookies.get_dict())  # or cookie_path="usercookies/<email>.json"

@app.route('/')
def home():
    return 'Hello, this is the homepage!'


@app.route('/predict', methods=['POST'])
def predict():
    # Get input from the form
    precip = float(request.json.get('precip'))
    temp_max = float(request.json.get('temp_max'))
    temp_min = float(request.json.get('temp_min'))
    month_day_max = float(request.json.get('month_day_max'))
    max_min = float(request.json.get('max_min'))
    monthly_avg = float(request.json.get('monthly_avg'))
    day_of_year_avg = float(request.json.get('day_of_year_avg'))

    # Prepare input data for prediction
    input_data = pd.DataFrame({
        "precip": [precip],
        "temp_max": [temp_max],
        "temp_min": [temp_min],
        "month_day_max": [month_day_max],
        "max_min": [max_min],
        "monthly_avg": [monthly_avg],
        "day_of_year_avg": [day_of_year_avg]
    })

    # Make predictions
    predictions1 = loaded_model1.predict(input_data)
    predictions2 = loaded_model2.predict(input_data)
    predictions3 = loaded_model3.predict(input_data)

    # Display the result
    return jsonify(precip=predictions1[0], max=predictions2[0], min=predictions3[0])

@app.route('/chatbot', methods=['POST'])
def chat():
    query = request.json.get('query')
    # non stream response
    query_result = chatbot.query(query)
    print(query_result)
    return jsonify(result= query_result.text) # or query_result.text or query_result["text"]

print("hello")

if __name__ == '__main__':
    app.run(debug=True)