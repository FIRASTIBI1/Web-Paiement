import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Import the Firestore instance
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods
import './electro.css'; // Import the CSS file for styling

const Electro = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    // Fetch products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch the 'electronics' document from 'products' collection
                const docRef = doc(db, 'products', 'electronics');
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const fetchedProducts = docSnap.data().items; // Get the items array
                    setProducts(fetchedProducts);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        // Logic to add the product to the cart (e.g., update global state or call an API)
        console.log(`Added to cart: ${product.name}`);
        // Navigate to the cart page
        navigate('/panier');
    };

    return (
        <div className="product-container">
            <br />
            <br />
            <h2>Electronics</h2>
            <div className="product-cards">
                {products.map((product) => (
                    <div className="product-card" key={product.name}>
                        {/* Adjusted the image URL reference */}
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
