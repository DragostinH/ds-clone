"use client";

import React from "react";
import { IconType } from "react-icons";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
      flex
      items-center
      justify-center
      w-full
      px-4
      py-2
      text-white
      font-semibold
      rounded-md
      focus:outline-none
      transition
      duration-300
      ease-in-out
      hover:shadow-md
      bg-gray-800"
    >
        <Icon  />
    </button>
  );
};

export default AuthSocialButton;
