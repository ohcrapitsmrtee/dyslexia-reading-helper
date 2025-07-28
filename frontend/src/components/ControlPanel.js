import React, { useState, useEffect } from 'react';
import './ControlPanel.css';

const ControlPanel = ({ 
    onTextSizeChange, 
    onFocusModeToggle, 
    onWordsPerChunkChange, 
    onInverseModeToggle,
    onFontFamilyChange,
    fontFamily = 'default'
}) => {
    const [textSize, setTextSize] = useState(16);
    const [focusMode, setFocusMode] = useState(false);
    const [wordsPerChunk, setWordsPerChunk] = useState(4);
    const [inverseMode, setInverseMode] = useState(false);
    const [selectedFont, setSelectedFont] = useState(fontFamily);

    // Debug logging
    useEffect(() => {
        console.log('ControlPanel - wordsPerChunk changed to:', wordsPerChunk);
    }, [wordsPerChunk]);

    const handleIncreaseSize = () => {
        const newSize = textSize + 2;
        setTextSize(newSize);
        if (onTextSizeChange) {
            onTextSizeChange(newSize);
        }
    };

    const handleDecreaseSize = () => {
        const newSize = textSize > 10 ? textSize - 2 : textSize;
        setTextSize(newSize);
        if (onTextSizeChange) {
            onTextSizeChange(newSize);
        }
    };

    const toggleFocusMode = () => {
        const newFocusMode = !focusMode;
        setFocusMode(newFocusMode);
        if (onFocusModeToggle) {
            onFocusModeToggle(newFocusMode);
        }
    };

    const handleWordsPerChunkChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        console.log('ControlPanel - handleWordsPerChunkChange called with:', newValue);
        if (!isNaN(newValue) && newValue > 0 && newValue <= 10) {
            setWordsPerChunk(newValue);
            if (onWordsPerChunkChange) {
                console.log('ControlPanel - calling onWordsPerChunkChange with:', newValue);
                onWordsPerChunkChange(newValue);
            }
        }
    };

    const toggleInverseMode = () => {
        const newInverseMode = !inverseMode;
        setInverseMode(newInverseMode);
        if (onInverseModeToggle) {
            onInverseModeToggle(newInverseMode);
        }
    };

    const handleFontFamilyChange = (e) => {
        const newFont = e.target.value;
        setSelectedFont(newFont);
        if (onFontFamilyChange) {
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
                
                <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{textSize}px</span>
                
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
                
                <button 
                    onClick={toggleFocusMode}
                    style={{ 
                        padding: '8px 16px', 
                        fontSize: '16px', 
                        margin: '0 15px',
                        backgroundColor: focusMode ? '#e74c3c' : '#2ecc71',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {focusMode ? 'Disable Focus Mode' : 'Enable Focus Mode'}
                </button>
                
                {focusMode && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '10px' }}>
                        <label htmlFor="wordsPerChunk" style={{ marginRight: '8px', fontWeight: 'bold' }}>
                            Words per chunk:
                        </label>
                        <input 
                            id="wordsPerChunk"
                            type="number" 
                            value={wordsPerChunk}
                            onChange={handleWordsPerChunkChange}
                            min="1"
                            max="10"
                            style={{
                                width: '60px',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                textAlign: 'center',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                )}
                
                <button 
                    onClick={toggleInverseMode}
                    style={{ 
                        padding: '8px 16px', 
                        fontSize: '16px', 
                        margin: '0 15px',
                        backgroundColor: inverseMode ? '#2c3e50' : '#bdc3c7',
                        color: inverseMode ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {inverseMode ? 'Normal Colors' : 'Inverse Colors'}
                </button>
                
                <div style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '15px' }}>
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
                            fontSize: '16px',
                            minWidth: '120px'
                        }}
                    >
                        <option value="default">Default</option>
                        <option value="OpenDyslexic">OpenDyslexic</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                        <option value="Georgia, serif">Georgia</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;