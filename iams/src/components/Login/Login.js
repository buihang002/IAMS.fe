import React, { useEffect, useState } from "react";
import MyAxios from "../../utils/MyAxios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Thêm trạng thái tải
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
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
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your username."),
      password: Yup.string().required("Please enter your password."),
    }),
    onSubmit: async (values) => {
      setError(""); // Xóa lỗi trước khi gửi
      setLoading(true); // Hiển thị trạng thái tải

      try {
        const res = await MyAxios.post("/authentication/login", values);

        if (res.data && res.data.token) {
          const token = res.data.token;

          const decoded = jwtDecode(token);

          // Lưu token và thông tin người dùng vào localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(decoded));

          // Điều hướng theo vai trò
          if (decoded.role === "MENTOR") {
            navigate("/dashboardmentor");
          } else if (decoded.role === "INTERN") {
            navigate("/dashboardintern");
          } else {
            navigate("/"); // Điều hướng mặc định
          }
        } else {
          setError("Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);

        // Xử lý lỗi cụ thể hơn
        if (error.response?.status === 401) {
          setError("Invalid username or password. Please try again.");
        } else if (error.response?.status === 403) {
          setError("Your account is locked. Please contact admin.");
        } else {
          setError(
            error.response?.data?.message ||
              "An error occurred. Please try again later."
          );
        }
      } finally {
        setLoading(false); // Tắt trạng thái tải
      }
    },
  });

  return (
    <div className="flex flex-col items-center mt-24">
      <div className="bg-white shadow-md rounded-lg w-96 p-6">
        <h4 className="text-center text-lg font-semibold mb-4">Sign in</h4>
        <hr className="mb-4" />

        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Trường Username */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <div className="flex items-center border rounded p-2">
              <i className="bi bi-person text-gray-500 mr-2"></i>
              <input
                id="username"
                className="flex-1 outline-none"
                placeholder="Email or login"
                type="text"
                {...formik.getFieldProps("username")}
              />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          {/* Trường Password */}
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
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
              />
              {/* Nút hiển thị/ẩn mật khẩu */}
              <button
                type="button"
                className="ml-2 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          {/* Nút Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-3/4 flex justify-center items-center"
              disabled={loading} // Vô hiệu hóa nút khi đang tải
            >
              {loading ? (
                <span className="loader-spinner"></span> // Thêm spinner hoặc biểu tượng tải
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
