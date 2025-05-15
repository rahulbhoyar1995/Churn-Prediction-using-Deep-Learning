import numpy as np
import tensorflow as tf
import pandas as pd
import pickle
from fastapi import FastAPI
from pydantic import BaseModel
from enum import Enum
import warnings
from fastapi.middleware.cors import CORSMiddleware
warnings.filterwarnings("ignore")





# Load the trained model
model = tf.keras.models.load_model('models/model.h5')

# Load encoders and scaler
with open('models/label_encoder_gender.pkl', 'rb') as file:
    label_encoder_gender = pickle.load(file)

with open('models/onehot_encoder_geo.pkl', 'rb') as file:
    onehot_encoder_geo = pickle.load(file)

with open('models/scaler.pkl', 'rb') as file:
    scaler = pickle.load(file)

# FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] to be more secure
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enums for consistent input
class GeographyEnum(str, Enum):
    france = "France"
    germany = "Germany"
    spain = "Spain"

class GenderEnum(str, Enum):
    male = "Male"
    female = "Female"

# Input schema
class InputData(BaseModel):
    credit_score: float
    geography: GeographyEnum
    gender: GenderEnum
    age: int
    tenure: int
    balance: float
    num_of_products: int
    has_cr_card: int
    is_active_member: int
    estimated_salary: float

@app.post("/predict-churn/")
async def predict_churn(input_data: InputData):
    # Convert input to DataFrame
    input_dict = {
        'CreditScore': [input_data.credit_score],
        'Gender': [label_encoder_gender.transform([input_data.gender])[0]],
        'Age': [input_data.age],
        'Tenure': [input_data.tenure],
        'Balance': [input_data.balance],
        'NumOfProducts': [input_data.num_of_products],
        'HasCrCard': [input_data.has_cr_card],
        'IsActiveMember': [input_data.is_active_member],
        'EstimatedSalary': [input_data.estimated_salary]
    }
    df = pd.DataFrame(input_dict)

    # One-hot encode geography
    geo_encoded = onehot_encoder_geo.transform([[input_data.geography]]).toarray()
    geo_encoded_df = pd.DataFrame(geo_encoded, columns=onehot_encoder_geo.get_feature_names_out(['Geography']))

    # Merge features
    full_input = pd.concat([df, geo_encoded_df], axis=1)

    # Scale features
    scaled_input = scaler.transform(full_input)

    # Predict churn
    prediction = model.predict(scaled_input)
    prediction_proba = prediction[0][0]
    churn_result = "The customer is likely to churn." if prediction_proba > 0.5 else "The customer is not likely to churn."

    return {
        "churn_probability": round(float(prediction_proba), 2),
        "churn_result": churn_result
    }

# Run using: uvicorn your_filename:app --reload

