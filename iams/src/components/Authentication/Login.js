import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const users = [
    { id: "1", email: "user@gmail.com", password: "123456" },
    { id: "2", email: "admin@gmail.com", password: "123456" },
  ];

  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not in correct format.")
      .matches(/.+@.+\..+/, "Email is not in correct format.")
      .required("Email required"),
    password: Yup.string().required("Password required"),
  });

  const onSubmit = (values) => {
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      setLoginError("");
      navigate("/dashboard");
    } else {
      setLoginError("Email or password is incorrect.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        {loginError && (
          <div className="text-red-500 text-center">{loginError}</div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <Field
                type="email"
                name="email"
                className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <Field
                type="password"
                name="password"
                className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 font-bold text-white bg-gray-800 rounded hover:bg-gray-500"
            >
              Login
            </button>
          </Form>
        </Formik>

        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account?</span>
          <Link to="/register" className="ml-1 text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
