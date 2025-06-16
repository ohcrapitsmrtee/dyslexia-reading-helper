import React, { useState, useEffect, useRef } from 'react';
import './TextDisplay.css';

const TextDisplay = ({ text, fontSize, focusMode, wordsPerChunk = 4, inverseMode = false, fontFamily = 'default' }) => {
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
    const [wordChunks, setWordChunks] = useState([]);
    const containerRef = useRef(null);
    
    // Process text into word chunks when text changes
    useEffect(() => {
        if (!text) {
            setWordChunks([]);
            return;
        }
        // Split text into lines
        const lines = text.split(/\r?\n/);
        const chunks = [];
        let currentChunk = [];
        let wordCount = 0;
        for (let line of lines) {
            const words = line.split(/\s+/).filter(word => word.trim() !== '');
            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                currentChunk.push(word);
                wordCount++;
                // End chunk if word ends with strong punctuation or chunk is full
                if (/[:.!?]$/.test(word) || wordCount >= wordsPerChunk) {
                    chunks.push(currentChunk.join(' '));
                    currentChunk = [];
                    wordCount = 0;
                }
            }
            // Always end chunk at line break if any words remain
            if (currentChunk.length > 0) {
                chunks.push(currentChunk.join(' '));
                currentChunk = [];
                wordCount = 0;
            }
        }
        setWordChunks(chunks);
        setCurrentChunkIndex(0);
    }, [text, wordsPerChunk]);
    
    // Navigation helpers
    const goToNextChunk = () => {
        setCurrentChunkIndex(prev => prev < wordChunks.length - 1 ? prev + 1 : prev);
    };
    const goToPreviousChunk = () => {
        setCurrentChunkIndex(prev => prev > 0 ? prev - 1 : prev);
    };

    // Handle keyboard and mouse navigation for focus mode
    useEffect(() => {
        const isInputFocused = () => {
            const active = document.activeElement;
            return active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
        };

        const handleKeyPress = (e) => {
            if (!focusMode || isInputFocused()) return;
            if (e.key === 'ArrowDown') {
                goToNextChunk();
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                goToPreviousChunk();
                e.preventDefault();
            } else if (e.key === 'ArrowRight' || e.key === ' ') {
                goToNextChunk();
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                goToPreviousChunk();
                e.preventDefault();
            }
        };

        const handleWheel = (e) => {
            if (!focusMode || isInputFocused()) return;
            if (e.deltaY > 0) {
                goToNextChunk();
                e.preventDefault();
            } else if (e.deltaY < 0) {
                goToPreviousChunk();
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyPress, { passive: false });
        document.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('wheel', handleWheel);
        };
    }, [focusMode, wordChunks.length]);
    
    // Handle focus mode rendering
    const renderContent = () => {
        if (!focusMode || wordChunks.length === 0) {
            return text;
        }
        
        return (
            <div className="focus-mode-content">
                <div className="progress-bar">
                    <div 
                        className="progress-indicator" 
                        style={{
                            width: `${(currentChunkIndex + 1) / wordChunks.length * 100}%`,
                            backgroundColor: inverseMode ? '#ffffff' : '#3498db'
                        }}
                    ></div>
                </div>
                <div 
                    className="focus-chunk"
                    style={{
                        backgroundColor: inverseMode ? '#2c3e50' : 'white',
                        color: inverseMode ? '#ffffff' : '#333333',
                        borderLeftColor: inverseMode ? '#ecf0f1' : '#3498db'
                    }}
                >
                    {wordChunks[currentChunkIndex]}
                </div>
                <div className="focus-controls">
                    <button 
                        onClick={() => setCurrentChunkIndex(prev => prev > 0 ? prev - 1 : prev)}
                        disabled={currentChunkIndex === 0}
                        className="focus-control-button"
                        style={{
                            backgroundColor: inverseMode ? '#ecf0f1' : '#3498db',
                            color: inverseMode ? '#333333' : 'white'
                        }}
                    >
                        ← Previous
                    </button>
                    <span 
                        className="chunk-counter"
                        style={{
                            color: inverseMode ? '#ecf0f1' : '#666'
                        }}
                    >
                        {currentChunkIndex + 1} of {wordChunks.length} 
                        <span className="words-info">({wordsPerChunk} words per chunk)</span>
                    </span>
                    <button 
                        onClick={() => setCurrentChunkIndex(prev => prev < wordChunks.length - 1 ? prev + 1 : prev)}
                        disabled={currentChunkIndex === wordChunks.length - 1}
                        className="focus-control-button"
                        style={{
                            backgroundColor: inverseMode ? '#ecf0f1' : '#3498db',
                            color: inverseMode ? '#333333' : 'white'
                        }}
                    >
                        Next →
                    </button>
                </div>
            </div>
        );
    };
    
    // Get the appropriate font class based on fontFamily
    const getFontClass = () => {
        switch (fontFamily) {
            case 'lexend': return 'font-lexend';
            case 'opendyslexic': return 'font-opendyslexic';
            case 'roboto': return 'font-roboto';
            case 'opensans': return 'font-opensans';
            default: return 'font-default';
        }
    };

    const style = {
        fontSize: `${fontSize}px`,
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        backgroundColor: inverseMode ? '#121212' : 'white',
        color: inverseMode ? '#ffffff' : '#333333',
    };

    return (
        <div 
            className={`text-display ${focusMode ? 'focus-mode' : ''} ${inverseMode ? 'inverse-mode' : ''} ${getFontClass()}`} 
            style={style} 
            ref={containerRef}
        >
            {renderContent()}
        </div>
    );
};

export default TextDisplay;