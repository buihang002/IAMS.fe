import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

function updateAuthorizationHeader(config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
}

// Intercept request để cập nhật lại header trước mỗi lần gửi request
instance.interceptors.request.use(
  (config) => {
    return updateAuthorizationHeader(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
