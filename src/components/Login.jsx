import React, { useState } from "react";
import "./login.css";
import {useNavigate} from "react-router-dom"

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const url = "https://e-commerce-api-ealr.onrender.com/auth/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Invalid credentials");
        return;
      }
      setError(null);
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/main")
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="signup-container">
      <div className="form-div">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
