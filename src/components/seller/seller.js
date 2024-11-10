import React, { useState } from 'react';
import './seller.css'; // Import the CSS file for styling

const Seller = () => {
    const [sellerName, setSellerName] = useState('');
    const [location, setLocation] = useState('');
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique pour ajouter le produit (par exemple, appel API)
        console.log({
            sellerName,
            location,
            productName,
            category,
            price,
            image,
        });
        // Réinitialiser le formulaire après soumission
        setSellerName('');
        setLocation('');
        setProductName('');
        setCategory('');
        setPrice('');
        setImage(null);
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
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
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
                    <label htmlFor="image">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit" className="btn">Add Product</button>
            </form>
        </div>
    );
};

export default Seller;