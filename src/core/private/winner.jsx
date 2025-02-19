import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin_navbar/admin_navbar.jsx";
import AdminSidebar from "../../components/admin_sidebar/admin_sidebar.jsx";

const Winner = () => {
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [players, setPlayers] = useState([]);
    const [winner, setWinner] = useState("");

    // Fetch tournament names from players table
    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/player");

                // Extract unique tournament names and group players by tournament
                const tournamentMap = {};
                response.data.forEach(player => {
                    if (!tournamentMap[player.tournament]) {
                        tournamentMap[player.tournament] = [];
                    }
                    tournamentMap[player.tournament].push(player.name);
                });

                // Convert object into an array for selection
                const formattedTournaments = Object.keys(tournamentMap).map(tournament => ({
                    name: tournament,
                    players: tournamentMap[tournament],
                }));

                setTournaments(formattedTournaments);
            } catch (error) {
                console.error("Error fetching tournaments", error);
            }
        };
        fetchTournaments();
    }, []);

    // Handle winner selection
    const handleWinnerSubmit = async () => {
        if (!selectedTournament || !winner) return;

        try {
            await axios.post("http://localhost:3000/api/winners", {
                tournament: selectedTournament.name,
                winner: winner,
            });
            alert("Winner has been updated successfully!");
        } catch (error) {
            console.error("Error updating winner", error);
            alert("Failed to update winner.");
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
                                onChange={(e) => {
                                    const tournament = tournaments.find(t => t.name === e.target.value);
                                    setSelectedTournament(tournament);
                                    setPlayers(tournament ? tournament.players : []);
                                    setWinner("");
                                }}
                                className="w-full bg-[#f0f0f0] text-black py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                            >
                                <option value="">Choose a tournament</option>
                                {tournaments.map((tournament, index) => (
                                    <option key={index} value={tournament.name}>
                                        {tournament.name}
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
                                    onChange={(e) => setWinner(e.target.value)}
                                    className="w-full bg-[#f0f0f0] text-black py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                                >
                                    <option value="">Choose a player</option>
                                    {players.map((player, index) => (
                                        <option key={index} value={player}>{player}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleWinnerSubmit}
                            className={`w-full py-3 mt-4 rounded-lg text-lg font-bold transition ${selectedTournament && winner
                                ? "bg-[#9694FF] hover:bg-[#7F7CFF] text-white cursor-pointer"
                                : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                }`}
                            disabled={!selectedTournament || !winner}
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
