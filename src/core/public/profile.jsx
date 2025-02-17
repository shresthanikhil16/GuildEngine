import 'material-icons/iconfont/material-icons.css';
import React, { useState } from "react";
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';

const ProfilePage = () => {
    // Sample user data for profile
    const [userData, setUserData] = useState({
        username: "gamer_123",
        email: "gamer123@example.com",
        profilePic: "src/assets/images/profile.jpg", // Replace with actual image path
    });

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Navbar />

                {/* Profile Section */}
                <main className="flex-1 p-6 space-y-6">
                    {/* Profile Information Section */}
                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-bold text-[#9694FF]">Profile Information</h2>
                        <div className="mt-6 flex items-center">
                            <img
                                src={userData.profilePic}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-[#9694FF] object-cover"
                            />
                            <div className="ml-6">
                                <h3 className="text-xl font-semibold text-[#3A3A3A]">{userData.username}</h3>
                                <p className="text-[#3A3A3A] mt-2">{userData.email}</p>
                            </div>
                        </div>
                    </section>

                    {/* Update Profile Section */}
                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-bold text-[#9694FF]">Update Profile</h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center">
                                <label className="text-[#3A3A3A] w-32">Username:</label>
                                <input
                                    type="text"
                                    value={userData.username}
                                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                    className="p-2 rounded-lg w-full text-black border border-[#D1D1D6]"
                                />
                            </div>

                            <div className="flex items-center">
                                <label className="text-[#3A3A3A] w-32">Email:</label>
                                <input
                                    type="email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    className="p-2 rounded-lg w-full text-black border border-[#D1D1D6]"
                                />
                            </div>

                            <div className="flex items-center">
                                <label className="text-[#3A3A3A] w-32">Profile Picture:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setUserData({ ...userData, profilePic: reader.result });
                                        };
                                        if (e.target.files[0]) {
                                            reader.readAsDataURL(e.target.files[0]);
                                        }
                                    }}
                                    className="p-2 rounded-lg w-full border border-[#D1D1D6]"
                                />
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="px-6 py-2 bg-[#9694FF] text-white rounded-lg hover:bg-[#7F7CFF]">
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

export default ProfilePage;
