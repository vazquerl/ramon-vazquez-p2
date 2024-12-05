import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // Check if user data and token are available
    if (!token || !userData) {
      // If no user or token, redirect to login page
      navigate("/login");
    } else {
      try {
        // Parse user data if available
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        // Handle error if parsing fails
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove user and token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");  // Redirect to login page after logout
  };

  return (
    <div className="container">
      <h1>Welcome to Your Dashboard</h1>
      {user ? (
        <div>
          <h2>Hello, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Dashboard;
