import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated, setIsAdmin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [role, setRole] = useState(""); // Store role for useEffect

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                email,
                password,
            });

            const { token, role } = response.data;
            console.log("Login Success, Role:", role); // Debugging

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            setIsAuthenticated(true);
            setIsAdmin(role === "admin");
            setRole(role); // Update role state
        } catch (error) {
            console.error("Login error: ", error);
            const errorMsg = error?.response?.data?.message || "Error logging in. Please try again.";
            setError(errorMsg);
        }
    };

    // 🔥 UseEffect to navigate when role updates
    useEffect(() => {
        if (role === "admin") {
            navigate("/admindash");
        } else if (role === "user") {
            navigate("/dashboard");
        }
    }, [role, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl px-8 bg-white shadow-md rounded-lg">
                <div className="flex items-center justify-center lg:w-1/2 w-full p-4">
                    <img
                        src="src/assets/images/GuidEngine.png"
                        alt="Logo"
                        id="logo" // ✅ Fixed locator issue
                        className="w-64 h-64"
                    />
                </div>

                <div className="lg:w-1/2 w-full p-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
                    <p className="mt-2 text-sm text-gray-500">Please enter your details.</p>

                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mt-4">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
                                placeholder="Password"
                            />
                        </div>

                        {error && <p data-testid="error-message" className="text-red-500 text-sm mt-2">{error}</p>}

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Sign in
                            </button>
                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/register")}
                                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
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
