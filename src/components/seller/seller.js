import React, { useState } from 'react';
import { db } from '../../firebase'; // Firestore instance
import { collection, doc, updateDoc, arrayUnion, setDoc, getDoc } from 'firebase/firestore'; // Firestore methods
import { getAuth } from 'firebase/auth'; // Firebase Authentication
import './seller.css'; // Import the CSS file for styling

const Seller = () => {
    const [sellerName, setSellerName] = useState('');
    const [location, setLocation] = useState('');
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Authentification utilisateur
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userEmail = user.email;

            // Créer un produit
            const product = {
                sellerName,
                location,
                description,
                imageUrl,
                name: productName,
                price: parseInt(price),
                createdBy: userEmail,
                timestamp: new Date()
            };

            // Référence au document de la catégorie
            const categoryRef = doc(db, 'products', category);
            
            try {
                // Vérifier si la catégorie existe
                const categoryDoc = await getDoc(categoryRef);
                
                if (categoryDoc.exists()) {
                    // Si la catégorie existe, ajouter le produit dans l'array "items"
                    await updateDoc(categoryRef, {
                        items: arrayUnion(product),
                    });
                } else {
                    // Si la catégorie n'existe pas, créer le document avec le produit
                    await setDoc(categoryRef, { items: [product] });
                }

                // Réinitialiser le formulaire
                setSellerName('');
                setLocation('');
                setProductName('');
                setCategory('');
                setPrice('');
                setDescription('');
                setImageUrl('');

                console.log('Product added successfully to the Firestore.');
            } catch (error) {
                console.error("Error adding product to Firestore:", error);
            }
        } else {
            console.log('No user is logged in.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Add Product</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sellerName">Seller Name</label>
                    <input
                        type="text"
                        id="sellerName"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothes">Clothes</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Product Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Add Product</button>
            </form>
        </div>
    );
};

export default Seller;
