import React, { useState, useEffect } from 'react';
import './panier.css'; // Importer le fichier CSS pour le style

// Fonction fictive pour simuler la récupération des données depuis une API
const fetchCartItems = async () => {
  // Remplacez ceci par votre appel API
  return [
    { id: 1, name: "Produit 1", price: 10, quantity: 2 },
    { id: 2, name: "Produit 2", price: 15, quantity: 1 },
    { id: 3, name: "Produit 3", price: 20, quantity: 3 },
  ];
};

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      const items = await fetchCartItems();
      setCartItems(items);
    };

    getCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    
    <div className="panier-container">
       
      <header className="panier-header">Mon Panier</header>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Votre panier est vide.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <span className="item-name">{item.name} (x{item.quantity})</span>
              <span className="item-price">{item.price * item.quantity} €</span>
            </div>
          ))}
          <div className="total">
            <strong>Total :</strong>
            <span>{calculateTotal()} €</span>
          </div>
          <button className="checkout-button">Passer à la caisse</button>
        </div>
      )}
    </div>
  );
};

export default Panier;