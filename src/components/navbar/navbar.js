// src/components/navbar/navbar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getAuth, signOut } from 'firebase/auth';
import './navbar.css';

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSellerClick = () => {
        navigate('/seller');
    };
    const handleElectronicsClick = () => {
        navigate('/electro');
    };
    const handleHomeClick = () => {
        navigate('/home');
    };
    const handleAccesoirClick = () => {
        navigate('/accesoire');
    };
    const handleClothesClick = () => {
        navigate('/clothes');
    };
    const handleCartClick = () => {
        navigate('/panier');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search Term:', searchTerm);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);  // Logs out the user from Firebase
            console.log('User logged out');
            navigate('/home');  // Redirect to home after logging out
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="../home/home" className="navbar-logo">
                    <img src={`${process.env.PUBLIC_URL}/logoo.png`} alt="Logo" className="logo-image" />
                </a>
                
                <form onSubmit={handleSearch} className="search-form">
                    <div>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div>
                        <button type="submit" className="search-button">Search</button>
                    </div>
                </form>
                
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <a className="navbar-panier" onClick={handleCartClick}>
                            <img src={`${process.env.PUBLIC_URL}/panier.png`} alt="panier" className="p-image" />
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link" onClick={handleHomeClick}>Home</a>
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link" onClick={handleSellerClick}>Being a Seller</a>
                    </li>
                    <li className="navbar-item dropdown">
                        <a className="navbar-link" onClick={toggleDropdown}>Categories</a>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li className="dropdown-item">
                                    <a className="dropdown-link" onClick={handleElectronicsClick}>Electronics</a>
                                </li>
                                <li className="dropdown-item">
                                    <a className="dropdown-link" onClick={handleAccesoirClick}>Accessories</a>
                                </li>
                                <li className="dropdown-item">
                                    <a className="dropdown-link" onClick={handleClothesClick}>Clothes</a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="navbar-item profile">
                        <div className="navbar-profile-icon" onClick={toggleProfileDropdown}>
                            <AccountCircleIcon fontSize="large" /> {/* MUI Icon */}
                        </div>
                        {isProfileDropdownOpen && (
                            <ul className="profile-dropdown-menu">
                                <li className="profile-dropdown-item" onClick={handleAccountClick}>
                                    My Account
                                </li>
                                <li className="profile-dropdown-item" onClick={handleLogout}>
                                    Logout
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
