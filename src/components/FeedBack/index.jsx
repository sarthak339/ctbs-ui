"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import StarRating from "../StarRating";
import toast from "react-hot-toast";
import useApi from "@/src/hooks/useApi";
import constant from "@/src/config/constant";
import { useRouter } from "next/navigation";

// Yup validation schema
const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  organization: Yup.string().required("Organization is required"),
  designation: Yup.string().required("Designation is required"),
  feedback: Yup.string().required("Feedback is required"),
  rating: Yup.number().min(1).max(5).required("Rating is required"),
});

export default function FeedBack() {
  const { request } = useApi();
  const router = useRouter();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await request(
        constant.FEEDBACK_FORM_END_POINT,
        "POST",
        values
      );
      const { status, message } = res || null;
      if (status === 400) {
        toast.error(message || "Something went wrong. Please try again.");
      }
      if (!res) throw new Error("Failed to submit");
      if(res.status===200){
        toast.success(
          "🙏 Thank you so much for your valuable feedback. We truly appreciate your time and support."
        );
      }
    
      resetForm();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("❌ Error submitting:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10 ">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit Feedback</h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          organization: "",
          designation: "",
          feedback: "",
          rating: "",
        }}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            {["name", "email", "organization", "designation"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize">
                  {field}
                </label>
                <Field
                  name={field}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name={field}
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium">Feedback</label>
              <Field
                name="feedback"
                as="textarea"
                rows="4"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="feedback"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <Field name="rating" component={StarRating} />
              <ErrorMessage
                name="rating"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
