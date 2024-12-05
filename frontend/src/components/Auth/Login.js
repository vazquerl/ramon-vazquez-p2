import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false); // To toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user by email
    const user = users.find((user) => user.email === email);

    if (!user) {
      setError("No user found with this email.");
      return;
    }

    // Check if password matches
    if (user.password === password) {
      // Store token and user info in localStorage
      localStorage.setItem("token", "some-token"); // Replace "some-token" with a real token if you have one
      localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email }));

      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle the password visibility state
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ position: "relative" }}>
          <label>Password:</label>
          <input
            type={passwordVisible ? "text" : "password"} // Toggle input type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              paddingRight: "30px", // Create enough space for the icon
            }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "1.2rem", // Font Awesome size
              color: "black",  // Black color for the icon
            }}
          >
            {passwordVisible ? (
              <i className="fas fa-eye-slash"></i> // Font Awesome Eye Slash (hidden)
            ) : (
              <i className="fas fa-eye"></i> // Font Awesome Eye (visible)
            )}
          </span>
        </div>
        {/* Add a unique class to the Login button */}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
