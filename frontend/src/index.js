// Import necessary dependencies
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import './styles/App.css'; // Importing CSS file (optional)
import App from './App'; // Import the App component

// Find the root element in the HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component to the DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
