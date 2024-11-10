import React from 'react';
import './footer.css'; // Assurez-vous d'importer le fichier CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                
                <ul className="footer-menu">
                    <li className="footer-item"><a href="#privacy" className="footer-link">Politique de confidentialité</a></li>
                    <li className="footer-item"><a href="#terms" className="footer-link">Conditions d'utilisation</a></li>
                    <li className="footer-item"><a href="#contact" className="footer-link">Contact</a></li>
                </ul>
            </div>
            <p className="footer-text">© 2023 KAIBI Marketplace. Tous droits réservés.</p>
        </footer>
    );
};

export default Footer;