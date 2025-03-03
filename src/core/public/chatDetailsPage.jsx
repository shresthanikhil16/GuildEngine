import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";

const ChatDetailsPage = () => {
    const { userId } = useParams();
    const location = useLocation();
    const currentUser = location.state?.currentUser;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [recipientName, setRecipientName] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            if (!userId || !currentUser?._id) {
                console.error("❌ Missing userId or currentUser._id");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("❌ No authentication token found.");
                    return;
                }

                console.log(`🔍 Fetching messages between ${currentUser._id} and ${userId}`);

                const response = await axios.get(`http://localhost:3000/api/messages/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("✅ Messages fetched:", response.data.messages);
                setMessages(response.data.messages);

                // Fetch recipient name
                const recipientResponse = await axios.get(`http://localhost:3000/api/auth/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (recipientResponse.data?.user) {
                    setRecipientName(recipientResponse.data.user.username);
                }
            } catch (error) {
                console.error("❌ Error fetching messages:", error.response?.data || error.message);
            }
        };

        fetchMessages();
    }, [userId, currentUser]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        if (!userId || !currentUser?._id) {
            console.error("❌ Cannot send message. Missing userId or currentUser.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("❌ No authentication token found.");
                return;
            }

            const messageData = {
                sender: currentUser._id,
                receiver: userId,
                text: newMessage,
            };

            console.log("📤 Sending message:", messageData);

            const response = await axios.post("http://localhost:3000/api/messages", messageData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("✅ Message sent:", response.data);
            setMessages([...messages, response.data.message]);
            setNewMessage("");
        } catch (error) {
            console.error("❌ Error sending message:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex h-screen bg-purple-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="chat-container flex flex-col p-4">
                    <h2 className="text-xl font-semibold mb-4">Chat with {recipientName || "Loading..."}</h2>
                    <div className="messages flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-lg mb-4">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className={`my-2 p-2 rounded-lg max-w-xs ${msg.sender === currentUser._id ? "bg-blue-200 text-right ml-auto" : "bg-purple-200 text-left"
                                    }`}
                            >
                                <strong>{msg.sender === currentUser._id ? "You" : recipientName || "Them"}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="send-message flex items-center border-t pt-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 border rounded-lg p-2 mr-2"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-purple-500 text-white rounded-lg px-4 py-2"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatDetailsPage;
