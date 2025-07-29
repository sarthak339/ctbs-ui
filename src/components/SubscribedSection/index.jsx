"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addSubscriber, clearMessages } from "@/src/features/userSlice";

// Yup schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

function SubscribedSection() {
  const dispatch = useDispatch();
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.SubscribeUser
  );

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <section className="py-12 px-4 bg-gray-100 text-center">
      <h3 className="text-lg font-semibold mb-2">Newsletter CTA</h3>
      <p className="text-sm text-gray-700 mb-4">
        New posts delivered weekly. <strong>Stay in the loop.</strong>
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addSubscriber(values.email));
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex justify-center max-w-md mx-auto">
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-l-md w-full"
              />
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 disabled:opacity-50 hover:cursor-pointer transition"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {/* Validation Error (inline) */}
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-600 text-xs mt-2"
            />
          </Form>
        )}
      </Formik>

      {/* Success Card */}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-50 border border-green-400 text-green-700 rounded shadow max-w-md mx-auto text-sm">
          🎉 {successMessage}! You’ll now get daily updates with new blogs & tech news.
        </div>
      )}

      {/* Error Card */}
      {errorMessage && (
        <div className="mt-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded shadow max-w-md mx-auto text-sm">
          ❌ {errorMessage}
        </div>
      )}
    </section>
  );
}

export default SubscribedSection;
