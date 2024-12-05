import React from "react";
import { Link } from "react-router-dom";
import './styles/App.css'; // Ensure you import the CSS file

function Home () {
  // Get the token from localStorage to check if the user is logged in
  const token = localStorage.getItem("token");

  return (
    <div className="container">
      <h1>Welcome to DropSpot</h1>
      <p>The Safest & Secure Way of Scheduling Meetups for Transactions</p>
      <div className="home-links">
        {token ? (
          <Link to="/dashboard">
            <button className="dashboard-button">Go to Dashboard</button>
          </Link>
        ) : (
          <div>
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="register-button">Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
