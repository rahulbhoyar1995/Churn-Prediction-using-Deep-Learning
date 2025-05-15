# Churn Prediction Frontend

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-38B2AC)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.0-FF6384)

## Overview

This is the frontend application for the Churn Prediction project. It provides a user-friendly interface for inputting customer data and visualizing churn prediction results.

## Tech Stack

- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Chart.js**: JavaScript library for data visualization
- **Axios**: HTTP client for API requests
- **React Chartjs-2**: React wrapper for Chart.js
- **Headless UI**: Unstyled, accessible UI components
- **Heroicons**: Beautiful hand-crafted SVG icons

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Form**: User-friendly form for inputting customer data
- **Real-time Validation**: Form validation for input fields
- **Data Visualization**: Visual representation of prediction results
- **Modern UI**: Clean and intuitive user interface
- **Error Handling**: Graceful handling of API errors

## Directory Structure

```plaintext
frontend/
├── public/                # Static files
│   ├── index.html        # HTML template
│   ├── favicon.ico       # Favicon
│   └── manifest.json     # Web app manifest
├── src/                   # Source code
│   ├── components/       # React components
│   │   ├── ChurnForm.js  # Form component for input
│   │   ├── ResultCard.js # Component for displaying results
│   │   ├── Header.js     # Header component
│   │   └── Footer.js     # Footer component
│   ├── App.js            # Main application component
│   ├── index.js          # Entry point
│   └── index.css         # Global styles with Tailwind
├── package.json          # Node.js dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── Dockerfile            # Docker configuration
```

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Development Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

1. Create a production build:

   ```bash
   npm run build
   ```

2. The build files will be in the `build` directory

## Docker Setup

1. Build the Docker image:

   ```bash
   docker build -t churn-prediction-frontend .
   ```

2. Run the container:

   ```bash
   docker run -p 3000:80 churn-prediction-frontend
   ```

## Component Overview

### ChurnForm Component

The `ChurnForm` component provides a form for users to input customer data. It includes:

- Input fields for customer information
- Form validation
- Submit button for prediction
- Error handling for API requests

### ResultCard Component

The `ResultCard` component displays the prediction results, including:

- Churn probability
- Visual representation using Chart.js
- Interpretation of the prediction
- Loading state during API requests

### Header Component

The `Header` component displays the application header with:

- Application title
- Navigation links
- Branding elements

### Footer Component

The `Footer` component displays the application footer with:

- Copyright information
- Social media links
- Additional information

## API Integration

The frontend communicates with the backend API using Axios. The main API endpoint used is:

- **POST** `/predict-churn/`: Sends customer data and receives churn prediction

Example API call:

```javascript
const response = await axios.post('http://localhost:8000/predict-churn/', formData);
setResult(response.data);
```

## Styling

The application uses Tailwind CSS for styling. The main configuration is in:

- `tailwind.config.js`: Configuration for colors, fonts, and other theme settings
- `index.css`: Global styles and Tailwind directives

Custom color scheme:

```javascript
colors: {
  primary: {
    // Blue shades
    50: '#f0f9ff',
    // ...
    900: '#0c4a6e',
  },
  secondary: {
    // Purple shades
    50: '#f5f3ff',
    // ...
    900: '#4c1d95',
  },
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
