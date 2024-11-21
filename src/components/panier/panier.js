import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { useCart } from '../../CartContext';
import './panier.css';

const Panier = () => {
    const { cartItems, clearCart } = useCart();
    const [items, setItems] = useState(cartItems); // Copier les items dans un état local
    const navigate = useNavigate(); // Initialiser useNavigate

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    };

    const handleIncrement = (index) => {
        const updatedItems = [...items];
        updatedItems[index].quantity = (updatedItems[index].quantity || 1) + 1;
        setItems(updatedItems);
    };

    const handleDecrement = (index) => {
        const updatedItems = [...items];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity -= 1;
            setItems(updatedItems);
        }
    };

    const handleClick = () => {
        const totalAmount = calculateTotal(); // Calculez le montant total
        clearCart(); // Vider le panier (si nécessaire)
        navigate('/carte', { state: { totalAmount } }); // Naviguer avec le montant total
    };

    return (
        <div className="panier-container">
            <header className="panier-header">Mon Panier</header>
            {items.length === 0 ? (
                <p className="empty-cart-message">Votre panier est vide.</p>
            ) : (
                <div className="cart-items">
                    {items.map((item, index) => (
                        <div key={index} className="cart-item">
                            <span className="item-name">{item.name}</span>
                            <div className="quantity-controls">
                                <button onClick={() => handleDecrement(index)}>-</button>
                                <span>{item.quantity || 1}</span>
                                <button onClick={() => handleIncrement(index)}>+</button>
                            </div>
                            <span className="item-price">{item.price * (item.quantity || 1)} DTN</span>
                        </div>
                    ))}
                    <div className="total">
                        <strong>Total :</strong>
                        <span>{calculateTotal()} DTN</span>
                    </div>
                    <button className="checkout-button" onClick={handleClick}>Passer à la caisse</button>
                </div>
            )}
        </div>
    );
};

export default Panier;
