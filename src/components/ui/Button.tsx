import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "cancel";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "rounded-md px-4 py-2 text-sm font-medium";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    cancel: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button type="button" className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
