import React from 'react';
import { useNavigate } from 'react-router-dom';
import './electro.css'; // Import the same CSS file for styling

const Accessoires = () => {
    const navigate = useNavigate();

    const products = [
        {
            id: 1,
            name: 'Wrist Watch',
            image: `${process.env.PUBLIC_URL}/mongela.png`, // Assurez-vous que l'image est dans le dossier public
            description: 'A stylish wristwatch that complements any outfit.',
            price: '700dt',
        },
        {
            id: 2,
            name: 'Sunglasses',
            image: `${process.env.PUBLIC_URL}/femme.png`, // Assurez-vous que l'image est dans le dossier public
            description: 'Trendy sunglasses to protect your eyes from the sun.',
            price: '200dt',
        },
        {
            id: 3,
            name: 'Backpack',
            image: `${process.env.PUBLIC_URL}/stouch.png`, // Assurez-vous que l'image est dans le dossier public
            description: 'A spacious backpack for all your essentials.',
            price: '50dt',
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
            <h2>Accessories</h2>
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

export default Accessoires;