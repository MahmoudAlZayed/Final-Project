import React, { ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const buttonClass = `button button-${variant} button-${size} ${className}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
