import React, { useState } from 'react';
import './SettingsPanel.css';

const SettingsPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [preferencesCleared, setPreferencesCleared] = useState(false);
    
    const togglePanel = () => {
        setIsOpen(!isOpen);
        
        // When opening the panel, reset the "cleared" message
        if (!isOpen) {
            setPreferencesCleared(false);
        }
    };
    
    const clearPreferences = () => {
        localStorage.removeItem('dyslexiaHelperPreferences');
        setPreferencesCleared(true);
        
        // Show alert that preferences will be applied after refresh
        setTimeout(() => {
            alert('Preferences cleared. Refresh the page to reset to default settings.');
        }, 300);
    };
    
    // Get current preferences from local storage
    const getCurrentPreferences = () => {
        const savedPrefs = localStorage.getItem('dyslexiaHelperPreferences');
        if (savedPrefs) {
            try {
                return JSON.parse(savedPrefs);
            } catch (e) {
                console.error('Failed to parse saved preferences:', e);
                return null;
            }
        }
        return null;
    };
    
    const prefs = getCurrentPreferences();

    return (
        <div className="settings-panel-container">
            <button 
                className="settings-toggle-button" 
                onClick={togglePanel}
                title="View and manage your saved preferences"
            >
                ⚙️ Settings
            </button>
            
            {isOpen && (
                <div className="settings-panel">
                    <div className="settings-header">
                        <h3>Your Saved Preferences</h3>
                        <button className="close-button" onClick={togglePanel}>×</button>
                    </div>
                    
                    <div className="settings-content">
                        {prefs ? (
                            <div className="preferences-list">
                                <div className="preference-item">
                                    <span className="preference-label">Font Size:</span>
                                    <span className="preference-value">{prefs.fontSize}px</span>
                                </div>
                                <div className="preference-item">
                                    <span className="preference-label">Font Family:</span>
                                    <span className="preference-value">{prefs.fontFamily || 'Default'}</span>
                                </div>
                                <div className="preference-item">
                                    <span className="preference-label">Focus Mode:</span>
                                    <span className="preference-value">{prefs.focusMode ? 'Enabled' : 'Disabled'}</span>
                                </div>
                                {prefs.focusMode && (
                                    <div className="preference-item">
                                        <span className="preference-label">Words Per Chunk:</span>
                                        <span className="preference-value">{prefs.wordsPerChunk}</span>
                                    </div>
                                )}
                                <div className="preference-item">
                                    <span className="preference-label">Inverse Colors:</span>
                                    <span className="preference-value">{prefs.inverseMode ? 'Enabled' : 'Disabled'}</span>
                                </div>
                            </div>
                        ) : (
                            <p className="no-preferences">No saved preferences found.</p>
                        )}
                        
                        {preferencesCleared ? (
                            <div className="preferences-cleared">
                                <p>✓ Preferences cleared successfully</p>
                                <p className="refresh-note">Refresh the page to apply default settings</p>
                            </div>
                        ) : (
                            <button 
                                className="clear-preferences-button" 
                                onClick={clearPreferences}
                                disabled={!prefs}
                            >
                                Clear All Preferences
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPanel;
