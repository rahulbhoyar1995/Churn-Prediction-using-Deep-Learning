import React, { useState } from 'react';
import axios from 'axios';

const initialFormData = {
  credit_score: 650,
  geography: 'France',
  gender: 'Male',
  age: 35,
  tenure: 5,
  balance: 50000,
  num_of_products: 1,
  has_cr_card: 1,
  is_active_member: 1,
  estimated_salary: 75000
};

function ChurnForm({ setResult, setLoading, setError }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    
    // Convert numeric fields to numbers
    if (['credit_score', 'age', 'tenure', 'balance', 'num_of_products', 'has_cr_card', 'is_active_member', 'estimated_salary'].includes(name)) {
      parsedValue = parseFloat(value);
    }
    
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:8000/predict-churn/', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error predicting churn:', error);
      setError('Failed to predict churn. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credit Score
            </label>
            <input
              type="number"
              name="credit_score"
              value={formData.credit_score}
              onChange={handleChange}
              className="form-input"
              min="300"
              max="900"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Geography
            </label>
            <select
              name="geography"
              value={formData.geography}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Spain">Spain</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
              min="18"
              max="100"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenure (years)
            </label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              className="form-input"
              min="0"
              max="20"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Balance
            </label>
            <input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              className="form-input"
              min="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Products
            </label>
            <input
              type="number"
              name="num_of_products"
              value={formData.num_of_products}
              onChange={handleChange}
              className="form-input"
              min="1"
              max="4"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Has Credit Card
            </label>
            <select
              name="has_cr_card"
              value={formData.has_cr_card}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Is Active Member
            </label>
            <select
              name="is_active_member"
              value={formData.is_active_member}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Salary
            </label>
            <input
              type="number"
              name="estimated_salary"
              value={formData.estimated_salary}
              onChange={handleChange}
              className="form-input"
              min="0"
              required
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full btn btn-primary"
          >
            Predict Churn
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChurnForm;
