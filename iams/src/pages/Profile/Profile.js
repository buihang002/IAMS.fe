import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    fullName: "John Doe",
    avatar:
      "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg?w=740",
    account: "johndoe@example.com",
    phone: "123-456-7890",
    gender: "Male",
    dob: "1990-01-01",
    address: "123 Main St, Springfield, USA",
    socialNum: "123456789",
    role: "Mentor",
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setUser((prevUser) => ({ ...prevUser, avatar: file }));
    }
  };

  // const handleAvatarDelete = () => {
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     avatar: "https://via.placeholder.com/150",
  //   }));
  // };

  // if (!user) {
  //   return <div>User profile deleted.</div>;
  // }

  return (
    <div>
      <div className="flex items-center justify-center p-4">
        <div className=" mt-20 pb-8 px-8 w-full  ">
          <div className=" border border-gray-300 rounded bg-white pl-8 pr-8 shadow">
            <div className="flex flex-row items-center justify-start">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-28  h-28 p-3 mt-3 rounded-full object-cover "
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  <input
                    type="text"
                    name="fullName"
                    value={updatedUser.fullName}
                    onChange={handleInputChange}
                    className=" focus:outline-none "
                  />
                </p>

                <p className="text-sm text-gray-500">{user.account}</p>
              </div>
            </div>

            <div className="r items-center mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mb-2 "
              />
            </div>
          </div>
          <div className=" space-x-4 mt-4">
            <div className="border border-gray-200 p-2 rounded shadow">
              <div className="flex flex-row items-center justify-between border-b-2 border-gray-200">
                <div className="font-semibold">Personal Information</div>
                <div>
                  <i className="bi bi-person-fill"></i>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 p-5">
                {/* Cột bên trái */}
                <div>
                  <div className="mb-4">
                    <p className="font-semibold">Name:</p>
                    <p className="ml-2 border border-gray-200 p-2 rounded">
                      {user.fullName}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Account:</p>
                    <p className="ml-2 border border-gray-200 p-2 rounded">
                      {user.account}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Gender:</p>
                    <p className="ml-2 border border-gray-200 p-2 rounded">
                      {user.gender}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Date of Birth:</p>
                    <p className="ml-2 border border-gray-200 p-2 rounded">
                      {isEditing ? (
                        <input
                          type="date"
                          name="dob"
                          value={updatedUser.dob}
                          onChange={handleInputChange}
                          className="border-b-2 border-gray-200 focus:outline-none"
                        />
                      ) : (
                        user.dob
                      )}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Phone:</p>
                    <p className="ml-2 border border-gray-200 p-2 rounded">
                      {isEditing ? (
                        <input
                          type="text"
                          name="phone"
                          value={updatedUser.phone}
                          onChange={handleInputChange}
                          className="border-b-2 border-gray-200 focus:outline-none"
                        />
                      ) : (
                        user.phone
                      )}
                    </p>
                  </div>
                </div>

                {/* Cột bên phải */}
                <div>
                  <div className="mb-4">
                    <p className="font-semibold">Address:</p>
                    <p className="ml-2 border border-gray-200 p-2 rounded">
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={updatedUser.address}
                          onChange={handleInputChange}
                          className="border-b-2 border-gray-200 focus:outline-none"
                        />
                      ) : (
                        user.address
                      )}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Role:</p>
                    <p className="ml-2 border border-gray-200 p-2 rounded">
                      {user.role}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Social Num:</p>
                    <p className="ml-2 border border-gray-200 p-2 rounded">
                      {user.socialNum}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Status:</p>
                    <p className="ml-2 border border-gray-200 p-2 rounded">
                      {user.status === "Active" ? (
                        <span className="flex items-center">
                          <span className="inline-block w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
                          <span className="text-green-600 font-semibold">
                            Active
                          </span>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <span className="inline-block w-3 h-3 mr-2 bg-red-500 rounded-full"></span>
                          <span className="text-red-600 font-semibold">
                            Deactive
                          </span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex  space-x-4 justify-end mr-5 mb-6 ">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="bg-yellow-500 text-white px-4 py-2 rounded "
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
