import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseClass =
    "bg-[#27548A] text-white border-none hover:bg-[#1e3d6b] active:bg-[#0f2744] rounded-lg font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#27548A] focus:ring-offset-2";

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed hover:bg-[#27548A] hover:shadow-none active:scale-100" : "";

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
