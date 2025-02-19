import "material-icons/iconfont/material-icons.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ activeSection }) => {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove user from storage
        navigate("/login"); // Redirect to login page
    };

    return (
        <aside className="w-64 h-screen bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg rounded-3xl m-4 p-4 flex flex-col justify-between">
            <div>
                <div
                    className="flex items-center p-4 cursor-pointer"
                    onClick={() => navigate("/addgames")}
                >
                    <img
                        src="src/assets/images/GuidEngine.png"
                        alt="Logo"
                        className="w-12 h-12"
                    />
                    <span className="ml-3 text-xl font-bold text-[#9694FF]">
                        GuidEngine
                    </span>
                </div>
                <nav className="mt-8">
                    <ul className="space-y-2">
                        <li
                            className={`flex items-center text-white p-4 rounded-xl cursor-pointer ${activeSection === "addGames"
                                ? "bg-[#9694FF] text-white"
                                : "text-[#9694FF] hover:text-white hover:bg-[#9694FF]"
                                }`}
                            onClick={() => navigate("/addgames")}
                        >
                            <span className="material-icons mr-4">library_add</span>
                            Add Games
                        </li>
                        <li
                            className={`flex items-center text-white p-4 rounded-xl cursor-pointer ${activeSection === "shuffle"
                                ? "bg-[#9694FF] text-white"
                                : "text-[#9694FF] hover:text-white hover:bg-[#9694FF]"
                                }`}
                            onClick={() => navigate("/shuffle")}
                        >
                            <span className="material-icons mr-4">shuffle</span>
                            Shuffle
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Logout Button */}
            <button
                className="mt-4 bg-white text-red p-3 rounded-xl flex items-center justify-start hover:text-red-700"
                onClick={handleLogout}
            >
                <span className="material-icons mr-2">logout</span>
                Logout
            </button>
        </aside>
    );
};

export default AdminSidebar;
