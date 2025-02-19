import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

const HistoryPage = () => {
    const [matchHistory, setMatchHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatchHistory = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/winners/winners");
                setMatchHistory(response.data);
            } catch (error) {
                console.error("Error fetching match history:", error);
                setError("Failed to fetch match history");
            } finally {
                setLoading(false);
            }
        };
        fetchMatchHistory();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Navbar />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-[#9694FF] mb-6">Match History</h1>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading match history...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p>
                        ) : matchHistory.length > 0 ? (
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-[#9694FF] text-white">
                                        <th className="p-3 text-left">Tournament</th>
                                        <th className="p-3 text-left">Winner</th>
                                        <th className="p-3 text-left">Date</th>
                                        <th className="p-3 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matchHistory.map((match, index) => (
                                        <tr key={match._id || index} className="border-b hover:bg-gray-200">
                                            <td className="p-3 font-bold">{match.tournament || "N/A"}</td>
                                            <td className="p-3 font-bold text-green-500">{match.winner}</td>
                                            <td className="p-3">{match.date || "Unknown"}</td>
                                            <td className="p-3 font-bold text-blue-500">Completed</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-500">No match history available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
