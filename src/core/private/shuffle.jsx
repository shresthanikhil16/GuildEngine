import React, { useState } from "react";
import AdminNavbar from "../../components/admin_navbar/admin_navbar.jsx";
import AdminSidebar from "../../components/admin_sidebar/admin_sidebar.jsx";

const Shuffle = () => {
    const [games, setGames] = useState([
        { id: 1, name: "Game 1", teams: ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F"] },
        { id: 2, name: "Game 2", teams: ["Team G", "Team H", "Team I", "Team J", "Team K", "Team L"] },
    ]);

    const [selectedGame, setSelectedGame] = useState(null);
    const [matchups, setMatchups] = useState([]);

    const shuffleTeams = () => {
        if (!selectedGame) return;

        const shuffled = [...selectedGame.teams];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        const pairs = [];
        for (let i = 0; i < shuffled.length; i += 2) {
            if (i + 1 < shuffled.length) {
                pairs.push({ team1: shuffled[i], team2: shuffled[i + 1] });
            }
        }

        setMatchups(pairs);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <AdminSidebar />

            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <AdminNavbar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center bg-white p-6">
                    <div className="w-full max-w-3xl bg-[#F4F4F9] p-8 rounded-3xl shadow-xl">
                        <h1 className="text-3xl font-bold text-center mb-6 text-[#3A3A3A]">Shuffle Teams</h1>

                        {/* Game Selection */}
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-[#3A3A3A] mb-2">Select a Game:</label>
                            <select
                                onChange={(e) => {
                                    const game = games.find((g) => g.id === parseInt(e.target.value));
                                    setSelectedGame(game);
                                    setMatchups([]);
                                }}
                                className="w-full bg-[#f0f0f0] text-black py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                            >
                                <option value="">Choose a game</option>
                                {games.map((game) => (
                                    <option key={game.id} value={game.id}>
                                        {game.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Show Teams */}
                        {selectedGame && (
                            <div className="mb-6 bg-[#E1D8FF] p-4 rounded-xl shadow-md max-h-40 overflow-y-auto">
                                <h2 className="text-xl font-semibold text-center mb-3 text-[#3A3A3A]">Teams in {selectedGame.name}</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {selectedGame.teams.map((team, index) => (
                                        <div
                                            key={index}
                                            className="p-3 text-center bg-[#9694FF] text-white font-bold rounded-lg shadow-lg"
                                        >
                                            {team}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Shuffle Button */}
                        <button
                            onClick={shuffleTeams}
                            className={`w-full py-3 mt-4 rounded-lg text-lg font-bold transition ${selectedGame
                                ? "bg-[#9694FF] hover:bg-[#7F7CFF] text-white cursor-pointer"
                                : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                }`}
                            disabled={!selectedGame}
                        >
                            Shuffle Teams
                        </button>

                        {/* Matchups Section */}
                        {matchups.length > 0 && (
                            <div className="mt-6 bg-[#E1D8FF] p-6 rounded-xl shadow-md max-h-40 overflow-y-auto">
                                <h2 className="text-2xl font-semibold text-center mb-4 text-[#3A3A3A]">Matchups</h2>
                                <ul className="space-y-4">
                                    {matchups.map((pair, index) => (
                                        <li
                                            key={index}
                                            className="p-4 bg-[#9694FF] text-white font-bold rounded-lg text-center shadow-md"
                                        >
                                            {pair.team1} vs {pair.team2}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shuffle;