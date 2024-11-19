// import React, { useEffect, useState } from "react";
// import MyAxios from "../../utils/MyAxios";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// export default function Login() {
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const saveUserToLocalStorage = async () => {
//     try {
//       // Uncomment and configure as needed to fetch user info and save it
//       const res = await MyAxios.get("/authentication/get/my-profile");
//       const userData = res.data.data;
//       localStorage.setItem("loggingUser", JSON.stringify(userData));
//       const userRole = userData.role;
//       if (userRole === "intern") {
//         navigate("/dashboard");
//       } else {
//         navigate("/audit");
//       }
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//       setError("error fetching user info.");
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       username: Yup.string().required("Please enter your username."),
//       password: Yup.string().required("Please enter your password."),
//     }),
//     onSubmit: async (values) => {
//       setError(""); // Clear previous error

//       try {
//         const res = await MyAxios.post("/authentication/login", values);
//         if (res.status === 200) {
//           // Save token to localStorage
//           localStorage.setItem("token", res.data.data);
//           await saveUserToLocalStorage();
//         }
//       } catch (error) {
//         console.error("Login error:", error);
//         setError(
//           "Đăng nhập không thành công. Vui lòng kiểm tra thông tin tài khoản."
//         );
//       }
//     },
//   });

//   return (
//     <div className="d-flex flex-column align-items-center mt-24">
//       <div className="card text-center" style={{ width: "400px" }}>
//         <article className="card-body">
//           <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
//           <hr />

//           {error && <div className="alert alert-danger">{error}</div>}

//           <form onSubmit={formik.handleSubmit}>
//             <div className="form-group mb-3 mt-2">
//               <div className="input-group">
//                 <div className="input-group-prepend">
//                   <span className="input-group-text">
//                     <i className="bi bi-person"></i>
//                   </span>
//                 </div>
//                 <input
//                   className="form-control"
//                   placeholder="Email or login"
//                   type="text"
//                   {...formik.getFieldProps("username")}
//                 />
//               </div>
//               {formik.touched.username && formik.errors.username ? (
//                 <div className="text-danger">{formik.errors.username}</div>
//               ) : null}
//             </div>

//             <div className="form-group mb-3">
//               <div className="input-group">
//                 <div className="input-group-prepend">
//                   <span className="input-group-text">
//                     <i className="bi bi-shield-lock"></i>
//                   </span>
//                 </div>
//                 <input
//                   className="form-control"
//                   placeholder="******"
//                   type="password"
//                   {...formik.getFieldProps("password")}
//                 />
//               </div>
//               {formik.touched.password && formik.errors.password ? (
//                 <div className="text-danger">{formik.errors.password}</div>
//               ) : null}
//             </div>

//             <div className="form-group">
//               <button type="submit" className="btn btn-primary btn-block w-75">
//                 Login
//               </button>
//             </div>
//           </form>
//         </article>
//       </div>
//     </div>
//   );
// }
