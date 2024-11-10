import React from 'react';
import { useNavigate } from 'react-router-dom';
import './electro.css'; // Import the CSS file for styling

const Electro = () => {
    const navigate = useNavigate();

    const products = [
        {
            id: 1,
            name: 'Gaming PC',
            image: `${process.env.PUBLIC_URL}/tuf.jpg`,
            description: 'A high-performance gaming PC with the latest graphics card and processor.',
            price: '2000dt',
        },
        {
            id: 2,
            name: 'Kite',
            image: `${process.env.PUBLIC_URL}/kite.png`,
            description: 'A colorful kite perfect for outdoor fun and activities.',
            price: '130dt',
        },
        {
            id: 3,
            name: 'Bluetooth Headset',
            image: `${process.env.PUBLIC_URL}/casque.png`,
            description: 'Wireless Bluetooth headset with noise cancellation and long battery life.',
            price: '250dt',
        },
    ];

    const handleAddToCart = (product) => {
        // Logique pour ajouter le produit au panier (par exemple, mise à jour de l'état global ou appel API)
        console.log(`Added to cart: ${product.name}`);
        // Naviguer vers la page du panier
        navigate('/panier');
    };

    return (
        <div className="product-container">
            <br></br>
            <br></br>
            <h2>Electronics</h2>
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

export default Electro;