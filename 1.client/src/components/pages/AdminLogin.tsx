import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../services/authService";

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
    <div className="container">
      <div className="card">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login as Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
