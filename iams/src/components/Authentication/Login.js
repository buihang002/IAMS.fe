import React, { useEffect, useState } from "react";
import MyAxios from "../../utils/MyAxios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode"; // Import đúng cách

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Kiểm tra token trong localStorage, nếu có thì chuyển hướng khỏi trang login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Điều hướng đến trang dashboard hoặc trang chính khác
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email."),
      password: Yup.string().required("Please enter your password."),
    }),
    onSubmit: async (values) => {
      setError(""); // Xóa lỗi trước khi gửi

      try {
        const res = await MyAxios.post("/authentication/login", values);

        if (res.data && res.data.token) {
          const token = res.data.token;

          const decoded = jwtDecode(token);

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(decoded));

          // Role
          if (decoded.role === "MENTOR") {
            navigate("/dashboardmentor");
          } else if (decoded.role === "INTERN") {
            navigate("/dashboardintern");
          }
        } else {
          setError("Đăng nhập không thành công. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError(
          error.response?.data?.message ||
            "Đăng nhập không thành công. Vui lòng kiểm tra thông tin tài khoản."
        );
      }
    },
  });

  return (
    <div className="flex flex-col items-center ">
      <div className=" shadow-md rounded-lg w-96 mr-96 mt-20 p-6">
        <h4 className="text-center text-2xl font-semibold mb-4 font-mono text-gray-800">
          Sign in
        </h4>
        <hr className="mb-4" />

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border rounded p-2">
              <i className="bi bi-person text-gray-500 mr-2"></i>
              <input
                id="email"
                className="flex-1 outline-none"
                placeholder="Email or login"
                type="text"
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded p-2">
              <i className="bi bi-shield-lock text-gray-500 mr-2"></i>
              <input
                id="password"
                className="flex-1 outline-none"
                placeholder="******"
                type="password"
                {...formik.getFieldProps("password")}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-3/4"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
