import 'material-icons/iconfont/material-icons.css';
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg rounded-3xl m-4 h-screen">
            <div className="flex items-center p-4">
                <img
                    src="src/assets/images/GuidEngine.png"
                    alt="Logo"
                    className="w-12 h-12"
                />
                <span className="ml-3 text-xl font-bold">GuidEngine</span>
            </div>
            <nav className="mt-8">
                <ul>
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/dashboard") ? "bg-white text-indigo-500" : "hover:bg-gradient-to-r hover:from-indigo-200 hover:to-purple-300 hover:text-indigo-700"}`}
                        onClick={() => navigate("/dashboard")}
                    >
                        <span className="material-icons mr-4">dashboard</span>
                        Dashboard
                    </li>
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/matchmaking") ? "bg-white text-indigo-500" : "hover:bg-gradient-to-r hover:from-indigo-200 hover:to-purple-300 hover:text-indigo-700"}`}
                        onClick={() => navigate("/matchmaking")}
                    >
                        <span className="material-icons mr-4">sports_esports</span>
                        Matchmaking
                    </li>
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/chat") ? "bg-white text-indigo-500" : "hover:bg-gradient-to-r hover:from-indigo-200 hover:to-purple-300 hover:text-indigo-700"}`}
                        onClick={() => navigate("/chat")}
                    >
                        <span className="material-icons mr-4">chat</span>
                        Chat
                    </li>
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/gamecreate") ? "bg-white text-indigo-500" : "hover:bg-gradient-to-r hover:from-indigo-200 hover:to-purple-300 hover:text-indigo-700"}`}
                        onClick={() => navigate("/gamecreate")}
                    >
                        <span className="material-icons mr-4">create</span>
                        Create Tournament
                    </li>
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/gameregistrate") ? "bg-white text-indigo-500" : "hover:bg-gradient-to-r hover:from-indigo-200 hover:to-purple-300 hover:text-indigo-700"}`}
                        onClick={() => navigate("/gameregistrate")}
                    >
                        <span className="material-icons mr-4">how_to_reg</span>
                        Register Tournament
                    </li>
                    <li
                        className={`flex items-center p-4 rounded-xl cursor-pointer ${isActive("/history") ? "bg-white text-indigo-500" : "hover:bg-gradient-to-r hover:from-indigo-200 hover:to-purple-300 hover:text-indigo-700"}`}
                        onClick={() => navigate("/history")}
                    >
                        <span className="material-icons mr-4">history</span>
                        History
                    </li>
                </ul>
            </nav>
            <div className="absolute bottom-7 w-full p-4">
                <button
                    className="flex items-center rounded-xl cursor-pointer hover:from-indigo-200 hover:to-purple-300 text-white p-2"
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
