import React, { useState, useEffect, useCallback } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import './compte.css';

const Compte = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCommandes = useCallback(async () => {
        if (!user) {
            return;
        }

        const db = getFirestore();
        const commandesRef = collection(db, 'commandes');
        const q = query(commandesRef, where('user', '==', user.email));

        try {
            const querySnapshot = await getDocs(q);
            const commandesList = querySnapshot.docs.map(doc => doc.data());
            setCommandes(commandesList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders: ", error);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchCommandes();
    }, [fetchCommandes]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="compte-container">
            <br />
            <br />
            
            <p>Welcome To Your Account</p>
            <br />
            <br />
            

            <div className="profile-section">
                <img
                    src={`${process.env.PUBLIC_URL}/compte.png`}
                    alt="User"
                    className="profile-image"
                />
                <div className="user-info">
                    <h2>User: {user ? user.email : 'No user logged in'}</h2>
                </div>
            </div>

            <div className="rating-section">
                <h3>Rate Our Site:</h3>
                <div className="stars">
                    {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                    style={{ display: 'none' }}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={ratingValue <= (hover || rating) ? 'gold' : 'gray'}
                                    className="star"
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                    style={{
                                        cursor: 'pointer',
                                        width: '30px',
                                        height: '30px',
                                        marginRight: '5px',
                                    }}
                                >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </label>
                        );
                    })}
                </div>
                {rating > 0 && <p>You rated: {rating} star{rating > 1 ? 's' : ''}</p>}
            </div>

            <div className="order-history-section">
                <h3>Your Order History</h3>
                {commandes.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    <div className="order-boxes">
                        {commandes.map((commande, index) => (
                            <div key={index} className="order-box">
                                <p><strong>Order {index + 1}</strong></p>
                                <p>
                                Date:{' '}
                                {commande.date
                                    ? new Date(commande.date).toLocaleDateString() // Conversion de la chaîne de caractères en date
                                    : 'No Date Available'}
                            </p>                                <div>
                                    {commande.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="order-item">
                                            <p>Item: {item.name} - Price: {item.price} - Quantity: {item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                                <p><strong>Total: {commande.totalPrice} DNT</strong></p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default Compte;
