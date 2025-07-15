// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../Context/UserContext";
// import axios from "axios";
// import Navbar from "../../Components/Navbar/Navbar";
// import { toast } from "react-toastify";

// const MyProfile = () => {
//   const { user, setUser, backendUrl, token } = useContext(UserContext);
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [phone, setPhone] = useState("");
//   const [profilePic, setProfilePic] = useState("/default-avatar.png");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setName(user.name || "Not specified");
//       setBio(user.bio || "Add your bio");
//       setPhone(user.phone || "Not specified");
//       setProfilePic(user.profilePic || "/default-avatar.png");
//     }
//   }, [user]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         toast.error("Only image files are allowed!");
//         return;
//       }
//       setSelectedFile(file);
//       setProfilePic(URL.createObjectURL(file)); // Preview image before upload
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!selectedFile) {
//       toast.error("Please select an image first.");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("profilePic", selectedFile);

//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/user/updateProfilePic`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (res.data.success) {
//         setProfilePic(res.data.profilePic);
//         setUser((prev) => ({ ...prev, profilePic: res.data.profilePic }));
//         toast.success("Profile picture updated!");
//       }
//     } catch (error) {
//       toast.error("Error uploading image");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveProfileInfo = async () => {
//     if (!name.trim() || !bio.trim() || !phone.trim()) {
//       toast.error("All fields are required!");
//       return;
//     }

//     setSaving(true);
//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/user/profile/update`,
//         { name, phone, bio, profilePic },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) {
//         setUser(res.data.user);
//         toast.success("Profile updated successfully!");
//         setIsEditing(false);
//       }
//     } catch (error) {
//       toast.error("Error updating profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div
//         className="flex justify-center items-center min-h-screen p-10 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')", // Background image URL
//         }}
//       >
//         <div className="bg-opacity-40 backdrop-blur-lg shadow-lg rounded-lg w-full max-w-4xl p-8 flex flex-col gap-6 border border-green-200">
//           {/* Left Side - Profile Picture */}
//           <div className="flex flex-col items-center mb-8">
//             <img
//               src={profilePic}
//               alt="Profile"
//               className="w-36 h-36 rounded-full object-cover border-4 border-green-600"
//             />
//             <input
//               type="file"
//               className="mt-4 text-sm"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//             <button
//               className={`mt-8 px-4 py-2 text-white rounded-md ${
//                 loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
//               }`}
//               onClick={handleImageUpload}
//               disabled={loading}
//             >
//               {loading ? "Uploading..." : "Upload Image"}
//             </button>
//           </div>

//           {/* Right Side - Profile Details */}
//           <div className="w-full">
//             <h2 className="text-2xl font-extrabold text-green-800">
//               MY PROFILE
//             </h2>
//             <hr className="my-4 border-green-600" />

//             <div className="grid grid-cols-1 gap-6 text-md text-gray-700 mb-6">
//               {/* First Row - Name and Email */}
//               <div className="flex justify-between">
//                 <p>
//                   <span className="text-green-700 font-extrabold">Name:</span>{" "}
//                   {name}
//                 </p>
//                 <p>
//                   <span className="text-green-700 font-extrabold">Bio:</span>{" "}
//                   {bio}
//                 </p>
//               </div>

//               {/* Second Row - Bio and Phone */}
//               <div className="flex justify-between">
//                 <p>
//                   <span className="text-green-700 font-extrabold">Email:</span>{" "}
//                   {user?.email}
//                 </p>
//                 <p>
//                   <span className="text-green-700 font-extrabold">Phone:</span>{" "}
//                   {phone}
//                 </p>
//               </div>
//             </div>

//             {/* Edit Mode */}
//             {isEditing ? (
//               <div className="mt-6">
//                 <label className="block text-green-700 font-semibold mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
//                 />

//                 <label className="block text-green-700 font-semibold mt-4 mb-1">
//                   Bio
//                 </label>
//                 <textarea
//                   value={bio}
//                   onChange={(e) => setBio(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
//                 />

//                 <label className="block text-green-700 font-semibold mt-4 mb-1">
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
//                 />

//                 <div className="flex gap-4 mt-6">
//                   <button
//                     className="px-5 py-2 bg-green-600 text-white rounded-md"
//                     onClick={saveProfileInfo}
//                     disabled={saving}
//                   >
//                     {saving ? "Saving..." : "Save"}
//                   </button>
//                   <button
//                     className="px-5 py-2 bg-red-500 text-white rounded-md"
//                     onClick={() => setIsEditing(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex justify-end mt-6">
//                 <button
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
//                   onClick={() => setIsEditing(true)}
//                 >
//                   Edit Profile
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyProfile;


import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user, setUser, backendUrl, token } = useContext(UserContext);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState("/default-avatar.png");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "Not specified");
      setBio(user.bio || "Add your bio");
      setPhone(user.phone || "Not specified");
      setProfilePic(user.profilePic || "/default-avatar.png");
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed!");
        return;
      }
      setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file)); // Preview image before upload
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first.");
      return;
    }

    // Check if the uploaded image is the same as the existing one
    const selectedFileName = selectedFile.name;
    const currentFileName = profilePic.split('/').pop();

    // If it's the same file, show a toast
    if (selectedFileName === currentFileName) {
      toast.info("Please select a new image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await axios.post(
        `${backendUrl}/api/user/updateProfilePic`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        setProfilePic(res.data.profilePic);
        setUser((prev) => ({ ...prev, profilePic: res.data.profilePic }));
        toast.success("Profile picture updated!");
      }
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  const saveProfileInfo = async () => {
    // Check if the user is making any changes
    if (
      name === user.name &&
      bio === user.bio &&
      phone === user.phone &&
      profilePic === user.profilePic
    ) {
      toast.info("No changes made. Profile is already up to date.");
      return;
    }

    if (!name.trim() || !bio.trim() || !phone.trim()) {
      toast.error("All fields are required!");
      return;
    }

    setSaving(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/profile/update`,
        { name, phone, bio, profilePic },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="flex justify-center items-center min-h-screen p-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')", // Background image URL
        }}
      >
        <div className="bg-opacity-40 backdrop-blur-lg shadow-lg rounded-lg w-full max-w-4xl p-8 flex flex-col gap-6 border border-green-200">
          {/* Left Side - Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={profilePic}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-green-600"
            />
            <input
              type="file"
              className="mt-4 text-sm"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              className={`mt-8 px-4 py-2 text-white rounded-md ${
                loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
              onClick={handleImageUpload}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {/* Right Side - Profile Details */}
          <div className="w-full">
            <h2 className="text-2xl font-extrabold text-green-800">MY PROFILE</h2>
            <hr className="my-4 border-green-600" />

            <div className="grid grid-cols-1 gap-6 text-md text-gray-700 mb-6">
              {/* First Row - Name and Email */}
              <div className="flex justify-between">
                <p>
                  <span className="text-green-700 font-extrabold">Name:</span>{" "}
                  {name}
                </p>
                <p>
                  <span className="text-green-700 font-extrabold">Bio:</span>{" "}
                  {bio}
                </p>
              </div>

              {/* Second Row - Bio and Phone */}
              <div className="flex justify-between">
                <p>
                  <span className="text-green-700 font-extrabold">Email:</span>{" "}
                  {user?.email}
                </p>
                <p>
                  <span className="text-green-700 font-extrabold">Phone:</span>{" "}
                  {phone}
                </p>
              </div>
            </div>

            {/* Edit Mode */}
            {isEditing ? (
              <div className="mt-6">
                <label className="block text-green-700 font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                />

                <label className="block text-green-700 font-semibold mt-4 mb-1">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                />

                <label className="block text-green-700 font-semibold mt-4 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                />

                <div className="flex gap-4 mt-6">
                  <button
                    className="px-5 py-2 bg-green-600 text-white rounded-md"
                    onClick={saveProfileInfo}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="px-5 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end mt-6">
                <button
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
