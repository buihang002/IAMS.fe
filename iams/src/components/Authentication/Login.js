import React, { useState, useEffect } from "react";
import MyAxios from "../../utils/MyAxios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // FORM DATA
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const saveUserToLocalStorage = async () => {
    try {
      // const res = await MyAxios.get("/interns");
      // const userData = res.data.data;
      // localStorage.setItem("loggingUser", JSON.stringify(userData));
      // Kiểm tra vai trò người dùng và điều hướng
      // const userRole = userData.role;
      // if (userRole === "intern") {
      //   navigate("/dashboard");
      // } else {
      //   navigate("/audit");
      // }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setError("Đã xảy ra lỗi khi lấy thông tin người dùng.");
    }
  };

  // HANDLE Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Xóa lỗi trước đó (nếu có)

    try {
      const res = await MyAxios.post("/authentication/login", formData);
      if (res.status === 200) {
        // Lưu token vào localStorage
        localStorage.setItem("token", res.data.data);
        await saveUserToLocalStorage();
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        "Đăng nhập không thành công. Vui lòng kiểm tra thông tin tài khoản."
      );
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="card text-center" style={{ width: "400px" }}>
        <article className="card-body">
          {/* Header */}
          <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
          <hr />

          {/* Error message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Account field */}
            <div className="form-group mb-3 mt-2">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Email or login"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  value={formData.username}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="form-group mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-shield-lock"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="******"
                  type="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block w-75">
                Login
              </button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}
