import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const MatchmakingPage = () => {
    const [matchups, setMatchups] = useState([]);
    const [tournament, setTournament] = useState("Tournament Name");

    // Function to shuffle players in matchups
    const shufflePlayers = (matchups) => {
        return matchups.map((match) => {
            const participants = [match.participant1, match.participant2];
            // Fisher-Yates shuffle algorithm
            for (let i = participants.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [participants[i], participants[j]] = [participants[j], participants[i]]; // Swap
            }
            return { ...match, shuffledParticipants: participants };
        });
    };

    useEffect(() => {
        const fetchMatchups = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/matchups/tournament/${tournament}`);
                const shuffledMatchups = shufflePlayers(response.data); // Shuffle the matchups
                setMatchups(shuffledMatchups);
            } catch (error) {
                console.error("Error fetching matchups:", error);
            }
        };

        if (tournament) {
            fetchMatchups();
        }
    }, [tournament]);

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6">
                    <h2 className="text-3xl font-semibold text-center">Matchmaking</h2>

                    {/* Dropdown for selecting tournament */}
                    <div className="mb-4">
                        <select
                            value={tournament}
                            onChange={(e) => setTournament(e.target.value)}
                            className="w-full bg-[#f0f0f0] text-black py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                        >
                            <option value="Tournament Name">Choose a Tournament</option>
                            <option value="Tournament 1">Tournament 1</option>
                            <option value="Tournament 2">Tournament 2</option>
                        </select>
                    </div>

                    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                        {matchups.length > 0 ? (
                            matchups.map((match, index) => (
                                <div key={index} className="bg-[#9694FF] text-white p-4 rounded-lg flex justify-between items-center">
                                    <span>{match.shuffledParticipants[0]}</span>
                                    <span className="text-sm font-bold">vs</span>
                                    <span>{match.shuffledParticipants[1]}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No matchups available.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MatchmakingPage;
