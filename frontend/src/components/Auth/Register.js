import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(""); // Reset previous errors

    // Check if email already exists in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setError("User with this email already exists.");
      return;
    }

    // Register new user
    const newUser = { name, email, password };
    users.push(newUser);

    // Save users array to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Add a unique class to the Register button */}
        <button type="submit" className="register-button">Register</button>
      </form>

      {/* Display error message if there is an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;
