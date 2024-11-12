// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// const usersData = [
//   {
//     id: "981e",
//     account: "hihihi@gmail.com",
//     password: "123456",
//     role: "mentor",
//   },
//   {
//     id: "29ae",
//     account: "hihihi@gmail.com",
//     password: "123456",
//     role: "mentor",
//   },
//   {
//     id: "5a6b",
//     account: "hihihi@gmail.com",
//     password: "123456",
//     role: "intern",
//   },
// ];

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [loginError, setLoginError] = useState("");

//   const initialValues = { account: "", password: "", role: "intern" };

//   const validationSchema = Yup.object({
//     account: Yup.string().required("Account required"),
//     password: Yup.string().required("Password required"),
//     role: Yup.string().required("Role required"),
//   });

//   const handleSubmit = (values) => {
//     const user = usersData.find(
//       (user) =>
//         user.account === values.account &&
//         user.password === values.password &&
//         user.role === values.role
//     );

//     if (user) {
//       localStorage.setItem(
//         "token",
//         "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiSU5URVJOIiwic3ViIjoicXV5ZW5AZnB0LmNvbSIsImlhdCI6MTczMTI5NDc2NSwiZXhwIjoxNzMxMjk0OTA5fQ.w5kGOTcAXQixtvjw-taDnTrWJ1mxsjMwtFuLi85JgOw"
//       ); // Lưu token giả lập
//       localStorage.setItem("role", user.role); // Lưu vai trò người dùng
//       login(); // Đánh dấu là đã xác thực
//       // Điều hướng đến trang dựa trên vai trò
//       navigate(user.role === "mentor" ? "/dashboard" : "/audit");
//     } else {
//       setLoginError("Account, password, or role is incorrect.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
//         {loginError && (
//           <div className="text-red-500 text-center">{loginError}</div>
//         )}

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           <Form className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Account:
//               </label>
//               <Field
//                 type="text"
//                 name="account"
//                 className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//               />
//               <ErrorMessage
//                 name="account"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password:
//               </label>
//               <Field
//                 type="password"
//                 name="password"
//                 className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//               />
//               <ErrorMessage
//                 name="password"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Role:
//               </label>
//               <Field
//                 as="select"
//                 name="role"
//                 className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//               >
//                 <option value="intern">Intern</option>
//                 <option value="mentor">Mentor</option>
//               </Field>
//               <ErrorMessage
//                 name="role"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 font-bold text-white bg-gray-800 rounded hover:bg-gray-500"
//             >
//               Login
//             </button>
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const usersData = [
  {
    id: "981e",
    account: "hihihi@gmail.com",
    password: "123456",
    role: "mentor",
  },
  {
    id: "29ae",
    account: "mentor@gmail.com",
    password: "123456",
    role: "mentor",
  },
  {
    id: "5a6b",
    account: "intern@gmail.com",
    password: "123456",
    role: "intern",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");

  const initialValues = { account: "", password: "" };

  const validationSchema = Yup.object({
    account: Yup.string().required("Account required"),
    password: Yup.string().required("Password required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const user = usersData.find(
      (u) => u.account === values.account && u.password === values.password
    );

    if (user) {
      login(user); // Lưu thông tin người dùng trong AuthContext
      navigate("/"); // Điều hướng đến trang chính hoặc trang khác sau khi đăng nhập
    } else {
      setLoginError("Invalid account or password");
    }
    setSubmitting(false);
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
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account:
              </label>
              <Field
                type="text"
                name="account"
                className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="account"
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
      </div>
    </div>
  );
};

export default Login;
