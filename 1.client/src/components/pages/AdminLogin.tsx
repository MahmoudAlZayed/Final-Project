import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../services/authService";
import "./login.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await fetchLogin({ username, password });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      alert("Admin login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="heading">Admin Login</h1>
        <form onSubmit={handleSubmit} className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button className="sign-in-button" type="submit">
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
