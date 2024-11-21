import React from 'react';
import './footer.css'; // Assurez-vous d'importer le fichier CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                
                <ul className="footer-menu">
                    <li className="footer-item"><a href="#privacy" className="footer-link">Privacy Policy</a></li>
                    <li className="footer-item"><a href="#terms" className="footer-link">Terms of Use</a></li>
                    <li className="footer-item"><a href="#contact" className="footer-link">Contact Us</a></li>
                </ul>
            </div>
            <p className="footer-text">© 2024 KAIBI Marketplace.All rights reserved.</p>
        </footer>
    );
};

export default Footer;