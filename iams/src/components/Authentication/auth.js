export const login = (username, password) => {
  const correctUsername = "admin";
  const correctPassword = "123456";

  if (username === correctUsername && password === correctPassword) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify({ username })); // lưu thêm thông tin người dùng (tuỳ chọn)
    return true;
  } else {
    return false;
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user"); // xoá thông tin người dùng khi đăng xuất (tuỳ chọn)
};
