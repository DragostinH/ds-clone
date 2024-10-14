"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth = false,
  children,
  onClick,
  secondary = false,
  danger = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        "px-4 py-2",
        "rounded-md",
        "text-white",
        "font-semibold",
        "focus:outline-none",
        "transition",
        "duration-300",
        "ease-in-out",
        "hover:shadow-md",
        "disabled:opacity-50 cursor-default",
        {
          "bg-primary-500 hover:bg-primary-700": !secondary && !danger,
          "bg-red-500 hover:bg-red-700": danger,
          "bg-gray-500 hover:bg-gray-700": secondary,
          "w-full": fullWidth,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
