// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "../../utils/MyAxios";
// // const Profile = () => {
// //   const { id } = useParams();
// //   const [intern, setIntern] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [formData, setFormData] = useState({});
// //   const navigate = useNavigate();
// //   const [interns, setInterns] = useState([]);

// //   const [user, setUser] = useState({
// //     fullName: "John Doe",
// //     avatar:
// //       "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg?w=740",
// //     account: "johndoe@example.com",
// //     phone: "123-456-7890",
// //     gender: "Male",
// //     dob: "1990-01-01",
// //     address: "123 Main St, Springfield, USA",
// //     socialNum: "123456789",
// //     role: "Mentor",
// //     status: "Active",
// //   });
// //   useEffect(() => {
// //     // Fetch intern details
// //     const fetchInternDetails = async () => {
// //       const userStr = localStorage.getItem("user");
// //       const user = JSON.parse(userStr);
// //       const userId = user?.userId;

// //       if (!userId) {
// //         setError("No user ID found");
// //         return;
// //       }

// //       setLoading(true);
// //       setError(null);
// //       try {
// //         const response = await axios.get(`/intern/profile/${id}`);
// //         setInterns(response.data);
// //       } catch (err) {
// //         setError("Failed to fetch active interns. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchInternDetails();
// //   }, [id]);
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleGenderChange = (e) => {
// //     const value = e.target.value === "true";
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       gender: value,
// //     }));
// //   };
// //   const handleSave = async () => {
// //     try {
// //       const response = await axios.put(`/intern/edit-profile/${id}`, formData);
// //       setIntern(response.data);
// //       setIsEditing(false);
// //     } catch (err) {
// //       setError("Failed to update intern details");
// //     }
// //   };
// //   const handleBack = () => {
// //     navigate("/intern");
// //   };

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div>{error}</div>;
// //   }

// //   // const [isEditing, setIsEditing] = useState(false);
// //   // const [updatedUser, setUpdatedUser] = useState({ ...user });

// //   // const handleInputChange = (e) => {
// //   //   const { name, value } = e.target;
// //   //   setUpdatedUser({ ...updatedUser, [name]: value });
// //   // };

// //   // const handleEdit = () => {
// //   //   setIsEditing(true);
// //   // };

// //   // const handleSave = () => {
// //   //   setUser(updatedUser);
// //   //   setIsEditing(false);
// //   // };

// //   // const handleAvatarChange = (e) => {
// //   //   if (e.target.files && e.target.files[0]) {
// //   //     const file = URL.createObjectURL(e.target.files[0]);
// //   //     setUser((prevUser) => ({ ...prevUser, avatar: file }));
// //   //   }
// //   // };

// //   // const handleAvatarDelete = () => {
// //   //   setUser((prevUser) => ({
// //   //     ...prevUser,
// //   //     avatar: "https://via.placeholder.com/150",
// //   //   }));
// //   // };

// //   // if (!user) {
// //   //   return <div>User profile deleted.</div>;
// //   // }

// //   return (
// //     <div>
// //       <div className="flex items-center justify-center p-4">
// //         <div className=" mt-20 pb-8 px-8 w-full  ">
// //           <div className=" border border-gray-300 rounded bg-white pl-8 pr-8 shadow">
// //             <div className="flex flex-row items-center justify-start">
// //               <img
// //                 src={user.avatar}
// //                 alt="User Avatar"
// //                 className="w-28  h-28 p-3 mt-3 rounded-full object-cover "
// //               />
// //               <div>
// //                 <p className="text-lg font-semibold text-gray-800">
// //                   {/* <input
// //                     type="text"
// //                     name="fullName"
// //                     value={updatedUser.fullName}
// //                     onChange={handleInputChange}
// //                     className=" focus:outline-none "
// //                   /> */}
// //                 </p>

// //                 <p className="text-sm text-gray-500">{user.account}</p>
// //               </div>
// //             </div>

// //             <div className="r items-center mb-4">
// //               {/* <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleAvatarChange}
// //                 className="mb-2 "
// //               /> */}
// //             </div>
// //           </div>
// //           <div className=" space-x-4 mt-4">
// //             <div className="border border-gray-200 p-2 rounded shadow">
// //               <div className="flex flex-row items-center justify-between border-b-2 border-gray-200">
// //                 <div className="font-semibold">Personal Information</div>
// //                 <div>
// //                   <i className="bi bi-person-fill"></i>
// //                 </div>
// //               </div>
// //               {intern ? (
// //                 <div>
// //                   {isEditing ? (
// //                     // Edit
// //                     <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                       {/* Editable Fields */}
// //                       {["fullName", "phone", "dob", "address", "socialNum"].map(
// //                         (field) => (
// //                           <div key={field}>
// //                             <label className="block text-sm font-semibold mb-2 capitalize">
// //                               {field}
// //                             </label>
// //                             <input
// //                               type={field === "dob" ? "date" : "text"}
// //                               name={field}
// //                               value={formData[field] || ""}
// //                               onChange={handleChange}
// //                               className="w-full border rounded-lg px-4 py-2"
// //                             />
// //                           </div>
// //                         )
// //                       )}

// //                       {/* Gender Field */}
// //                       <div>
// //                         <label className="block text-sm font-semibold mb-2">
// //                           Gender
// //                         </label>
// //                         <select
// //                           name="gender"
// //                           value={formData.gender}
// //                           onChange={handleGenderChange}
// //                           className="w-full border rounded-lg px-4 py-2"
// //                         >
// //                           <option value={false}>Male</option>
// //                           <option value={true}>Female</option>
// //                         </select>
// //                       </div>

// //                       {/* Non-editable Fields */}
// //                       {[
// //                         "userId",
// //                         "account",
// //                         "joinDate",
// //                         "status",
// //                         "mentorId",
// //                         "role",
// //                       ].map((field) => (
// //                         <div key={field}>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             {field}
// //                           </label>
// //                           <input
// //                             type="text"
// //                             value={formData[field] || ""}
// //                             readOnly
// //                             className="w-full border bg-gray-100 cursor-not-allowed px-4 py-2"
// //                           />
// //                         </div>
// //                       ))}

// //                       <div className="col-span-2 flex justify-end space-x-4">
// //                         <button
// //                           type="button"
// //                           onClick={handleSave}
// //                           className="bg-blue-500 text-white px-6 py-2 rounded-lg"
// //                         >
// //                           Save Changes
// //                         </button>
// //                         <button
// //                           type="button"
// //                           onClick={() => setIsEditing(false)}
// //                           className="bg-gray-500 text-white px-6 py-2 rounded-lg"
// //                         >
// //                           Cancel
// //                         </button>
// //                       </div>
// //                     </form>
// //                   ) : (
// //                     // View Mode
// //                     <div>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Full Name
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.fullName || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Phone
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.phone || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Dob
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.dob || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Address
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.address || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Social Num
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.socialNum || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Gender
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.gender ? "Female" : "Male" || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             User ID
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.userId || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Account
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.account || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Join Date
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.joinDate || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Status
// //                           </label>

// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.status || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Mentor
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.mentorId || ""}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-semibold mb-2 capitalize">
// //                             Role
// //                           </label>
// //                           <input
// //                             className="w-full border rounded-lg px-4 py-2"
// //                             value={intern.role || ""}
// //                           />
// //                         </div>
// //                       </div>
// //                       <div className="flex justify-end space-x-4">
// //                         <button
// //                           onClick={handleBack}
// //                           className="bg-gray-400 font-bold hover:bg-gray-600 hover:text-white hover:border border-gray-400   text-white px-6 py-2 rounded-lg mt-4"
// //                         >
// //                           Back
// //                         </button>
// //                         <button
// //                           onClick={() => setIsEditing(true)}
// //                           className="bg-gray-800 font-bold hover:bg-white hover:text-gray-800 hover:border border-gray-800 text-white px-6 py-2 rounded-lg mt-4"
// //                         >
// //                           Edit
// //                         </button>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <p>No information found.</p>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../../utils/MyAxios";

