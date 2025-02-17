import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: "You", text: "Hello! How can I help you?" },
        { id: 2, sender: "John", text: "Hi! I'm looking for a match." },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, { id: messages.length + 1, sender: "You", text: newMessage }]);
            setNewMessage("");
        }
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Navbar />

                {/* Chat Section */}
                <main className="flex-1 p-6">
                    <section className="bg-[#F4F4F9] rounded-lg shadow-md p-6 h-full flex flex-col">
                        <h2 className="text-lg font-bold text-[#3A3A3A] mb-4">Chat</h2>

                        {/* Message List */}
                        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`p-4 rounded-lg max-w-xs ${message.sender === "You"
                                            ? "bg-[#9694FF] text-white"
                                            : "bg-[#E1D8FF] text-white"
                                            }`}
                                    >
                                        <p className="text-sm font-medium">{message.sender}</p>
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                className="flex-1 p-4 rounded-lg bg-[#E1D8FF] text-[#3A3A3A] outline-none"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="px-6 py-3 bg-[#9694FF] text-white rounded-lg hover:bg-[#7F7CFF]"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default ChatPage;
