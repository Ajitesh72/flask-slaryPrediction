import pandas as pd
import numpy as np
import json
from sklearn.preprocessing import LabelEncoder
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

model = pickle.load(open("server/model.pkl", "rb"))


@app.route("/")
def hello():
  return "Hello World!"


@app.route("/predict", methods=['POST'])
def predict():
    request_data = request.get_json(force=True)
    print("request_data", request_data)
    print("request_data", request_data['textfield1'])
    textfield1 = request_data['textfield1']
    print("yrs exp", textfield1)
    YearsExperience = np.array([[textfield1]], dtype=float)
    # float_features = [float(x) for x in request.form.values()]
    # features = [np.array(float_features)]
    # print("features sei pehle")
    # print(features)
    # print("features sei baad")
    prediction = model.predict(YearsExperience)
    print(prediction)

   # Create a dictionary with the feature name and predicted value
    prediction_dict = {'salary': prediction[0]}
    print("predic_dict:",prediction_dict)

  # Serialize the Python dictionary using the JSON format
    salaryPrediction = json.dumps(prediction_dict)
    print(salaryPrediction)

    return({"salary":salaryPrediction})

if __name__ == "__main__":
  app.run()