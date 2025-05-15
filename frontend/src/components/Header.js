import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-700 to-secondary-700 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white mr-3" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <h1 className="text-2xl font-bold text-white">Churn Prediction</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a 
                  href="https://github.com/rahulbhoyar1995/Churn-Prediction-using-Deep-Learning" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary-100 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:text-primary-100 transition-colors"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
