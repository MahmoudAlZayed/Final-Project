import React, { useState, useEffect } from "react";
import "./login.css";
import RegisterModal from "../registerModal/RegisterModal";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../services/authService";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isAdminLogin, setIsAdminLogin] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = isAdminLogin
      ? { username, password }
      : { email, password };
    try {
      const data = await fetchLogin(userData);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert("Login failed: Invalid email or password");
    } finally {
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="heading">Login</h1>
        {isLoggedIn ? (
          <div>
            <p>You are already logged in.</p>
            <button onClick={handleLogout} className="sign-in-button">
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                {isAdminLogin ? "Username:" : "Email*"}
              </label>
              <input
                placeholder="Enter your email"
                type={isAdminLogin ? "text" : "email"}
                value={isAdminLogin ? username : email}
                onChange={(e) =>
                  isAdminLogin
                    ? setUsername(e.target.value)
                    : setEmail(e.target.value)
                }
                className="login-input"
              />
            </div>
            <div>
              <label className="label">Password*</label>
              <input
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>

            <p className="register-link-position">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="register-link"
              >
                Create new account
              </a>
            </p>
          </form>
        )}
      </div>
      <RegisterModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Login;
