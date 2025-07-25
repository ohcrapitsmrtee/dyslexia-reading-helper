import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Dyslexia Reading Helper. All rights reserved.</p>
            <div className="footer-links">
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
                <a href="#privacy">Privacy Policy</a>
            </div>
        </footer>
    );
};

export default Footer;