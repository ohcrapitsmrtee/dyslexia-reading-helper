import React, { useState, useEffect } from 'react';
import './ControlPanel.css';

const ControlPanel = ({ 
    onTextSizeChange, 
    onNavigate, 
    onFocusModeToggle, 
    onWordsPerChunkChange, 
    onInverseModeToggle,
    onFontFamilyChange,
    fontFamily = 'default'
}) => {
    const [textSize, setTextSize] = useState(16);
    const [customSize, setCustomSize] = useState('');
    const [focusMode, setFocusMode] = useState(false);
    const [wordsPerChunk, setWordsPerChunk] = useState(4);
    const [inverseMode, setInverseMode] = useState(false);
    const [selectedFont, setSelectedFont] = useState(fontFamily);
    
    // Debug logs to verify props and rendering
    useEffect(() => {
        console.log('ControlPanel rendered with props:', { onTextSizeChange, onNavigate });
    }, [onTextSizeChange, onNavigate]);

    const handleIncreaseSize = () => {
        console.log('Increase size button clicked');
        const newSize = textSize + 2;
        setTextSize(newSize);
        if (typeof onTextSizeChange === 'function') {
            onTextSizeChange(newSize);
            alert(`Font size increased to ${newSize}px`);
        } else {
            console.error('onTextSizeChange is not a function', onTextSizeChange);
        }
    };

    const handleDecreaseSize = () => {
        console.log('Decrease size button clicked');
        const newSize = textSize > 10 ? textSize - 2 : textSize;
        setTextSize(newSize);
        if (typeof onTextSizeChange === 'function') {
            onTextSizeChange(newSize);
            alert(`Font size decreased to ${newSize}px`);
        } else {
            console.error('onTextSizeChange is not a function', onTextSizeChange);
        }
    };

    const handleNavigate = (direction) => {
        console.log('Navigate button clicked:', direction);
        if (typeof onNavigate === 'function') {
            onNavigate(direction);
        } else {
            console.error('onNavigate is not a function', onNavigate);
            alert(`Navigation ${direction} button clicked, but handler is not available`);
        }
    };
    
    const handleCustomSizeChange = (e) => {
        setCustomSize(e.target.value);
    };
    
    const applyCustomSize = () => {
        const newSize = parseInt(customSize, 10);
        if (!isNaN(newSize) && newSize > 0) {
            setTextSize(newSize);
            if (typeof onTextSizeChange === 'function') {
                onTextSizeChange(newSize);
            }
        }
    };
    
    const toggleFocusMode = () => {
        const newFocusMode = !focusMode;
        setFocusMode(newFocusMode);
        if (typeof onFocusModeToggle === 'function') {
            onFocusModeToggle(newFocusMode);
        }
    };
    
    const handleWordsPerChunkChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (!isNaN(newValue) && newValue > 0) {
            setWordsPerChunk(newValue);
            if (typeof onWordsPerChunkChange === 'function') {
                onWordsPerChunkChange(newValue);
            }
        }
    };
    
    const toggleInverseMode = () => {
        const newInverseMode = !inverseMode;
        setInverseMode(newInverseMode);
        if (typeof onInverseModeToggle === 'function') {
            onInverseModeToggle(newInverseMode);
        }
    };
    
    // Handle font family change
    const handleFontFamilyChange = (e) => {
        const newFont = e.target.value;
        setSelectedFont(newFont);
        if (typeof onFontFamilyChange === 'function') {
            onFontFamilyChange(newFont);
        }
    };

    return (
        <div className="control-panel">
            <div className="font-size-controls">
                <button 
                    onClick={handleDecreaseSize}
                    style={{ 
                        padding: '8px 16px', 
                        fontSize: '16px', 
                        margin: '0 5px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    A-
                </button>
                <span>{textSize}px</span>
                <button 
                    onClick={handleIncreaseSize}
                    style={{ 
                        padding: '8px 16px', 
                        fontSize: '16px', 
                        margin: '0 5px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    A+
                </button>
                
                <div className="custom-size-input" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '10px' }}>
                    <input 
                        type="number" 
                        value={customSize}
                        onChange={handleCustomSizeChange}
                        placeholder="Custom size"
                        style={{
                            width: '80px',
                            padding: '8px',
                            marginRight: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    <button 
                        onClick={applyCustomSize}
                        style={{ 
                            padding: '8px 16px', 
                            fontSize: '16px', 
                            backgroundColor: '#9b59b6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Apply
                    </button>
                </div>
                
                <button 
                    onClick={toggleFocusMode}
                    style={{ 
                        padding: '8px 16px', 
                        fontSize: '16px', 
                        margin: '0 5px',
                        marginLeft: '15px',
                        backgroundColor: focusMode ? '#e74c3c' : '#2ecc71',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                    title={focusMode 
                        ? "Turn off the focus mode which shows text in small chunks" 
                        : "Enable focus mode to display text in small, manageable chunks for easier reading"
                    }
                >
                    {focusMode ? 'Disable Focus Mode' : 'Enable Focus Mode'}
                </button>
                
                {focusMode && (
                    <div className="words-per-chunk-input" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '10px' }}>
                        <label htmlFor="wordsPerChunk" style={{ marginRight: '5px' }}>Words per chunk:</label>
                        <input 
                            id="wordsPerChunk"
                            type="number" 
                            value={wordsPerChunk}
                            onChange={handleWordsPerChunkChange}
                            min="1"
                            max="10"
                            style={{
                                width: '50px',
                                padding: '8px',
                                marginRight: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}
                        />
                    </div>
                )}
                
                <button 
                    onClick={toggleInverseMode}
                    style={{ 
                        padding: '8px 16px', 
                        fontSize: '16px', 
                        margin: '0 5px',
                        marginLeft: '15px',
                        backgroundColor: inverseMode ? '#2c3e50' : '#bdc3c7',
                        color: inverseMode ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                    title={inverseMode 
                        ? "Switch back to normal colors (dark text on light background)" 
                        : "Switch to inverse colors (light text on dark background) which some readers find easier"
                    }
                >
                    {inverseMode ? 'Normal Colors' : 'Inverse Colors'}
                </button>
                
                <div className="font-family-selector" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '15px' }}>
                    <label htmlFor="fontFamily" style={{ marginRight: '8px', fontWeight: 'bold' }}>Font:</label>
                    <select 
                        id="fontFamily"
                        value={selectedFont}
                        onChange={handleFontFamilyChange}
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                        title="Select a dyslexia-friendly font that suits your reading preference"
                    >
                        <option value="default">Default</option>
                        <option value="lexend">Lexend (Dyslexia-friendly)</option>
                        <option value="opendyslexic">OpenDyslexic</option>
                        <option value="roboto">Roboto</option>
                        <option value="opensans">Open Sans</option>
                    </select>
                </div>
            </div>
            
            {/* Remove navigation arrows (up/down) as they are no longer needed */}
        </div>
    );
};

export default ControlPanel;