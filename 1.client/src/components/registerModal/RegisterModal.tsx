import React, { useState } from "react";
import "../registerModal/registerModal.css";
import { ModalProps } from "../../types";

const RegisterModal = ({ isOpen, onClose }: ModalProps) => {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Username:", name);
    console.log("Password:", lastname);
    console.log("Email:", email);

    setMessage("Account created successfully!");

    setName("");
    setLastname("");
    setEmail("");
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
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input"
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
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
