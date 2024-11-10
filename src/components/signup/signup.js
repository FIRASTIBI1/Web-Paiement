import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './signup.css';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }
    
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Send verification email
            await sendEmailVerification(user);
            console.log('Verification email sent.');
    
            // Add user to Firestore database
            // The collection 'users' and document will be automatically created
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: new Date(),
            });
            console.log('User added to Firestore.');
    
            // Redirect to login page after successful signup and email verification
            navigate('/login');
    
            setError(''); // Clear error if successful
        } catch (error) {
            setError(error.message); // Show error if there was an issue
        }
    };
    

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
