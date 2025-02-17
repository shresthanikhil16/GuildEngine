import 'material-icons/iconfont/material-icons.css';
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleProfileClick = () => {
        navigate("/profile"); // Navigate to the profile page
    };

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
                <img
                    src="src/assets/images/profile.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full border cursor-pointer border-[#9694FF]"
                    onClick={handleProfileClick} // Add onClick event
                />
            </div>
        </header>
    );
};

export default Navbar;
