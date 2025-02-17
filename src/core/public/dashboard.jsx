import axios from "axios";
import 'material-icons/iconfont/material-icons.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';

const DashboardPage = () => {
    const navigate = useNavigate();

    // Array of dynamic banner images
    const bannerImages = [
        "/src/assets/images/fortniteB.jpg",
        "/src/assets/images/valorant.jpg",
        "/src/assets/images/pubg.jpg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [tournaments, setTournaments] = useState([]);

    // Change the active image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Fetch all tournaments from the backend
    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/tournaments");
                setTournaments(response.data);
            } catch (error) {
                console.error("Error fetching tournaments", error);
            }
        };
        fetchTournaments();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
                <Navbar />

                {/* Dynamic Banner Slider */}
                <section className="w-full">
                    <div className="relative w-full">
                        <img
                            src={bannerImages[currentIndex]}
                            alt={`Banner ${currentIndex + 1}`}
                            className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-all duration-1000 ease-in-out"
                        />
                    </div>
                </section>

                {/* Main Content */}
                <main className="flex-1 p-6 space-y-6">
                    {/* Popular Games Section */}
                    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Popular Games</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Valorant Game Widget */}
                            <div
                                className="relative bg-[#4C47D1] text-white p-4 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 focus:outline-none"
                                onClick={() => navigate('/tournaments/Valorant')}
                            >
                                <iframe
                                    src="https://www.youtube.com/embed/iDBPLD3a8us?autoplay=1&loop=1&mute=1"
                                    className="w-full h-60 rounded-lg"
                                    allow="autoplay; encrypted-media"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                                <div className="absolute bottom-4 left-4 text-xl font-semibold">Valorant</div>
                            </div>

                            {/* PUBG Game Widget */}
                            <div
                                className="relative bg-[#4C47D1] text-white p-4 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 focus:outline-none"
                                onClick={() => navigate('/tournaments/PUBG')}
                            >
                                <iframe
                                    src="https://www.youtube.com/embed/z7iqgU5QOHI?autoplay=1&loop=1&mute=1"
                                    className="w-full h-60 rounded-lg"
                                    allow="autoplay; encrypted-media"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                                <div className="absolute bottom-4 left-4 text-xl font-semibold">PUBG</div>
                            </div>

                            {/* Fortnite Game Widget */}
                            <div
                                className="relative bg-[#4C47D1] text-white p-4 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 focus:outline-none"
                                onClick={() => navigate('/tournaments/Fortnite')}
                            >
                                <iframe
                                    src="https://www.youtube.com/embed/Jl-EV4y_-UQ?autoplay=1&loop=1&mute=1"
                                    className="w-full h-60 rounded-lg"
                                    allow="autoplay; encrypted-media"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                                <div className="absolute bottom-4 left-4 text-xl font-semibold">Fortnite</div>
                            </div>

                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
