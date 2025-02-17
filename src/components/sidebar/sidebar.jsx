import 'material-icons/iconfont/material-icons.css';
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 bg-white text-[#9694FF] shadow-lg rounded-3xl m-4 h-screen">
            <div className="flex items-center p-4">
                <img
                    src="src/assets/images/GuidEngine.png"
                    alt="Logo"
                    className="w-12 h-12"
                />
                <span className="ml-3 text-xl font-bold text-[#9694FF]">GuidEngine</span>
            </div>
            <nav className="mt-8">
                <ul>
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/dashboard") ? "bg-[#9694FF] text-white" : "text-[#9694FF] hover:text-white hover:bg-[#EBEAFF]"}`}
                        onClick={() => navigate("/dashboard")}
                    >
                        <span className="material-icons mr-4">dashboard</span>
                        Dashboard
                    </li>
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/matchmaking") ? "bg-[#9694FF] text-white" : "text-[#9694FF] hover:text-white hover:bg-[#EBEAFF]"}`}
                        onClick={() => navigate("/matchmaking")}
                    >
                        <span className="material-icons mr-4">sports_esports</span>
                        Matchmaking
                    </li>
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/chat") ? "bg-[#9694FF] text-white" : "text-[#9694FF] hover:text-white hover:bg-[#EBEAFF]"}`}
                        onClick={() => navigate("/chat")}
                    >
                        <span className="material-icons mr-4">chat</span>
                        Chat
                    </li>
                    {/* Create Tournament option */}
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/gamecreate") ? "bg-[#9694FF] text-white" : "text-[#9694FF] hover:text-white hover:bg-[#EBEAFF]"}`}
                        onClick={() => navigate("/gamecreate")}
                    >
                        <span className="material-icons mr-4">create</span>
                        Create Tournament
                    </li>
                    {/* History option */}
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/history") ? "bg-[#9694FF] text-white" : "text-[#9694FF] hover:text-white hover:bg-[#EBEAFF]"}`}
                        onClick={() => navigate("/history")}
                    >
                        <span className="material-icons mr-4">history</span>
                        History
                    </li>
                </ul>
            </nav>
            <div className="absolute bottom-7 w-full p-4">
                <button
                    className="flex items-center text-[#9694FF] hover:text-red-500 rounded-xl cursor-pointer"
                    onClick={() => navigate("/login")}
                >
                    <span className="material-icons mr-4">logout</span>
                    Log Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
