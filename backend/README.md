# Churn Prediction Backend

![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15.0-orange)
![Python](https://img.shields.io/badge/Python-3.9-blue)

## Overview

This is the backend API for the Churn Prediction project. It provides a RESTful API for predicting customer churn using a deep learning model built with TensorFlow.

## Tech Stack

- **FastAPI**: Python web framework for building APIs
- **TensorFlow**: Deep learning library for model training and inference
- **Scikit-learn**: For data preprocessing and feature engineering
- **Pandas**: Data manipulation and analysis
- **Uvicorn**: ASGI server for running FastAPI applications
- **Docker**: Containerization for deployment

## Features

- **RESTful API**: Well-documented API endpoints
- **Deep Learning Model**: Neural network for churn prediction
- **Data Preprocessing**: Automatic preprocessing of input data
- **CORS Support**: Cross-Origin Resource Sharing enabled
- **Swagger Documentation**: Interactive API documentation
- **Docker Support**: Containerized for easy deployment

## Directory Structure

```plaintext
backend/
├── models/                 # Trained model and encoders
│   ├── model.h5           # TensorFlow model
│   ├── scaler.pkl         # StandardScaler for numerical features
│   ├── label_encoder_gender.pkl  # Label encoder for gender
│   └── onehot_encoder_geo.pkl    # One-hot encoder for geography
├── modelling/              # Jupyter notebooks for model development
│   ├── model_creation.ipynb  # Notebook for model training
│   └── prediction.ipynb      # Notebook for testing predictions
├── data/                   # Dataset files
│   └── churn_customer_data.csv  # Customer data with churn labels
├── app.py                  # Main FastAPI application
├── requirements.txt        # Python dependencies
└── Dockerfile              # Docker configuration
```

## Installation and Setup

### Prerequisites

- Python 3.9 or higher
- pip (Python package installer)

### Development Setup

1. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the FastAPI server:

   ```bash
   uvicorn app:app --reload
   ```

4. Access the API documentation at `http://localhost:8000/docs`

### Docker Setup

1. Build the Docker image:

   ```bash
   docker build -t churn-prediction-backend .
   ```

2. Run the container:

   ```bash
   docker run -p 8000:8000 churn-prediction-backend
   ```

## API Endpoints

### Predict Churn

- **URL**: `/predict-churn/`
- **Method**: POST
- **Request Body**:

  ```json
  {
    "credit_score": 650,
    "geography": "France",
    "gender": "Male",
    "age": 35,
    "tenure": 5,
    "balance": 50000,
    "num_of_products": 1,
    "has_cr_card": 1,
    "is_active_member": 1,
    "estimated_salary": 75000
  }
  ```

- **Response**:

  ```json
  {
    "churn_probability": 0.01,
    "churn_result": "The customer is not likely to churn."
  }
  ```

## Model Information

### Model Architecture

The churn prediction model is a neural network built with TensorFlow. It uses the following architecture:

- Input layer with customer features
- Hidden layers with ReLU activation
- Output layer with sigmoid activation for binary classification

### Model Features

The model was trained on a dataset of bank customer information with the following features:

- Credit Score
- Geography (One-hot encoded)
- Gender (Label encoded)
- Age
- Tenure
- Balance
- Number of Products
- Has Credit Card
- Is Active Member
- Estimated Salary

### Data Preprocessing

The API automatically preprocesses input data before making predictions:

1. Label encoding for categorical features (Gender)
2. One-hot encoding for categorical features (Geography)
3. Feature scaling using StandardScaler

## Development

### Model Training

The model was trained using the Jupyter notebook in the `modelling` directory. The notebook includes:

- Data loading and exploration
- Feature engineering
- Model architecture definition
- Training and evaluation
- Model saving

### Adding New Features

To add new features to the model:

1. Update the `InputData` class in `app.py`
2. Modify the preprocessing steps in the `predict_churn` function
3. Retrain the model with the new features
4. Update the model files in the `models` directory

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.