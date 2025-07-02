import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseClass =
    "btn bg-[#27548A] text-white border-none hover:bg-[#000B58]";

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
