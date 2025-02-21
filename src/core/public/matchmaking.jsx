import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const MatchmakingPage = () => {
    const [matchups, setMatchups] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState("Valo Scrims"); // Default selected tournament

    useEffect(() => {
        const fetchMatchups = async () => {
            if (!selectedTournament) return; // Avoid fetching if no tournament is selected
            console.log("Fetching matchups for:", selectedTournament); // Debugging
            try {
                const encodedTournament = encodeURIComponent(selectedTournament.trim());
                const response = await axios.get(`http://localhost:3000/api/matchups/matchup/${encodedTournament}`);

                console.log("Matchups response:", response.data); // Log response data

                // Set matchups from the response data
                if (response.data.length > 0) {
                    setMatchups(response.data[0].matchups); // Access matchups from the first tournament entry
                } else {
                    setMatchups([]); // Reset matchups if no data found
                }
            } catch (error) {
                console.error("Error fetching matchups:", error);
            }
        };

        fetchMatchups();
    }, [selectedTournament]);

    const handleTournamentChange = (event) => {
        setSelectedTournament(event.target.value); // Update selected tournament
    };

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6">
                    <section className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
                        <h2 className="text-3xl font-semibold text-[#4A4A4A] mb-6 text-center">
                            Matchmaking
                        </h2>

                        {/* Tournament Selection */}
                        <div className="mb-4 text-center">
                            <select
                                value={selectedTournament}
                                onChange={handleTournamentChange}
                                className="border rounded p-3 text-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            >
                                <option value="Valo Scrims">Valo Scrims</option>
                                <option value="Pubg 1v1">Pubg 1v1</option>
                                {/* Add more tournament options as needed */}
                            </select>
                        </div>

                        {/* Matchups Display */}
                        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                            {matchups.length > 0 ? (
                                matchups.map((match, index) => (
                                    <div
                                        key={index}
                                        className="relative p-4 rounded-lg flex justify-between items-center"
                                    >
                                        {/* Video Background */}
                                        <video
                                            src="/src/assets/videos/purple-infinity-galaxy-moewalls-com.mp4"
                                            className="absolute inset-0 object-cover w-full h-full opacity-80 rounded-lg"
                                            autoPlay
                                            loop
                                            muted
                                        />
                                        <div className="relative z-10 flex-1 text-white flex justify-center items-center">
                                            <span className="font-bold">{match.participant1}</span>
                                            <span className="text-sm font-bold mx-2">vs</span>
                                            <span className="font-bold">{match.participant2}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[#4A4A4A] text-center">No matchups available.</p>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default MatchmakingPage;