"use client";

import {useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Form() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
    
    },
  });

  const handleGoogleLogin = async () => {
    try {
      // Redirect to Google OAuth (via Node.js backend)
      setLoading(true);
      window.location.href = 'http://localhost:8089/api/auth/google'; // Calls the Google OAuth route in your Node.js backend
    } catch (err) {
      setError('Failed to login with Google');
      console.error(err);
    } finally {
    setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white w-full h-full md:w-[500px] md:h-auto rounded-lg shadow-lg p-10 flex flex-col justify-center items-center">
        {/* 🖼️ Logo + Heading */}
        <div className="w-full flex flex-row justify-center items-center gap-2 mb-6">
          <div className="div">
            <h2 className="text-2xl font-bold">Sign In</h2>
          </div>
        </div>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`w-full px-4 py-3 mb-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500 ring-red-300"
                : "focus:ring-[#0066ff]"
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.email}
            </div>
          )}

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`w-full px-4 py-3 mb-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 ring-red-300"
                : "focus:ring-[#0066ff]"
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mb-4">
              {formik.errors.password}
            </div>
          )}

          {/* Login */}
          <button
            type="submit"
            className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-3 rounded-lg transition-colors duration-200 mb-4 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Create Account */}
          <Link href="/signup" className="text-center w-full border border-[#0066ff] text-[#0066ff] hover:bg-[#f0f8ff] font-semibold py-3 rounded-lg transition duration-200 mb-6 cursor-pointer">
            Create an Account
          </Link>

        {/* Divider */}
        <div className="flex items-center w-full mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex space-x-4">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-gray-700 cursor-pointer"
          onClick={handleGoogleLogin}
          >
            <FcGoogle size={20} />
            Google
          </button>
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-gray-700 cursor-pointer">
            <FaFacebookF size={20} className="text-blue-600" />
            Facebook
          </button>
        </div>
      </div>
    </>
  );
}

export default Form;
// Compare this snippet from src/components/SignInBtn/index.jsx:
