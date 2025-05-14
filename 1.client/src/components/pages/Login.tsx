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

  /*REPLACED! I will delete in my next branch if changes is ok - Ida*/

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:5000/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(
  //         isAdminLogin ? { username, password } : { email, password }
  //       ),
  //     });

  //     if (!response.ok) throw new Error("Invalid credentials");

  //     const data = await response.json();
  //     localStorage.setItem("token", data.token);
  //     setIsLoggedIn(true);

  //     navigate("/");
  //   } catch (err) {
  //     alert("Login failed: Invalid email or password");
  //   } finally {
  //     setUsername("");
  //     setEmail("");
  //     setPassword("");
  //   }
  // };

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
                {isAdminLogin ? "Username" : "Email"}
              </label>
              <input
                type={isAdminLogin ? "text" : "email"}
                value={isAdminLogin ? username : email}
                onChange={(e) =>
                  isAdminLogin
                    ? setUsername(e.target.value)
                    : setEmail(e.target.value)
                }
                className="input"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
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

            <p className="register-link-position">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setIsAdminLogin((prev) => !prev);
                }}
                className="register-link"
              >
                {isAdminLogin
                  ? "Switch to Customer Login"
                  : "Switch to Admin Login"}
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
