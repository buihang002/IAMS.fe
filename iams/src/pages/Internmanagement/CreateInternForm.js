import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateInternForm = () => {
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [account, setAccount] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [joinDate, setJoinDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Ngày hiện tại
  const [socialNum] = useState("123456789"); // Mã số xã hội mặc định
  const [role] = useState("intern"); // Giá trị mặc định cho role
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();

  // Hàm tạo mật khẩu ngẫu nhiên
  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8); // Tạo mật khẩu ngẫu nhiên có 8 ký tự
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = generateRandomPassword(); // Tạo mật khẩu ngẫu nhiên
    const newIntern = {
      fullName,
      avatar,
      account,
      phone,
      gender,
      dob,
      address,
      joinDate,
      socialNum,
      role,
      status,
      password,
    };

    try {
      await axios.post("http://localhost:9999/interns", newIntern);
      navigate("/interns");
    } catch (error) {
      console.error("Error creating intern:", error);
    }
  };

  return (
    <div className="p-8 mt-11">
      <h2 className="text-2xl font-bold mb-7">Create New Intern</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="p-2 border border-gray-300 rounded w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Avatar URL"
          className="p-2 border border-gray-300 rounded w-full"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Account"
          className="p-2 border border-gray-300 rounded w-full"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          className="p-2 border border-gray-300 rounded w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          placeholder="Date of Birth"
          className="p-2 border border-gray-300 rounded w-full"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="p-2 border border-gray-300 rounded w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Join Date"
          className="p-2 border border-gray-300 rounded w-full"
          value={joinDate}
          readOnly // Để người dùng không chỉnh sửa
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="Active">Active</option>
          <option value="Deactive">Deactive</option>
        </select>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateInternForm;
