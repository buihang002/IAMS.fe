import users from "../data/login.json";

export function login(username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return user.id; // Trả về ID của người dùng khi đăng nhập thành công
  }
  return null;
}

export function getUserId() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.id : null;
}

export function getRole() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
}

export function logout() {
  localStorage.removeItem("user");
}

export function isAuthenticated() {
  return !!localStorage.getItem("user");
}