// const Profile = () => {
//   const { userId } = useParams(); // Lấy userId từ URL
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
// const [user, setUser] = useState(null);
//   useEffect(() => {
//     fetchProfile();
//   }, [userId]);

//     const fetchProfile= async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const userStr = localStorage.getItem("user");
//         const user = JSON.parse(userStr);
//         const userId = user?.userId;

//         if (!userId) {
//           setError("No user ID found");
//           return;
//         }

//         const response = await axios.get(
//           `/intern/profile/${id}`
//         );

//         if (response && response.data) {
//           setUser(response.data);
//         } else {
//           setError("No interns found for this mentor.");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         const errorMessage =
//           err.response?.data?.message ||
//           "Failed to fetch interns. Please try again.";
//         setError(errorMessage);
//       } finally {
//         setLoading(false);
//       }

//     };
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//       {loading ? (
//         <p>Loading profile...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : profile ? (
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">{profile.fullName}</h2>
//           <div className="flex items-center gap-4">
//             {profile.avatar ? (
//               <img
//                 src={profile.avatar}
//                 alt="Avatar"
//                 className="w-24 h-24 rounded-full object-cover"
//               />
//             ) : (
//               <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//                 No Avatar
//               </div>
//             )}
//             <div>
//               <p>
//                 <strong>Email:</strong> {profile.account}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {profile.phone}
//               </p>
//               <p>
//                 <strong>Gender:</strong> {profile.gender ? "Male" : "Female"}
//               </p>
//               <p>
//                 <strong>Date of Birth:</strong>{" "}
//                 {new Date(profile.dob).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Address:</strong> {profile.address}
//               </p>
//               <p>
//                 <strong>Social Number:</strong> {profile.socialNum}
//               </p>
//               <p>
//                 <strong>Status:</strong> {profile.status}
//               </p>
//               <p>
//                 <strong>Role:</strong> {profile.role}
//               </p>
//               <p>
//                 <strong>Join Date:</strong>{" "}
//                 {new Date(profile.joinDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Mentor ID:</strong> {profile.mentorId}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Back
//           </button>
//         </div>
//       ) : (
//         <p>No profile details available.</p>
//       )}
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/MyAxios";

const Profile = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/intern/profile/${userId}`);
      if (response?.data) {
        setProfile(response.data);
      } else {
        setError("No profile found for this user.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to fetch profile. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {loading ? (
        <p>Loading profile...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : profile ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{profile.fullName}</h2>
          <div className="flex items-center gap-4">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Avatar
              </div>
            )}
            <div>
              <p>
                <strong>Email:</strong> {profile.account}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>
              <p>
                <strong>Gender:</strong> {profile.gender ? "Male" : "Female"}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(profile.dob).toLocaleDateString()}
              </p>
              <p>
                <strong>Address:</strong> {profile.address}
              </p>
              <p>
                <strong>Social Number:</strong> {profile.socialNum}
              </p>
              <p>
                <strong>Status:</strong> {profile.status}
              </p>
              <p>
                <strong>Role:</strong> {profile.role}
              </p>
              <p>
                <strong>Join Date:</strong>{" "}
                {new Date(profile.joinDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Mentor ID:</strong> {profile.mentorId}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back
          </button>
        </div>
      ) : (
        <p>No profile details available.</p>
      )}
    </div>
  );
};

export default Profile;
