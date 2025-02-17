import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const MatchmakingPage = () => {
    const [participants, setParticipants] = useState([
        "Player 1",
        "Player 2",
        "Player 3",
        "Player 4",
        "Player 5",
        "Player 6",
        "Player 7",
        "Player 8",
    ]);
    const [matchups, setMatchups] = useState([]);

    const generateMatchups = () => {
        // Shuffle participants array
        const shuffled = [...participants].sort(() => Math.random() - 0.5);

        // Pair participants into matchups
        const newMatchups = [];
        for (let i = 0; i < shuffled.length; i += 2) {
            if (shuffled[i + 1]) {
                newMatchups.push([shuffled[i], shuffled[i + 1]]);
            } else {
                // If odd number of players, last one gets a bye
                newMatchups.push([shuffled[i], "Bye"]);
            }
        }
        setMatchups(newMatchups);
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Navbar />

                {/* Matchmaking Section */}
                <main className="flex-1 p-6">
                    <section className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
                        <h2 className="text-3xl font-semibold text-[#4A4A4A] mb-6 text-center">
                            Matchmaking
                        </h2>

                        {/* Matchups Display */}
                        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                            {matchups.length > 0 ? (
                                matchups.map((match, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#9694FF] text-white p-4 rounded-lg flex justify-between items-center"
                                    >
                                        <span>{match[0]}</span>
                                        <span className="text-sm font-bold">vs</span>
                                        <span>{match[1]}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[#4A4A4A] text-center">No matchups generated yet.</p>
                            )}
                        </div>

                        {/* Generate Matchups Button */}
                        <button
                            className="px-6 py-3 bg-[#9694FF] text-white rounded-lg hover:bg-[#7F7CFF] transition"
                            onClick={generateMatchups}
                        >
                            Generate Matchups
                        </button>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default MatchmakingPage;
