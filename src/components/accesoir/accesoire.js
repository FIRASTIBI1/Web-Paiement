import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Importer l'instance Firestore
import { doc, getDoc } from 'firebase/firestore'; // Méthodes Firestore
import './electro.css'; // Importer le même fichier CSS pour le style

const Accessoires = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    // Récupérer les produits d'accessoires depuis Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Référence au document 'accessories' dans la collection 'products'
                const docRef = doc(db, 'products', 'accessories');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const fetchedProducts = docSnap.data().items; // Récupérer le tableau d'articles
                    setProducts(fetchedProducts);
                } else {
                    console.log("Aucun document trouvé!");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des produits : ", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        console.log(`Ajouté au panier : ${product.name}`);
        navigate('/panier');
    };

    return (
        <div className="product-container">
            <br />
            <br />
            <h2>Accessories</h2>
            <div className="product-cards">
                {products.map((product) => (
                    <div className="product-card" key={product.name}>
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
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

export default Accessoires;
