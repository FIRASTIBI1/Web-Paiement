import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const images = [
    `${process.env.PUBLIC_URL}/cart1.jpg`,
    `${process.env.PUBLIC_URL}/cart2.jpg`,
    `${process.env.PUBLIC_URL}/cart3.jpg`,
];

const Home = () => {
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
                </div>
                <img src={`${process.env.PUBLIC_URL}/people.jpg`} alt="p" className='people' />
            </section>

            <section className="card-container" id="card-container">
            <div className="text-description">
    <h2 className="offers-title">Discounts</h2>
    <p className="offers-description">
        Découvrez nos offres exceptionnelles sur une large gamme de produits. 
        Que vous cherchiez des vêtements, des accessoires ou des articles pour la maison, 
        KAIBI a tout ce qu'il vous faut à des prix imbattables. 
        Profitez de la qualité et de la diversité de nos produits, 
        et faites vos achats en toute confiance.
    </p>
</div>
                <div className="slider">
                    <img src={images[currentIndex]} alt="current" className='large-cart' />
                </div>
                <div className="small-cards">
                    {images.map((image, index) => (
                        index !== currentIndex && (
                            <img key={index} src={image} alt={`small-${index}`} className='small-cart' />
                        )
                    ))}
                </div>
                <ul className="control" id="custom-control">
                    <li onClick={handlePrev}>
                        <ion-icon name="caret-back-outline"></ion-icon>
                    </li>
                    <li onClick={handleNext}>
                        <ion-icon name="caret-forward-outline"></ion-icon>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Home;