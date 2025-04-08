import React from "react";
import styles from './index.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "red" | "white" | "silver";
  svg?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "red",
  svg,
}: ButtonProps)  {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[`button__${variant}`]} ${className}`}
      onClick={onClick}
    >
      {svg ? <img src={svg} alt="svg" /> : ''}
      {children}
    </button>
  );
};