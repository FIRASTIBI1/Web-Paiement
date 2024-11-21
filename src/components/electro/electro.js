import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '../../CartContext';
import './electro.css';

const Electro = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const docRef = doc(db, 'products', 'electronics');
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const fetchedProducts = docSnap.data().items;
                    setProducts(fetchedProducts);
                } else {
                    console.log("No products found!");
                }
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product); // Add product to cart
        navigate('/panier'); // Navigate to cart page
    };

    return (
        <div className="product-container">
            <h2>Electronics</h2>
            <div className="product-cards">
                {products.map((product) => (
                    <div className="product-card" key={product.name}>
                        <img src={`/${product.imageUrl}`} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="product-price">{product.price}dt</p>
                        <button className="btn" onClick={() => handleAddToCart(product)}>Add to Buy</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Electro;
