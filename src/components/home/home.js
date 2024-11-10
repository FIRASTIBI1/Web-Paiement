// src/Home.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { UserContext } from '../../UserContext';

const images = [
    `${process.env.PUBLIC_URL}/cart1.jpg`,
    `${process.env.PUBLIC_URL}/cart2.jpg`,
    `${process.env.PUBLIC_URL}/cart3.jpg`,
];

const Home = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
            <section className="home">
                <div className="description">
                    <h1 className="title">
                        <span className="gradient-text">Welcome To</span> KAIBI marketplace
                    </h1>
                    <p className="paragraph">
                        Bienvenue chez KAIBI, votre marketplace de confiance qui réunit des produits variés pour simplifier votre quotidien.
                    </p>
                    {!user && (
                        <form id="form" autoComplete="off">
                            <button type="button" className="btn" aria-label="LogIn" onClick={handleLoginClick}>
                                <span>LogIn</span>
                                <ion-icon name="arrow-forward-outline"></ion-icon>
                            </button>
                            <button type="button" className="btn" aria-label="SignUp" onClick={handleSignupClick}>
                                <span>SignUp</span>
                                <ion-icon name="arrow-forward-outline"></ion-icon>
                            </button>
                        </form>
                    )}
                </div>
                <img src={`${process.env.PUBLIC_URL}/people.jpg`} alt="p" className="people" />
            </section>
            
            {/* Additional code for the slider */}
        </div>
    );
};

export default Home;
