import axios from "axios";
import 'material-icons/iconfont/material-icons.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';

const DashboardPage = () => {
    const navigate = useNavigate();

    const bannerImages = [
        "/src/assets/images/fortniteB.jpg",
        "/src/assets/images/valorant.jpg",
        "/src/assets/images/pubg.jpg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [registeredGames, setRegisteredGames] = useState([]);

    // Banner Image Rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Fetch Registered Games (Updated to use GET)
    useEffect(() => {
        const fetchRegisteredGames = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/player/players");
                console.log(response.data);  // Log the response structure to check
                // Assuming the response is an array of players
                if (Array.isArray(response.data)) {
                    setRegisteredGames(response.data);
                } else {
                    console.error("Data is not an array:", response.data);
                }
            } catch (error) {
                console.error("Error fetching registered games", error);
            }
        };
        fetchRegisteredGames();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
                <Navbar />
                <section className="w-full">
                    <div className="relative w-full">
                        <img
                            src={bannerImages[currentIndex]}
                            alt={`Banner ${currentIndex + 1}`}
                            className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-all duration-1000 ease-in-out"
                        />
                    </div>
                </section>
                <main className="flex-1 p-6 space-y-6">

                    {/* Popular Games Section */}
                    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Popular Games</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[{ name: "Valorant", video: "iDBPLD3a8us" }, { name: "PUBG", video: "z7iqgU5QOHI" }, { name: "Fortnite", video: "Jl-EV4y_-UQ" }].map((game) => (
                                <div
                                    key={game.name}
                                    className="relative bg-[#4C47D1] text-white p-4 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 focus:outline-none"
                                    onClick={() => navigate(`/tournaments/${game.name}`)}
                                >
                                    <iframe
                                        src={`https://www.youtube.com/embed/${game.video}?autoplay=1&loop=1&mute=1`}
                                        className="w-full h-60 rounded-lg"
                                        allow="autoplay; encrypted-media"
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                    <div className="absolute bottom-4 left-4 text-xl font-semibold">{game.name}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Registered Games Section */}
                    <section className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Registered Games</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {registeredGames.length > 0 ? (
                                registeredGames.map((player, index) => (
                                    <div key={index} className="relative bg-[#2C7A7B] text-white p-4 rounded-lg shadow-xl">
                                        <h3 className="text-lg font-semibold">{player.name}</h3>
                                        <ul className="mt-2">
                                            <li className="text-sm">{player.name} - {player.tournament}</li>
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white">No registered games available.</p>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;