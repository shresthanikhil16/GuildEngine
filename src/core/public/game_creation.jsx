import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const TournamentCreationPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        game: "",
        startDate: "",
        endDate: "",
        prize: "",
        description: "",
    });

    const [games, setGames] = useState([]); // State to store game names

    // Fetch games when the component mounts
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/games/games");
                setGames(response.data); // Store fetched games in state
            } catch (error) {
                console.error("Error fetching games", error);
            }
        };

        fetchGames();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the form data to the backend API to create the tournament
            const response = await axios.post("http://localhost:3000/api/tournaments/registerGames", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Log the response from the backend
            console.log("Tournament Created:", response.data);

            // Optionally show a success message or redirect
            alert("Tournament successfully created!");

            // Clear the form after successful submission
            setFormData({
                name: "",
                game: "",
                startDate: "",
                endDate: "",
                prize: "",
                description: "",
            });
        } catch (error) {
            console.error("Error creating tournament", error);
            alert("Failed to create tournament. Please try again.");
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex justify-center items-center w-full h-full p-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-screen-xl h-full">
                        <div className="border-t-8 border-[#9694FF] p-6 rounded-lg h-full flex flex-col justify-between">
                            <h2 className="text-3xl font-semibold text-[#3A3A3A] mb-6 text-center">
                                Create a Tournament
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6 flex-grow overflow-y-auto">
                                <div className="flex flex-col">
                                    <label className="text-[#3A3A3A] font-medium">Tournament Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="p-4 rounded-lg border border-[#D1D1D6] mt-2 text-lg"
                                        placeholder="Enter the tournament name"
                                        required
                                    />
                                </div>

                                {/* Select Game Dropdown */}
                                <div className="flex flex-col">
                                    <label className="text-[#3A3A3A] font-medium">Select Game</label>
                                    <select
                                        name="game"
                                        value={formData.game}
                                        onChange={handleChange}
                                        className="p-4 rounded-lg border border-[#D1D1D6] mt-2 text-lg"
                                        required
                                    >
                                        <option value="">Select a game</option>
                                        {games.map((game) => (
                                            <option key={game._id} value={game.name}>
                                                {game.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Other Tournament Fields */}
                                <div className="flex flex-col">
                                    <label className="text-[#3A3A3A] font-medium">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="p-4 rounded-lg border border-[#D1D1D6] mt-2 text-lg"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[#3A3A3A] font-medium">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="p-4 rounded-lg border border-[#D1D1D6] mt-2 text-lg"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[#3A3A3A] font-medium">Prize</label>
                                    <input
                                        type="text"
                                        name="prize"
                                        value={formData.prize}
                                        onChange={handleChange}
                                        className="p-4 rounded-lg border border-[#D1D1D6] mt-2 text-lg"
                                        placeholder="Enter the prize"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[#3A3A3A] font-medium">Tournament Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="p-4 rounded-lg border border-[#D1D1D6] mt-2 text-lg"
                                        placeholder="Describe the tournament"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#9694FF] text-white py-3 rounded-lg mt-6 text-lg font-semibold hover:bg-[#7F7CFF] transition"
                                >
                                    Create Tournament
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentCreationPage;