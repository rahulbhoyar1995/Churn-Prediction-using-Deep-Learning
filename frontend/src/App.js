import React, { useState } from 'react';
import Header from './components/Header';
import ChurnForm from './components/ChurnForm';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Customer Churn Prediction
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ChurnForm 
                setResult={setResult} 
                setLoading={setLoading} 
                setError={setError} 
              />
            </div>
            <div>
              <ResultCard 
                result={result} 
                loading={loading} 
                error={error} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
