import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin_navbar/admin_navbar.jsx";
import AdminSidebar from "../../components/admin_sidebar/admin_sidebar.jsx";

const Winner = () => {
    const [tournaments, setTournaments] = useState([]);
    const [players, setPlayers] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState("");
    const [selectedWinner, setSelectedWinner] = useState("");

    // Fetch tournaments (from players table)
    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/player/players");

                if (response.data.length === 0) {
                    console.log("No players found.");
                    return;
                }

                // Extract unique tournament names
                const uniqueTournaments = [...new Set(response.data.map(player => player.tournament))];
                setTournaments(uniqueTournaments);
            } catch (error) {
                console.error("Error fetching tournaments:", error);
            }
        };

        fetchTournaments();
    }, []);

    // Fetch players based on the selected tournament
    useEffect(() => {
        const fetchPlayers = async () => {
            if (!selectedTournament) return;

            try {
                const response = await axios.get("http://localhost:3000/api/player/players");
                const filteredPlayers = response.data.filter(player => player.tournament === selectedTournament);
                setPlayers(filteredPlayers);
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };

        fetchPlayers();
    }, [selectedTournament]);

    // Handle form submission
    const handleWinnerSubmit = async () => {
        if (!selectedTournament || !selectedWinner) {
            alert("Please select both tournament and winner!");
            return;
        }

        const payload = {
            tournamentId: selectedTournament, // Sending tournament name instead of ID
            winner: selectedWinner, // Winner name
        };

        console.log("Payload being sent:", payload);

        try {
            const response = await axios.post("http://localhost:3000/api/winners/addwinners", payload);
            console.log("Winner added successfully:", response.data);
            alert("Winner added successfully!");
        } catch (error) {
            console.error("Error updating winner", error.response?.data || error);
            alert(error.response?.data?.error || "Failed to add winner");
        }
    };

    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminNavbar />
                <div className="flex-1 flex flex-col items-center justify-center bg-white p-6">
                    <div className="w-full max-w-3xl bg-[#F4F4F9] p-8 rounded-3xl shadow-xl">
                        <h1 className="text-3xl font-bold text-center mb-6 text-[#3A3A3A]">
                            Select Tournament Winner
                        </h1>

                        {/* Tournament Selection */}
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-[#3A3A3A] mb-2">
                                Select a Tournament:
                            </label>
                            <select
                                onChange={(e) => setSelectedTournament(e.target.value)}
                                value={selectedTournament}
                                className="w-full bg-[#f0f0f0] text-black py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                            >
                                <option value="">Choose a tournament</option>
                                {tournaments.map((tournament, index) => (
                                    <option key={index} value={tournament}>
                                        {tournament}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Winner Selection */}
                        {selectedTournament && (
                            <div className="mb-6">
                                <label className="block text-lg font-semibold text-[#3A3A3A] mb-2">
                                    Select a Winner:
                                </label>
                                <select
                                    onChange={(e) => setSelectedWinner(e.target.value)}
                                    value={selectedWinner}
                                    className="w-full bg-[#f0f0f0] text-black py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                                >
                                    <option value="">Choose a player</option>
                                    {players.map((player) => (
                                        <option key={player._id} value={player.name}>
                                            {player.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleWinnerSubmit}
                            className={`w-full py-3 mt-4 rounded-lg text-lg font-bold transition ${selectedTournament && selectedWinner
                                ? "bg-[#9694FF] hover:bg-[#7F7CFF] text-white cursor-pointer"
                                : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                }`}
                            disabled={!selectedTournament || !selectedWinner}
                        >
                            Submit Winner
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Winner;