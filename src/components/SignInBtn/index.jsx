import React from "react";
import Link from "next/link";

const SignInButton = () => {
  return (
    <Link href="#" passHref>
      <button
        className="bg-[#0066ff] font-bold text-white rounded-2xl px-6 py-2 text-base font-medium shadow-sm transition-colors duration-200 cursor-pointer"
      >
        Sign In
      </button>
    </Link>
  );
};

export default SignInButton;
