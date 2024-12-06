import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, collection, addDoc } from '../../firebase';  // Correct import path
import { useLocation } from 'react-router-dom'; // Import useLocation to get data
import './carte.css';

const Carte = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [userEmail, setUserEmail] = useState(null); // Email of the logged-in user
    const form = useRef();

    const auth = getAuth();
    const location = useLocation(); // Use useLocation to get totalAmount
    const cartItems = location.state?.cartItems || [];  // Get cart items passed from panier.js
    const totalAmount = location.state?.totalAmount || 0; // Get totalAmount passed from panier.js

    // Get the logged-in user on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });
        return () => unsubscribe();
    }, [auth]);

    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, '') // Remove all non-digit characters
            .replace(/(.{4})/g, '$1-') // Add a hyphen after every 4 digits
            .replace(/-$/, ''); // Remove trailing hyphen if any
    };

    const formatExpiryDate = (value) => {
        return value
            .replace(/\D/g, '') // Remove all non-digit characters
            .replace(/(.{2})/, '$1/') // Add a '/' after 2 digits
            .replace(/\/$/, ''); // Remove trailing '/' if any
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(formatCardNumber(e.target.value));
    };

    const handleExpiryDateChange = (e) => {
        setExpiryDate(formatExpiryDate(e.target.value));
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
        if (value.length <= 3) {
            setCvv(value); // Limit to 3 digits
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
    
        if (!userEmail) {
            alert('Veuillez vous connecter avant de procéder au paiement.');
            return;
        }
    
        if (!cartItems || cartItems.length === 0) {
            alert('Le panier est vide.');
            return;
        }
    
        if (!totalAmount || totalAmount <= 0) {
            alert('Le montant total est invalide.');
            return;
        }
    
        // Log des données pour déboguer
        console.log("User Email:", userEmail);
        console.log("Cart Items:", cartItems);
        console.log("Total Amount:", totalAmount);
    
        try {
            const commandesCollection = collection(db, 'commandes');
    
            // Ajouter un document à Firestore
            const docRef = await addDoc(commandesCollection, {
                user: userEmail,
                date: new Date().toISOString(),
                items: cartItems.map((item) => ({
                    name: item.name || 'Nom inconnu', // Gérer les noms manquants
                    price: item.price || 0,           // Gérer les prix manquants
                    quantity: item.quantity || 1,    // Gérer les quantités manquantes
                })),
                totalPrice: totalAmount,
            });
    
            console.log('Document ajouté avec ID: ', docRef.id);
    
            // Envoyer l'email de confirmation
            sendEmailConfirmation();
    
            alert('Paiement effectué avec succès.');
    
            // Réinitialiser les champs
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du document : ', error);
            alert('Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.');
        }
    };
    

    const sendEmailConfirmation = () => {
        if (!userEmail) {
            console.error('No user logged in');
            return;
        }

        // Send the email with the form data
        emailjs
            .sendForm('service_d6f4jfn', 'template_3gq2fwb', form.current, 'YzBe24gH1i-5PYF8m')
            .then(
                (response) => {
                    console.log('Email sent successfully!', response);
                    alert('A confirmation email has been sent to your address.');
                },
                (error) => {
                    console.error('Failed to send the email', error.text);
                    alert('Failed to send the email.');
                }
            );
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Card Information</h2>
                <form ref={form} onSubmit={handlePayment}>
                    <input
                        type="hidden"
                        name="to_email"
                        value={userEmail || ''}
                    />
                    <input
                        type="hidden"
                        name="total_amount"
                        value={totalAmount.toString()}
                    />
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="card_number"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            maxLength={19} // Limit to 16 digits + 3 hyphens
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiry_date"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            maxLength={5} // Limit to 4 digits + 1 '/'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder="XXX"
                            maxLength={3} // Limit to 3 digits
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">Pay</button>
                </form>
            </div>
        </div>
    );
};

export default Carte;