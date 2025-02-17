import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import 'swiper/css'; // Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';

const WelcomePage = () => {
    const [fadeIn, setFadeIn] = useState(false);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
        <div className="relative w-full h-screen bg-black">
            <Swiper
                spaceBetween={0} // No space between slides
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
            >
                {/* First Slide */}
                <SwiperSlide>
                    <div
                        className="relative w-full h-screen flex"
                        style={{
                            background: "linear-gradient(to right, black 55%, #8B0000 100%)",
                        }}
                    >
                        <div className="w-[70%] h-full flex justify-center items-start">
                            <img
                                src="src/assets/images/fortnitebg.png"
                                alt="Gaming Background"
                                className={`w-auto h-[95vh] max-w-full object-cover transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{
                                    marginTop: '15vh',
                                    objectPosition: '130% 50%',
                                }}
                            />
                        </div>
                        <div className="w-[30%] ml-16 flex flex-col justify-center items-start text-white px-8 mt-16">
                            <h1 className="text-4xl font-bold mb-4">Welcome to GuidEngine!</h1>
                            <p className="text-lg">
                                Your ultimate platform for creating, managing, and joining exciting gaming tournaments.
                                Unleash the gamer in you and connect with players worldwide.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Second Slide */}
                <SwiperSlide>
                    <div className="relative w-full h-screen flex">
                        {/* Video Section on the left side */}
                        <div className="w-1/2 h-full relative">
                            <video
                                src="src/assets/videos/1677584709-1677584709-valorant-jett-reyna-neon.mp4"
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover"
                                style={{
                                    objectPosition: 'center bottom', // Align video to the bottom
                                }}
                            />
                            {/* Black Gradient Overlay on the right side of the video */}
                            <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-black to-transparent"></div>
                        </div>

                        {/* Content Section on the right side */}
                        <div className="absolute right-0 top-1/4 w-[40%] h-auto flex flex-col justify-start items-start text-white px-8 py-6 bg-black rounded-l-lg">
                            <h2 className="text-3xl font-semibold mb-4">Create, Manage & Compete</h2>
                            <p className="text-lg mb-4">
                                Dive into the world of competitive gaming with our easy-to-use platform. Organize your own tournaments,
                                join others, and compete with players worldwide.
                            </p>
                        </div>

                        {/* Black background on the right side */}
                        <div className="w-1/2 h-full bg-black"></div>
                    </div>
                </SwiperSlide>

                {/* Third Slide */}
                <SwiperSlide>
                    <div className="relative w-full h-screen flex">
                        {/* Video Section on the left side */}
                        <div className="w-1/2 h-full relative">
                            <video
                                src="src/assets/videos/cypher-x-omen-x-sova-valorant-moewalls-com.mp4"
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover"
                                style={{
                                    objectPosition: 'center bottom', // Align video to the bottom
                                }}
                            />
                            {/* Black Gradient Overlay on the right side of the video */}
                            <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-black to-transparent"></div>
                        </div>

                        {/* Content Section on the right side */}
                        <div className="absolute right-0 top-1/4 w-[40%] h-auto flex flex-col justify-start items-start text-white px-8 py-6 bg-black rounded-l-lg">
                            <h2 className="text-3xl font-semibold mb-4">Join the Action</h2>
                            <p className="text-lg mb-4">
                                Step into a world of intense competition and exciting challenges. Our platform brings gamers together.
                            </p>
                            <button
                                className="px-6 py-2 bg-red-600 hover:bg-red-800 text-white font-semibold rounded-lg shadow-lg transition-all ease-in-out"
                                onClick={() => navigate('/login')} // Navigate to DashboardPage
                            >
                                Get Started
                            </button>
                        </div>

                        {/* Black background on the right side */}
                        <div className="w-1/2 h-full bg-black"></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default WelcomePage;
