import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

function ResultCard({ result, loading, error }) {
  // Prepare chart data if result exists
  const chartData = result ? {
    labels: ['Churn Risk', 'Retention Probability'],
    datasets: [
      {
        data: [result.churn_probability, 1 - result.churn_probability],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',  // Red for churn
          'rgba(16, 185, 129, 0.8)',  // Green for retention
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  } : null;

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const percentage = Math.round(value * 100);
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    },
  };

  return (
    <div className="card h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Prediction Result</h2>
      
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Analyzing customer data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {!loading && !error && !result && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-gray-400 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          <p className="text-gray-600">Fill in the customer information and click "Predict Churn" to see the prediction result.</p>
        </div>
      )}
      
      {!loading && !error && result && (
        <div>
          <div className="mb-6">
            <div className="h-64">
              {chartData && <Doughnut data={chartData} options={chartOptions} />}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Churn Probability:</span>
              <span className="text-lg font-semibold">{(result.churn_probability * 100).toFixed(0)}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  result.churn_probability > 0.5 ? 'bg-red-600' : 'bg-green-600'
                }`}
                style={{ width: `${result.churn_probability * 100}%` }}
              ></div>
            </div>
            
            <div className="mt-6 p-4 rounded-md bg-gray-50 border border-gray-200">
              <p className={`text-lg font-medium ${
                result.churn_probability > 0.5 ? 'text-red-700' : 'text-green-700'
              }`}>
                {result.churn_result}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {result.churn_probability > 0.5 
                  ? 'This customer is at high risk of churning. Consider proactive retention strategies.'
                  : 'This customer is likely to stay. Continue providing excellent service to maintain loyalty.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
