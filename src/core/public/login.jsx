import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated, setIsAdmin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                { email, password }
            );

            const { token, role } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            setIsAuthenticated(true);
            setIsAdmin(role === "admin");

            if (role === "admin") {
                navigate("/admindash");
            } else if (role === "user") {
                navigate("/dashboard");
            } else {
                throw new Error("Invalid role received from the server.");
            }
        } catch (error) {
            console.error("Login error: ", error);
            const errorMsg = error?.response?.data?.message || "Error logging in. Please try again.";
            setError(errorMsg);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl px-8 bg-white shadow-md rounded-lg">
                <div className="flex items-center justify-center lg:w-1/2 w-full p-4">
                    <img
                        src="src/assets/images/GuidEngine.png"
                        alt="Logo"
                        className="w-64 h-64"
                    />
                </div>

                <div className="lg:w-1/2 w-full p-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Log in to your account</h2>
                    <p className="mt-2 text-sm text-gray-500">Welcome back! Please enter your details.</p>

                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div>
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

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="remember_me" className="ml-2 text-sm text-gray-600">Remember for 30 days</label>
                            </div>
                            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign in
                            </button>
                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/register")}
                                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
