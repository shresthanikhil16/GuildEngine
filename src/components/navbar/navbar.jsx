import 'material-icons/iconfont/material-icons.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [userProfile, setUserProfile] = useState(null); // State for user profile

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found. Please log in.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/auth/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setUserProfile(data.user); // Set user profile data
                    console.log("User Profile Data:", data.user); // Log the user profile data
                } else {
                    console.error(data.message || "Failed to fetch profile.");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white text-[#9694FF] shadow rounded-3xl m-4">
            <h1 className="text-lg font-semibold">Good Evening, Gamer</h1>
            <div className="flex items-center space-x-6">
                <input
                    type="text"
                    placeholder="Search games"
                    className="px-4 py-2 text-sm text-[#9694FF] rounded-lg focus:outline-none bg-[#f3f3f3] border border-[#9694FF]"
                />
                <button className="material-icons text-[#9694FF] hover:text-[#662f34]">notifications</button>
                {/* Circular avatar for profile picture */}
                {userProfile && userProfile.profilePicture ? (
                    <img
                        src={`http://localhost:3000/${userProfile.profilePicture}`} // Ensure the correct path
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-[#9694FF] object-cover cursor-pointer"
                        onClick={() => navigate("/profile")} // Navigate on click
                    />
                ) : (
                    <img
                        src="default-avatar.png" // Fallback image if no profile picture
                        alt="Default Profile"
                        className="w-10 h-10 rounded-full border-2 border-[#9694FF] object-cover cursor-pointer"
                        onClick={() => navigate("/profile")}
                    />
                )}
            </div>
        </header>
    );
};

export default Navbar;