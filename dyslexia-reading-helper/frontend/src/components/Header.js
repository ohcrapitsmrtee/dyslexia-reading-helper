import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <h1>Dyslexia Reading Helper</h1>
            <nav>
                <ul>
                    <li><a href="#text-input">Input</a></li>
                    <li><a href="#text-display">Display</a></li>
                    <li><a href="#control-panel">Controls</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;