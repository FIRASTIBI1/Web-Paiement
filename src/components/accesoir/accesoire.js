import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Import the Firestore instance
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods
import { useCart } from '../../CartContext'; // Import the cart context
import './accessories.css'; // You may have a separate CSS file for accessories

const Accessories = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Access the addToCart function
    const [products, setProducts] = useState([]);

    // Fetch products from Firestore (accessories)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const docRef = doc(db, 'products', 'accessories'); // Change collection to 'accessories'
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const fetchedProducts = docSnap.data().items;
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
        addToCart(product); // Add the product to the cart
        navigate('/panier'); // Navigate to the cart page
    };

    return (
        <div className="product-container">
            <h2>Accessoires</h2>
            <div className="product-cards">
                {products.map((product) => (
                    <div className="product-card" key={product.name}>
                        <img src={`/${product.imageUrl}`} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="product-price">{product.price}dt</p>
                        <button className="btn" onClick={() => handleAddToCart(product)}>Ajouter au panier</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accessories;
