import React from "react";
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';

const HistoryPage = () => {
    // Sample match history data (Replace with actual API data)
    const matchHistory = [
        { id: 1, player1: "John", player2: "Alice", winner: "John", date: "2025-02-10", status: "Completed" },
        { id: 2, player1: "Bob", player2: "Eve", winner: "Eve", date: "2025-02-11", status: "Completed" },
        { id: 3, player1: "Charlie", player2: "David", winner: "David", date: "2025-02-12", status: "Completed" },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar (Fixed Width) */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Navbar (Fixed on Top) */}
                <Navbar />

                {/* Match History Section */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-[#9694FF] mb-6">Match History</h1>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#9694FF] text-white">
                                    <th className="p-3 text-left">Match</th>
                                    <th className="p-3 text-left">Winner</th>
                                    <th className="p-3 text-left">Date</th>
                                    <th className="p-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchHistory.map((match) => (
                                    <tr key={match.id} className="border-b hover:bg-gray-200">
                                        <td className="p-3">{match.player1} vs {match.player2}</td>
                                        <td className="p-3 font-bold text-green-500">{match.winner}</td>
                                        <td className="p-3">{match.date}</td>
                                        <td className="p-3">{match.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
