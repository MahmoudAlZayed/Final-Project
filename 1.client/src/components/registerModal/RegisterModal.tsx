import React, { useState } from "react";
import "../registerModal/registerModal.css";
import { ModalProps } from "../../types";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ isOpen, onClose }: ModalProps) => {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastname,
          email,
          password,
        }),
      });

      if (!response.ok) throw new Error("Failed to register");

      const data = await response.json();
      localStorage.setItem("token", data.token);

      setMessage("Account created successfully!");
      setName("");
      setLastname("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        onClose();
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage("Registration failed: " + (err as Error).message);
    }
  };

  const handleCancelButton = () => {
    setMessage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            placeholder="First Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="button-container">
            <button type="submit" className="register-button">
              Register
            </button>
            <button
              type="button"
              onClick={handleCancelButton}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="g-4">
          {message && (
            <div className="success-message">
              {message}
              <a onClick={onClose} className="register-link">
                Login!
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
