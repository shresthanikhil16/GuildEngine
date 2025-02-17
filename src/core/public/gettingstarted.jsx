import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex items-center space-x-32">
                {/* Left Section: GuidEngine text and button */}
                <div className="flex flex-col items-start">
                    {/* GuidEngine text */}
                    <h1 className="text-4xl font-bold text-blue-600">GuidEngine</h1>

                    {/* Navigation Button */}
                    <button
                        onClick={() => navigate("/welcomepage")}
                        className="mt-7 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                    >
                        Get Started
                    </button>
                </div>

                {/* Right Section: Larger Logo */}
                <div>
                    <img
                        src="src/assets/images/GuidEngine.png" // Replace with your logo's path
                        alt="GuidEngine Logo"
                        className="h-72 w-auto" // Increased size
                    />
                </div>
            </div>
        </div>
    );
};

export default GetStarted;
