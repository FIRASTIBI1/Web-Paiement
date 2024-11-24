import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useCart } from '../../CartContext';
import './panier.css';

const Panier = () => {
    const { cartItems, clearCart } = useCart();
    const [items, setItems] = useState(cartItems); // Copy items to a local state
    const navigate = useNavigate(); // Initialize useNavigate

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
        const totalAmount = calculateTotal(); // Calculate the total amount
        clearCart(); // Clear the cart (if necessary)
        navigate('/carte', { state: { cartItems: items, totalAmount } }); // Navigate with the total amount
    };

    return (
        <div className="panier-container">
            <header className="panier-header">My Cart</header>
            {items.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
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
                        <strong>Total:</strong>
                        <span>{calculateTotal()} DTN</span>
                    </div>
                    <button className="checkout-button" onClick={handleClick}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Panier;
