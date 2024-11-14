import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './panier.css'; // Import your CSS for styling

// Firebase setup
const db = getFirestore();

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart items for the authenticated user from Firebase
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const cartRef = collection(db, 'carts');
          const q = query(cartRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);

          const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setCartItems(items);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="panier-container">
      <header className="panier-header">Mon Panier</header>
      {isLoading ? (
        <p className="loading-message">Chargement...</p>
      ) : cartItems.length === 0 ? (
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
