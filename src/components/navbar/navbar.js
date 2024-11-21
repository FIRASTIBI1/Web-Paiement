import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getAuth, signOut } from 'firebase/auth';
import './navbar.css';

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const auth = getAuth();

    // Exemple de données d'articles pour la recherche
    const items = ['Electronics', 'Accessories', 'Clothes'];

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search Term:', searchTerm);

        // Logique pour rediriger selon la catégorie
        if (searchTerm.toLowerCase() === 'clothes') {
            navigate('/clothes');
        } else if (searchTerm.toLowerCase() === 'electronics') {
            navigate('/electro');
        } else if (searchTerm.toLowerCase() === 'accessories') {
            navigate('/accesoire');
        } else {
            // Si le terme ne correspond à aucune catégorie, naviguer vers une page de recherche générale
            navigate(`/search?query=${searchTerm}`);
        }
    };

    // Fonction de gestion de la recherche pour afficher des suggestions
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filtrer les éléments en fonction de la valeur entrée
        if (value) {
            const filteredSuggestions = items.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]); // Si le champ est vide, ne pas afficher de suggestions
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setSuggestions([]);  // Fermer les suggestions après avoir sélectionné une option
        console.log('Selected suggestion:', suggestion);
        // Vous pouvez également naviguer vers une page de résultats de recherche
        if (suggestion.toLowerCase() === 'clothes') {
            navigate('/clothes');
        } else if (suggestion.toLowerCase() === 'electronics') {
            navigate('/electro');
        } else if (suggestion.toLowerCase() === 'accessories') {
            navigate('/accesoire');
        }
        setDropdownOpen(false); // Ferme le menu déroulant après avoir sélectionné une catégorie
    };

    const handleCategoryClick = (category) => {
        // Navigate to the corresponding category page
        if (category === 'Electronics') {
            navigate('/electro');
        } else if (category === 'Accessories') {
            navigate('/accesoire');
        } else if (category === 'Clothes') {
            navigate('/clothes');
        }

        setDropdownOpen(false); // Ferme le menu après avoir cliqué sur une catégorie
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out');
            navigate('/home');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    const handleHomeClick = () => {
        navigate('/home');  // Ajout de la fonction de redirection
    };
    

    const handleAccountClick = () => {
        navigate('/compte');
    };

    const handleDashboardClick = () => {
        navigate('/dashboard');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a onClick={handleHomeClick} className="navbar-logo">
                    <img src={`${process.env.PUBLIC_URL}/logoo.png`} alt="Logo" className="logo-image" />
                </a>
               
               
              
                
                <form onSubmit={handleSearch} className="search-form">
                    <div>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                    <div>
                        <button type="submit" className="search-button">Search</button>
                    </div>
                    {suggestions.length > 0 && (
                        <div className="suggestions-dropdown">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                </form>
                
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <a className="navbar-panier" onClick={() => navigate('/panier')}>
                            <img src={`${process.env.PUBLIC_URL}/panier.png`} alt="panier" className="p-image" />
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link" onClick={() => navigate('/home')}>Home</a>
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link" onClick={() => navigate('/seller')}>Being a Seller</a>
                    </li>
                    <li className="navbar-item dropdown">
                        <a className="navbar-link" onClick={toggleDropdown}>Categories</a>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li className="dropdown-item">
                                    <a className="dropdown-link" onClick={() => handleCategoryClick('Electronics')}>Electronics</a>
                                </li>
                                <li className="dropdown-item">
                                    <a className="dropdown-link" onClick={() => handleCategoryClick('Accessories')}>Accessories</a>
                                </li>
                                <li className="dropdown-item">
                                    <a className="dropdown-link" onClick={() => handleCategoryClick('Clothes')}>Clothes</a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link" onClick={handleDashboardClick}>Dashboard</a>
                    </li>
                    <li className="navbar-item profile">
                        <div className="navbar-profile-icon" onClick={toggleProfileDropdown}>
                            <AccountCircleIcon fontSize="large" />
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
