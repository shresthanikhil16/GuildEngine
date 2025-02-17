import 'material-icons/iconfont/material-icons.css';
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/adminprofile");
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white text-[#9694FF] shadow rounded-3xl m-4">
            <h1 className="text-lg font-semibold">Good Evening, Admin</h1>
            <div className="flex items-center space-x-6">

                <img
                    src="src/assets/images/profile.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full border cursor-pointer border-[#9694FF]"
                    onClick={handleProfileClick}
                />
            </div>
        </header>
    );
};

export default AdminNavbar;