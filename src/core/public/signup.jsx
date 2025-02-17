import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                name,
                email,
                password,
                confirm_password,
                role: "user",
            });

            console.log("Registration successful:", response.data);
            setSuccess("User registered successfully!");
            setError("");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            console.error("Error registering user:", err.response || err.message);

            if (err.response) {
                // Backend returned an error response
                setError(err.response.data.message || "Registration failed. Try again.");
            } else {
                // Network or other errors
                setError("Network error. Please try again.");
            }

            setSuccess("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl px-8 bg-white shadow-md rounded-lg">
                {/* Left Section with Logo */}
                <div className="flex items-center justify-center lg:w-1/2 w-full p-4">
                    <img
                        src="src/assets/images/GuidEngine.png"
                        alt="Logo"
                        className="w-64 h-64"
                    />
                </div>

                {/* Right Section with Signup Form */}
                <div className="lg:w-1/2 w-full p-8 text-center">
                    {/* Center-aligned heading and description */}
                    <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Welcome! Please fill in your details to create an account.
                    </p>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Password"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                value={confirm_password}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Confirm Password"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">{success}</p>}

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    {/* Already have an account */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="font-medium text-blue-600 hover:underline cursor-pointer"
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
