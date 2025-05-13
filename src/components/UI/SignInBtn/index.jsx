import React from "react";
import Link from "next/link";
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';

const SignInButton = () => {
  return (
    <Link href="/login" passHref>
      
      <button
        className="bg-[#0066ff] font-bold text-white rounded-2xl px-6 py-2 text-base font-medium shadow-sm transition-colors duration-200 cursor-pointer"
      >
        <span  className='pr-1'><AccountBoxSharpIcon/></span>
        Sign In
      </button>
    </Link>
  );
};

export default SignInButton;
