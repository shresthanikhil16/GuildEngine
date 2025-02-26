import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const Profile = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        newPassword: "",
        confirmPassword: "",
        profilePicture: "",
        profilePic: null, // Keep the file reference
    });

    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("No token found. Please log in.");
                    return;
                }

                const response = await fetch("http://localhost:3000/api/auth/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch profile.");
                }

                // Prepend base URL to the profile picture path
                setUserData({
                    username: data.user.username || "",
                    email: data.user.email || "",
                    profilePicture: `http://localhost:3000/${data.user.profilePicture}`, // Correctly formatted URL
                    newPassword: "",
                    confirmPassword: "",
                });
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);
            setUserData((prevState) => ({
                ...prevState,
                profilePicture: imageUrl,
                profilePic: file,
            }));
        } else {
            setUserData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found. Please log in.");
                return;
            }

            const formData = new FormData();
            formData.append("username", userData.username);
            formData.append("email", userData.email);
            if (userData.newPassword) {
                formData.append("newPassword", userData.newPassword);
            }
            if (userData.profilePic instanceof File) {
                formData.append("profilePicture", userData.profilePic); // Correct key
            }

            const response = await fetch("http://localhost:3000/api/auth/update-profile", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to update profile.");
            }

            console.log("Profile Picture URL:", data.user.profilePicture); // Log the profile picture URL

            alert("Profile updated successfully!");
            setUserData((prevState) => ({
                ...prevState,
                newPassword: "",
                confirmPassword: "",
                profilePicture: `http://localhost:3000/${data.user.profilePicture}` || "", // Update profile picture from response
            }));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 space-y-6">
                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-bold text-[#9694FF]">Profile Information</h2>
                        <div className="mt-6 flex items-center">
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                            />
                            <img
                                src={userData.profilePicture || "default-avatar.png"} // Use profilePicture state
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-[#9694FF] object-cover cursor-pointer"
                                onClick={handleAvatarClick}
                            />
                            <div className="ml-6">
                                <h3 className="text-xl font-semibold text-[#3A3A3A]">{userData.username}</h3>
                                <p className="text-[#3A3A3A] mt-2">{userData.email}</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-bold text-[#9694FF]">Update Profile</h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center">
                                <label className="text-[#3A3A3A] w-32">Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                    className="p-2 rounded-lg w-full text-black border border-[#D1D1D6]"
                                />
                            </div>

                            <div className="flex items-center">
                                <label className="text-[#3A3A3A] w-32">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className="p-2 rounded-lg w-full text-black border border-[#D1D1D6]"
                                />
                            </div>

                            <div className="flex items-center">
                                <label className="text-[#3A3A3A] w-32">New Password:</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={userData.newPassword}
                                    onChange={handleChange}
                                    className="p-2 rounded-lg w-full text-black border border-[#D1D1D6]"
                                />
                            </div>

                            <div className="flex items-center">
                                <label className="text-[#3A3A3A] w-32">Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={userData.confirmPassword}
                                    onChange={handleChange}
                                    className="p-2 rounded-lg w-full text-black border border-[#D1D1D6]"
                                />
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    className="px-6 py-2 bg-[#9694FF] text-white rounded-lg hover:bg-[#7F7CFF]"
                                    onClick={handleUpdateProfile}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Profile;