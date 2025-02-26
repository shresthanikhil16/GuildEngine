import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const ChatPage = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [recentlyMessaged, setRecentlyMessaged] = useState([]); // Recently messaged users
    const navigate = useNavigate();

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
            } else {
                console.warn("⚠️ No current user found in response.");
            }
        } catch (error) {
            console.error("❌ Error fetching current user:", error.response?.data || error.message);
        }
    };

    const fetchUsers = async () => {
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
                // Filter out the current user from the users list
                const filteredUsers = response.data.users.filter(user => user._id !== currentUser?._id);
                setUsers(filteredUsers);
            } else {
                console.warn("⚠️ No users found in response.");
            }
        } catch (error) {
            console.error("❌ Error fetching users:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchUsers();
        }
    }, [currentUser]);

    const handleUserClick = (user) => {
        if (!currentUser || !currentUser._id) {
            console.error("❌ Current user information is missing.");
            return;
        }

        console.log("✅ Navigating to chat with:", user);
        navigate(`/chat/${user._id}`, { state: { currentUser } });

        // Update recently messaged users
        setRecentlyMessaged((prev) => {
            const existingIndex = prev.findIndex(recentUser => recentUser._id === user._id);
            if (existingIndex !== -1) {
                // Remove the existing user from the list
                const updatedList = prev.filter((_, index) => index !== existingIndex);
                return [user, ...updatedList]; // Add user to the top of the list
            }
            return [user, ...prev]; // If user is not in the list, add them to the top
        });
    };

    // Combine recently messaged and other users, ensuring unique users
    const combinedUsers = [
        ...recentlyMessaged,
        ...users.filter(user => !recentlyMessaged.some(recent => recent._id === user._id)),
    ];

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6">
                    <section className="bg-[#F4F4F9] rounded-lg shadow-md p-6 h-full flex flex-col">
                        <h2 className="text-lg font-bold text-[#3A3A3A] mb-4">Chat</h2>

                        {/* User List */}
                        <div className="mb-4">
                            <h3 className="font-semibold">Registered Users:</h3>
                            <ul className="space-y-2">
                                {combinedUsers.length > 0 ? (
                                    combinedUsers.map((user) => (
                                        <li
                                            key={user._id}
                                            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer text-blue-600 hover:underline transition-transform transform hover:scale-105"
                                            onClick={() => handleUserClick(user)}
                                        >
                                            <div className="font-medium">{user.name}</div>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No users available.</p>
                                )}
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default ChatPage;
