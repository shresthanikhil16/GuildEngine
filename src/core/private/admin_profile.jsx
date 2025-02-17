import 'material-icons/iconfont/material-icons.css';
import React, { useState } from "react";
import AdminNavbar from '../../components/admin_navbar/admin_navbar';
import AdminSidebar from '../../components/admin_sidebar/admin_sidebar';

const AdminProfilePage = () => {
    // Sample admin data for profile
    const [adminData, setAdminData] = useState({
        username: "admin_master",
        email: "admin@example.com",
        profilePic: "src/assets/images/profile.jpg", // Replace with actual image path
        role: "Super Admin",
    });

    return (
        <div className="flex h-screen bg-white">
            <AdminSidebar activeSection="profile" />
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <AdminNavbar />

                {/* Admin Profile Section */}
                <main className="flex-1 p-6 space-y-6">
                    {/* Profile Information Section */}
                    <section className="bg-[#F4F4F9] rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-bold text-[#3A3A3A]">Admin Profile</h2>
                        <div className="mt-6 flex items-center">
                            <img
                                src={adminData.profilePic}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-[#9694FF] object-cover"
                            />
                            <div className="ml-6">
                                <h3 className="text-xl font-semibold text-[#3A3A3A]">{adminData.username}</h3>
                                <p className="text-[#3A3A3A] mt-2">{adminData.email}</p>
                                <p className="text-[#3A3A3A] mt-1 font-semibold">Role: {adminData.role}</p>
                            </div>
                        </div>
                    </section>

                    {/* Update Profile Section */}
                    <section className="bg-[#F4F4F9] rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-bold text-[#3A3A3A]">Update Profile</h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center">
                                <label className="text-[#3A3A3A] w-32">Username:</label>
                                <input
                                    type="text"
                                    value={adminData.username}
                                    onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                                    className="p-2 rounded-lg w-full text-[#3A3A3A] border border-[#9694FF] focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                                />
                            </div>

                            <div className="flex items-center">
                                <label className="text-[#3A3A3A] w-32">Email:</label>
                                <input
                                    type="email"
                                    value={adminData.email}
                                    onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                                    className="p-2 rounded-lg w-full text-[#3A3A3A] border border-[#9694FF] focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
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
                                            setAdminData({ ...adminData, profilePic: reader.result });
                                        };
                                        if (e.target.files[0]) {
                                            reader.readAsDataURL(e.target.files[0]);
                                        }
                                    }}
                                    className="p-2 rounded-lg w-full text-[#3A3A3A] border border-[#9694FF] focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                                />
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="px-6 py-2 bg-[#9694FF] text-white rounded-lg hover:bg-[#7F7CFF] transition-all duration-300">
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

export default AdminProfilePage;
