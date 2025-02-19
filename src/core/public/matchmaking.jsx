import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const MatchmakingPage = () => {
    const [matchups, setMatchups] = useState([]);
    const [tournament, setTournament] = useState("Tournament Name");

    useEffect(() => {
        const fetchMatchups = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/matchups/${tournament}`);
                setMatchups(response.data);
            } catch (error) {
                console.error("Error fetching matchups:", error);
            }
        };

        fetchMatchups();
    }, [tournament]);

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6">
                    <h2 className="text-3xl font-semibold text-center">Matchmaking</h2>

                    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                        {matchups.length > 0 ? (
                            matchups.map((match, index) => (
                                <div key={index} className="bg-[#9694FF] text-white p-4 rounded-lg flex justify-between items-center">
                                    <span>{match.participant1}</span>
                                    <span className="text-sm font-bold">vs</span>
                                    <span>{match.participant2}</span>
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
