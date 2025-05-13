import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useApi from "@/src/hooks/useApi";
import constant from "@/src/config/constant";
import toast from "react-hot-toast";

const SignupForm = () => {
  const { request } = useApi();
  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Form submission handler
  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await request(
        constant.SIGN_UP_END_POINT,
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
    } catch (error) {
      console.error("❌ Error submitting:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white w-full h-full md:w-[500px] md:h-auto rounded-lg shadow-lg p-10 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Alternative Sign-in Link */}
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Sign in here
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
