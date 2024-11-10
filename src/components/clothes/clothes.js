import React from 'react';
import { useNavigate } from 'react-router-dom';
import './electro.css'; // Import the same CSS file for styling

const Clothes = () => {
    const navigate = useNavigate();

    const products = [
        {
            id: 1,
            name: 'T-Shirt',
            image: `${process.env.PUBLIC_URL}/pull.png`, // Assurez-vous que l'image est dans le dossier public
            description: 'A comfortable cotton t-shirt available in various colors.',
            price: '150dt',
        },
        {
            id: 2,
            name: 'Jeans',
            image: `${process.env.PUBLIC_URL}/vest.png`, // Assurez-vous que l'image est dans le dossier public
            description: 'Stylish denim jeans that fit perfectly.',
            price: '350dt',
        },
        {
            id: 3,
            name: 'Jacket',
            image: `${process.env.PUBLIC_URL}/shirt.png`, // Assurez-vous que l'image est dans le dossier public
            description: 'A warm jacket for chilly weather.',
            price: '120dt',
        },
    ];

    const handleAddToCart = (product) => {
        console.log(`Added to cart: ${product.name}`);
        navigate('/panier');
    };

    return (
        <div className="product-container">
            <br></br>
            <br></br>
            <h2>Clothes</h2>
            <div className="product-cards">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="product-price">{product.price}</p>
                        <button className="btn" onClick={() => handleAddToCart(product)}>Add to Buy</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clothes;