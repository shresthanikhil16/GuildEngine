import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const ChatPage = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [recentlyMessaged, setRecentlyMessaged] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        if (!currentUser) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("❌ No authentication token found.");
                return;
            }

            const response = await axios.get("http://localhost:3000/api/auth/users", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data?.users) {
                console.log("✅ Users fetched:", response.data.users);
                setUsers(response.data.users.filter(user => user._id !== currentUser._id));
            }
        } catch (error) {
            console.error("❌ Error fetching users:", error.response?.data || error.message);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("❌ No authentication token found.");
                return;
            }

            const response = await axios.get("http://localhost:3000/api/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data?.user) {
                console.log("✅ Fetched Current User:", response.data.user);
                setCurrentUser(response.data.user);
            }
        } catch (error) {
            console.error("❌ Error fetching current user:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [currentUser]);

    const handleUserClick = (user) => {
        if (!currentUser) return;

        console.log("✅ Navigating to chat with:", user);
        navigate(`/chat/${user._id}`, { state: { currentUser } });

        setRecentlyMessaged((prev) => [user, ...prev.filter(u => u._id !== user._id)]);
    };

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                    <h2 className="text-lg font-bold">Chat</h2>
                    <ul>
                        {users.map((user) => (
                            <li key={user._id} onClick={() => handleUserClick(user)} className="cursor-pointer">
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </div>
    );
};

export default ChatPage;
