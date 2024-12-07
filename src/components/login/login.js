// src/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const adminCredentials = {
        email: 'kaibi@gmail.com',
        password: 'kaibi123',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Attempt to log the user in
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');

            // Check if the logged-in user is the admin
            if (email === adminCredentials.email && password === adminCredentials.password) {
                navigate('/admin'); // Redirect to the admin page
            } else {
                navigate('/home'); // Redirect to home page for other users
            }
        } catch (err) {
            setError('Invalid email or password. Please try again.');
            console.error('Login error:', err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
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
                <button type="submit" className="auth-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
