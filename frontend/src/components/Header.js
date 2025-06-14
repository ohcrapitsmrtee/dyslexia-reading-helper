import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <div className="app-logo">
                <h1>Dyslexia Reading Helper</h1>
                <span>v2.0</span>
            </div>
            <nav>
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#help">Help</a></li>
                    <li><a href="#settings">Settings</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;