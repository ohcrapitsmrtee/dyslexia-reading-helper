import React, { useState } from 'react';
import './HelpPanel.css';

const HelpPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('features');
    
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="help-panel-container">
            <button 
                className="help-toggle-button" 
                onClick={togglePanel}
                title="Learn about the features and how to use this tool"
            >
                ❓ Help
            </button>
            
            {isOpen && (
                <div className="help-panel">
                    <div className="help-header">
                        <h3>Reading Helper Guide</h3>
                        <button className="close-button" onClick={togglePanel}>×</button>
                    </div>
                    
                    <div className="help-tabs">
                        <button 
                            className={`tab-button ${activeTab === 'features' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('features')}
                        >
                            Features
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'fonts' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('fonts')}
                        >
                            Fonts
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'tips' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('tips')}
                        >
                            Reading Tips
                        </button>
                    </div>
                    
                    <div className="help-content">
                        {activeTab === 'features' && (
                            <div className="tab-content">
                                <h4>Accessibility Features</h4>
                                <ul className="feature-list">
                                    <li>
                                        <strong>Text Size Adjustment</strong>
                                        <p>Use the A+ and A- buttons to increase or decrease text size, or enter a custom size.</p>
                                    </li>
                                    <li>
                                        <strong>Focus Mode</strong>
                                        <p>Displays text in manageable chunks for easier reading. Use arrow keys or buttons to navigate between chunks.</p>
                                    </li>
                                    <li>
                                        <strong>Words Per Chunk</strong>
                                        <p>Customize how many words appear in each chunk when focus mode is enabled.</p>
                                    </li>
                                    <li>
                                        <strong>Inverse Colors</strong>
                                        <p>Switches to white text on black background which can reduce eye strain for some readers.</p>
                                    </li>
                                    <li>
                                        <strong>Dyslexia-Friendly Fonts</strong>
                                        <p>Choose from specially designed fonts that can make reading easier for people with dyslexia.</p>
                                    </li>
                                    <li>
                                        <strong>Preference Saving</strong>
                                        <p>Your settings are automatically saved and will be loaded when you return.</p>
                                    </li>
                                </ul>
                            </div>
                        )}
                        
                        {activeTab === 'fonts' && (
                            <div className="tab-content">
                                <h4>Dyslexia-Friendly Fonts</h4>
                                <div className="font-samples">
                                    <div className="font-sample default-font">
                                        <h5>Default</h5>
                                        <p>Standard system font with normal character spacing.</p>
                                        <div className="sample-text">The quick brown fox jumps over the lazy dog.</div>
                                    </div>
                                    <div className="font-sample lexend-font">
                                        <h5>Lexend</h5>
                                        <p>Designed to reduce cognitive load and improve reading speed.</p>
                                        <div className="sample-text">The quick brown fox jumps over the lazy dog.</div>
                                    </div>
                                    <div className="font-sample opendyslexic-font">
                                        <h5>OpenDyslexic</h5>
                                        <p>Has unique letter shapes with heavier bottom parts to help prevent letter flipping and rotation.</p>
                                        <div className="sample-text">The quick brown fox jumps over the lazy dog.</div>
                                    </div>
                                    <div className="font-sample roboto-font">
                                        <h5>Roboto</h5>
                                        <p>Clean, modern font with good readability characteristics.</p>
                                        <div className="sample-text">The quick brown fox jumps over the lazy dog.</div>
                                    </div>
                                    <div className="font-sample opensans-font">
                                        <h5>Open Sans</h5>
                                        <p>Optimized for print, web, and mobile interfaces with neutral appearance.</p>
                                        <div className="sample-text">The quick brown fox jumps over the lazy dog.</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'tips' && (
                            <div className="tab-content">
                                <h4>Reading Tips</h4>
                                <ul className="tips-list">
                                    <li>
                                        <strong>Find the right font</strong>
                                        <p>Try different fonts to see which works best for you. OpenDyslexic and Lexend are specifically designed for readability.</p>
                                    </li>
                                    <li>
                                        <strong>Use Focus Mode</strong>
                                        <p>Breaking text into chunks can make reading more manageable and help maintain your place in the text.</p>
                                    </li>
                                    <li>
                                        <strong>Adjust font size</strong>
                                        <p>Larger text can make letters more distinguishable, especially for short reading sessions.</p>
                                    </li>
                                    <li>
                                        <strong>Try inverse colors</strong>
                                        <p>White text on a dark background can reduce visual stress for some readers.</p>
                                    </li>
                                    <li>
                                        <strong>Take breaks</strong>
                                        <p>Reading in shorter sessions can help maintain concentration and reduce fatigue.</p>
                                    </li>
                                    <li>
                                        <strong>Use keyboard navigation</strong>
                                        <p>In Focus Mode, use left and right arrow keys to navigate between text chunks.</p>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpPanel;
