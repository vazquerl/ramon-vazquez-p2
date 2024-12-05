import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";  // Import your Dashboard component
import './styles/App.css'; // Ensure you import the CSS file
import Home from "./Home"; // Create a Home component for the homepage

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {/* Routes Configuration */}
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home token={token} />} />

        {/* Login page */}
        <Route path="/login" element={
          <div className="container">
            <Login />
          </div>
        } />

        {/* Register page */}
        <Route path="/register" element={
          <div className="container">
            <Register />
          </div>
        } />

        {/* Dashboard page (Only accessible if logged in) */}
        <Route path="/dashboard" element={
          token ? (
            <div className="container">
              <Dashboard />
            </div>
          ) : (
            <Navigate to="/dashboard" />
          )
        } />

        {/* Redirect to login page by default if no user is logged in */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2024 DropSpot. All rights reserved.</p>
      </div>
    </Router>
  );
}

export default App;
