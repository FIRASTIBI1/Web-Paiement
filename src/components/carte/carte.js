import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation } from 'react-router-dom'; // Importer useLocation pour récupérer les données
import './carte.css';

const Carte = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [userEmail, setUserEmail] = useState(null); // Email de l'utilisateur connecté
    const form = useRef();

    const auth = getAuth();
    const location = useLocation(); // Utilisez useLocation pour récupérer `totalAmount`
    const totalAmount = location.state?.totalAmount || 0; // Récupérer `totalAmount` passé par `panier.js`

    // Récupérer l'utilisateur connecté au chargement du composant
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
            .replace(/\D/g, '') // Supprime tout sauf les chiffres
            .replace(/(.{4})/g, '$1-') // Ajoute un '-' après chaque 4 chiffres
            .replace(/-$/, ''); // Supprime un '-' final s'il existe
    };

    const formatExpiryDate = (value) => {
        return value
            .replace(/\D/g, '') // Supprime tout sauf les chiffres
            .replace(/(.{2})/, '$1/') // Ajoute un '/' après 2 chiffres
            .replace(/\/$/, ''); // Supprime un '/' final s'il existe
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(formatCardNumber(e.target.value));
    };

    const handleExpiryDateChange = (e) => {
        setExpiryDate(formatExpiryDate(e.target.value));
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Supprime tout sauf les chiffres
        if (value.length <= 3) {
            setCvv(value); // Limite à 3 chiffres
        }
    };

    const handlePayment = (e) => {
        e.preventDefault();

        if (userEmail) {
            // Si l'utilisateur est connecté, envoyer l'email
            sendEmailConfirmation();
            alert('Paiement effectué avec succès');
        } else {
            alert('Veuillez vous connecter avant de procéder au paiement.');
        }
    };

    const sendEmailConfirmation = () => {
        if (!userEmail) {
            console.error('Aucun utilisateur connecté');
            return;
        }

        // Envoi de l'email avec les données du formulaire
        emailjs
            .sendForm('service_d6f4jfn', 'template_3gq2fwb', form.current, 'YzBe24gH1i-5PYF8m')
            .then(
                (response) => {
                    console.log('Email envoyé avec succès!', response);
                    alert('Un email de confirmation a été envoyé à votre adresse.');
                },
                (error) => {
                    console.error("Échec de l'envoi de l'email", error.text);
                    alert("Échec de l'envoi de l'email.");
                }
            );
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Informations de Carte</h2>
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
                        <label htmlFor="cardNumber">Numéro de carte</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="card_number"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            maxLength={19} // Limite à 16 chiffres + 3 tirets
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiryDate">Date d'expiration</label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiry_date"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/AA"
                            maxLength={5} // Limite à 4 chiffres + 1 '/'
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
                            maxLength={3} // Limite à 3 chiffres
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">Payer</button>
                </form>
            </div>
        </div>
    );
};

export default Carte;
