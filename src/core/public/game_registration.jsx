import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const GameRegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        game: "",
        tournament: "",
        teamNumber: "",
    });

    const [games, setGames] = useState([]); // Store game list
    const [tournaments, setTournaments] = useState([]); // Store tournaments for selected game
    const [loadingTournaments, setLoadingTournaments] = useState(false); // Loading state for tournaments
    const [responseMessage, setResponseMessage] = useState(""); // Response message for success or error

    // Fetch games when the component mounts
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/games/games");
                console.log("Games fetched:", response.data);
                setGames(response.data);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };
        fetchGames();
    }, []);

    // Fetch tournaments based on selected game
    useEffect(() => {
        if (formData.game) {
            setLoadingTournaments(true);
            const fetchTournaments = async () => {
                try {
                    console.log(`Fetching tournaments for game: "${formData.game}"`);
                    const response = await axios.get(`http://localhost:3000/api/tournaments/${formData.game.trim()}`);
                    console.log("Tournaments fetched:", response.data);
                    setTournaments(response.data);
                } catch (error) {
                    console.error("Error fetching tournaments:", error);
                    setTournaments([]); // Clear tournaments on error
                } finally {
                    setLoadingTournaments(false);
                }
            };
            fetchTournaments();
        } else {
            setTournaments([]); // Clear tournaments when no game is selected
        }
    }, [formData.game]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/tournaments/registerGames", formData);
            setResponseMessage("Player registered successfully!");
            setFormData({ name: "", email: "", game: "", tournament: "", teamNumber: "" }); // Reset form
        } catch (error) {
            console.error("Error registering player:", error);
            setResponseMessage("Error registering player. Please try again.");
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

                {/* Exterior Box for Form */}
                <div className="flex justify-center items-center p-8">
                    <div className="bg-[#F4F4F9] p-8 rounded-lg shadow-2xl w-full max-w-5xl h-auto">
                        {/* Box around the form */}
                        <div className="border-4 border-[#9694FF] p-8 rounded-lg">
                            <h2 className="text-3xl font-semibold text-[#3A3A3A] mb-8 text-center">Register</h2>

                            {/* Response message */}
                            {responseMessage && (
                                <div className="text-center mb-4 text-lg font-semibold">{responseMessage}</div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Input */}
                                <div className="flex flex-col">
                                    <label className="text-[#3A3A3A] font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="p-3 rounded-md border border-[#D1D1D6] mt-2"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="flex flex-col">
                                    <label className="text-[#3A3A3A] font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="p-3 rounded-md border border-[#D1D1D6] mt-2"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                {/* Game Select Dropdown */}
                                <div className="flex flex-col">
                                    <label className="text-[#3A3A3A] font-medium">Select Game</label>
                                    <select
                                        name="game"
                                        value={formData.game}
                                        onChange={handleChange}
                                        className="p-3 rounded-md border border-[#D1D1D6] mt-2"
                                        required
                                    >
                                        <option value="">Select a game</option>
                                        {games.map((game) => (
                                            <option key={game._id} value={game.name.trim()}>
                                                {game.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tournament Select Dropdown */}
                                {formData.game && (
                                    <div className="flex flex-col relative z-10">
                                        <label className="text-[#3A3A3A] font-medium">Select Tournament</label>
                                        {loadingTournaments ? (
                                            <div>Loading tournaments...</div>
                                        ) : (
                                            <select
                                                name="tournament"
                                                value={formData.tournament}
                                                onChange={handleChange}
                                                className="p-3 rounded-md border border-[#D1D1D6] mt-2"
                                                required
                                            >
                                                <option value="">Select a tournament</option>
                                                {tournaments.length === 0 ? (
                                                    <option value="" disabled>No tournaments available</option>
                                                ) : (
                                                    tournaments.map((tournament) => (
                                                        <option key={tournament._id} value={tournament.name.trim()}>
                                                            {tournament.name}
                                                        </option>
                                                    ))
                                                )}
                                            </select>
                                        )}
                                    </div>
                                )}

                                {/* Team Number Input */}
                                <div className="flex flex-col">
                                    <label className="text-[#3A3A3A] font-medium">Team Number</label>
                                    <input
                                        type="text"
                                        name="teamNumber"
                                        value={formData.teamNumber}
                                        onChange={handleChange}
                                        className="p-3 rounded-md border border-[#D1D1D6] mt-2"
                                        placeholder="Enter your team number (optional)"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#9694FF] text-white py-3 rounded-md mt-6 hover:bg-[#7F7CFF] transition"
                                >
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameRegistrationPage;
