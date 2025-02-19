import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const MatchmakingPage = () => {
    const [matchups, setMatchups] = useState([]);

    useEffect(() => {
        // Replace with the actual tournament name you want to fetch data for
        const tournamentName = "Tournament 1";  // Example tournament name

        // Fetch matchups from backend API
        const fetchMatchups = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/matchups/tournament/${tournamentName}`);
                setMatchups(response.data);
            } catch (error) {
                console.error("Error fetching matchups:", error);
            }
        };

        // Fetch matchups when the component mounts
        fetchMatchups();
    }, []); // Empty dependency array means this will run only once after the component mounts

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
                                        <span>{match.participant1}</span>
                                        <span className="text-sm font-bold">vs</span>
                                        <span>{match.participant2}</span>
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
