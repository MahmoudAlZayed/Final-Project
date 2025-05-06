import React, { useState } from "react";
import "./login.css";
import RegisterModal from "../registerModal/RegisterModal";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="heading">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
        </form>
      </div>
      <RegisterModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Login;
