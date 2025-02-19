import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin_navbar/admin_navbar.jsx";
import AdminSidebar from "../../components/admin_sidebar/admin_sidebar.jsx";

const Shuffle = () => {
    const [players, setPlayers] = useState([]);
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [matchups, setMatchups] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/player/players");
                const playersData = response.data;
                setPlayers(playersData);

                const uniqueGames = [...new Set(playersData.map(player => player.game))];
                setGames(uniqueGames);
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };

        fetchPlayers();
    }, []);

    const handleGameSelect = (gameName) => {
        setSelectedGame(gameName);
        const filteredTournaments = [...new Set(players.filter(player => player.game === gameName).map(player => player.tournament))];
        setTournaments(filteredTournaments);
        setSelectedTournament(null);
        setParticipants([]);
        setMatchups([]);
    };

    const handleTournamentSelect = (tournamentName) => {
        setSelectedTournament(tournamentName);
        const tournamentParticipants = players
            .filter(player => player.tournament === tournamentName)
            .map(player => player.name);
        setParticipants(tournamentParticipants);
        setMatchups([]);
    };

    const shuffleParticipants = async () => {
        if (participants.length === 0) return;

        // Shuffle the participants
        const shuffled = [...participants];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        console.log("Shuffled Participants:", shuffled); // Debugging log

        // Pair up the participants
        const pairs = [];
        for (let i = 0; i < shuffled.length; i += 2) {
            if (i + 1 < shuffled.length) {
                pairs.push({ participant1: shuffled[i], participant2: shuffled[i + 1] });
            }
        }

        console.log("Generated Matchups:", pairs); // Debugging log

        // Update state with the shuffled matchups
        setMatchups(pairs);

        // Save matchups to the backend
        try {
            await axios.post("http://localhost:3000/api/matchups/saveMatchups", {
                tournament: selectedTournament,
                matchups: pairs
            });
            console.log("Matchups saved successfully!");
        } catch (error) {
            console.error("Error saving matchups:", error);
        }
    };

    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminNavbar />
                <div className="flex-1 flex flex-col items-center justify-center bg-white p-6">
                    <div className="w-full max-w-3xl bg-[#F4F4F9] p-8 rounded-3xl shadow-xl">
                        <h1 className="text-3xl font-bold text-center mb-6 text-[#3A3A3A]">Shuffle Participants</h1>

                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-[#3A3A3A] mb-2">Select a Game:</label>
                            <select
                                onChange={(e) => handleGameSelect(e.target.value)}
                                className="w-full bg-[#f0f0f0] text-black py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                            >
                                <option value="">Choose a game</option>
                                {games.map((game, index) => (
                                    <option key={index} value={game}>{game}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-[#3A3A3A] mb-2">Select a Tournament:</label>
                            <select
                                onChange={(e) => handleTournamentSelect(e.target.value)}
                                className="w-full bg-[#f0f0f0] text-black py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                                disabled={!selectedGame}
                            >
                                <option value="">Choose a tournament</option>
                                {tournaments.map((tournament, index) => (
                                    <option key={index} value={tournament}>{tournament}</option>
                                ))}
                            </select>
                        </div>

                        {selectedTournament && participants.length > 0 && (
                            <div className="mb-6 bg-[#E1D8FF] p-4 rounded-xl shadow-md max-h-40 overflow-y-auto">
                                <h2 className="text-xl font-semibold text-center mb-3 text-[#3A3A3A]">
                                    Participants in {selectedTournament}
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {participants.map((name, index) => (
                                        <div
                                            key={index}
                                            className="p-3 text-center bg-[#9694FF] text-white font-bold rounded-lg shadow-lg"
                                        >
                                            {name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={shuffleParticipants}
                            className={`w-full py-3 mt-4 rounded-lg text-lg font-bold transition ${participants.length > 0
                                ? "bg-[#9694FF] hover:bg-[#7F7CFF] text-white cursor-pointer"
                                : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                }`}
                            disabled={participants.length === 0}
                        >
                            Shuffle Participants
                        </button>

                        {matchups.length > 0 && (
                            <div className="mt-6 bg-[#E1D8FF] p-6 rounded-xl shadow-md max-h-40 overflow-y-auto">
                                <h2 className="text-2xl font-semibold text-center mb-4 text-[#3A3A3A]">Matchups</h2>
                                <ul className="space-y-4">
                                    {matchups.map((pair, index) => (
                                        <li
                                            key={index}
                                            className="p-4 bg-[#9694FF] text-white font-bold rounded-lg text-center shadow-md"
                                        >
                                            {pair.participant1} vs {pair.participant2}
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
