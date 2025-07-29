"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addSubscriber, clearMessages } from "@/src/features/userSlice";

function SubscribePage() {
  const dispatch = useDispatch();
  const { successMessage, errorMessage, loading } = useSelector(
    (state) => state.SubscribeUser
  );

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage, dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 mt-[56px] px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8 border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Stay Updated
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Join our newsletter and never miss an update.
        </p>

        {/* Form */}
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(addSubscriber(values.email));
            resetForm();
          }}
        >
          {() => (
            <Form className="mt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg font-semibold text-white transition hover:cursor-pointer transition-colors duration-200
                  ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Messages */}
        {successMessage && (
          <p className="text-green-600 font-medium text-center mt-4">
            ✅ {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-600 font-medium text-center mt-4">
            ❌ {errorMessage}
          </p>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

export default SubscribePage;
