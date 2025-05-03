import numpy as np
import tensorflow as tf
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
import pandas as pd
import pickle
from fastapi import FastAPI
from pydantic import BaseModel, Field
from enum import Enum

# Load the trained model
model = tf.keras.models.load_model('models/model.h5')

# Load the encoders and scaler
with open('models/label_encoder_gender.pkl', 'rb') as file:
    label_encoder_gender = pickle.load(file)

with open('models/onehot_encoder_geo.pkl', 'rb') as file:
    onehot_encoder_geo = pickle.load(file)

with open('models/scaler.pkl', 'rb') as file:
    scaler = pickle.load(file)

# FastAPI app
app = FastAPI()

# Enum for Geography and Gender
class GeographyEnum(str, Enum):
    france = "France"
    germany = "Germany"
    spain = "Spain"

class GenderEnum(str, Enum):
    male = "Male"
    female = "Female"

# Define input data model
class InputData(BaseModel):
    geography: GeographyEnum
    gender: GenderEnum
    age: int
    balance: float
    credit_score: float
    estimated_salary: float
    tenure: int
    num_of_products: int
    has_cr_card: int
    is_active_member: int

@app.post("/predict-churn/")
async def predict_churn(input_data: InputData):
    # Prepare the input data as pandas DataFrame
    data = pd.DataFrame({
        'CreditScore': [input_data.credit_score],
        'Gender': [label_encoder_gender.transform([input_data.gender])[0]],
        'Age': [input_data.age],
        'Tenure': [input_data.tenure],
        'Balance': [input_data.balance],
        'NumOfProducts': [input_data.num_of_products],
        'HasCrCard': [input_data.has_cr_card],
        'IsActiveMember': [input_data.is_active_member],
        'EstimatedSalary': [input_data.estimated_salary]
    })

    # One-hot encode 'Geography'
    geo_encoded = onehot_encoder_geo.transform([[input_data.geography]]).toarray()
    geo_encoded_df = pd.DataFrame(geo_encoded, columns=onehot_encoder_geo.get_feature_names_out(['Geography']))

    # Combine one-hot encoded columns with input data
    input_data_processed = pd.concat([data.reset_index(drop=True), geo_encoded_df], axis=1)

    # Scale the input data
    input_data_scaled = scaler.transform(input_data_processed)

    # Predict churn
    prediction = model.predict(input_data_scaled)
    prediction_proba = prediction[0][0]

    # Determine churn likelihood
    if prediction_proba > 0.5:
        churn_result = "The customer is likely to churn."
    else:
        churn_result = "The customer is not likely to churn."

    return {
        "churn_probability": round(prediction_proba, 2),
        "churn_result": churn_result
    }

# To run the FastAPI app, you would use the following command:
# uvicorn filename:app --reload

