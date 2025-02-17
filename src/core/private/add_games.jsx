import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin_navbar/admin_navbar.jsx";
import AdminSidebar from "../../components/admin_sidebar/admin_sidebar.jsx";
import axios from 'axios';

const AddGames = () => {
    const [games, setGames] = useState([]);
    const [newGame, setNewGame] = useState({
        name: "",
        description: "",
        imageUrl: "",
    });

    // Fetch games when the component loads or after login
    const fetchGames = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/games/games");
            setGames(response.data); // Update the state with fetched games
        } catch (error) {
            console.error("Error fetching games", error);
        }
    };

    useEffect(() => {
        fetchGames(); // Fetch the games when the component mounts
    }, []); // Empty dependency array ensures this runs only once after the component mounts

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGame((prevGame) => ({
            ...prevGame,
            [name]: value,
        }));
    };

    const handleAddGame = async () => {
        if (newGame.name && newGame.description && newGame.imageUrl) {
            try {
                const response = await axios.post("http://localhost:3000/api/games/games", newGame, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.status === 201) {
                    // Add the new game to the list without re-fetching
                    setGames((prevGames) => [...prevGames, response.data]);
                    setNewGame({ name: "", description: "", imageUrl: "" });
                } else {
                    alert("Failed to add the game.");
                }
            } catch (error) {
                alert(error.response?.data?.error || "An error occurred.");
                console.error(error);
            }
        } else {
            alert("Please fill in all the fields.");
        }
    };

    return (
        <div className="flex h-screen">
            <AdminSidebar />

            <div className="flex-1 flex flex-col">
                <AdminNavbar />

                <main className="flex-1 p-6 space-y-6">
                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-bold text-[#662f34]">Add New Game</h2>
                        <div className="mt-4 space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={newGame.name}
                                onChange={handleInputChange}
                                placeholder="Game Name"
                                className="w-full p-3 border border-[#9694FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                            />
                            <textarea
                                name="description"
                                value={newGame.description}
                                onChange={handleInputChange}
                                placeholder="Game Description"
                                className="w-full p-3 border border-[#9694FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                            />
                            <input
                                type="text"
                                name="imageUrl"
                                value={newGame.imageUrl}
                                onChange={handleInputChange}
                                placeholder="Image URL"
                                className="w-full p-3 border border-[#9694FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9694FF]"
                            />
                            <button
                                onClick={handleAddGame}
                                className="w-full py-3 text-white bg-[#9694FF] rounded-lg shadow-md hover:bg-[#662f34] transition-all duration-300"
                            >
                                Add Game
                            </button>
                        </div>
                    </section>

                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-bold text-[#662f34]">Added Games</h2>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {games.map((game, index) => (
                                <div key={index} className="h-32 bg-[#f3f3f3] rounded flex flex-col justify-between p-4">
                                    <img
                                        src={game.imageUrl}
                                        alt={game.name}
                                        className="w-full h-20 object-cover rounded"
                                    />
                                    <div className="mt-2">
                                        <h3 className="font-semibold text-[#662f34]">{game.name}</h3>
                                        <p className="text-gray-500 text-sm">{game.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AddGames;
