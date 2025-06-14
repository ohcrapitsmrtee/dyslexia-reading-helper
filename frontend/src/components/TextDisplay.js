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
        
        // Split text into words
        const words = text.split(/\s+/).filter(word => word.trim() !== '');
        
        // Group words into chunks based on user-defined wordsPerChunk
        const chunks = [];
        
        for (let i = 0; i < words.length; i += wordsPerChunk) {
            chunks.push(words.slice(i, i + wordsPerChunk).join(' '));
        }
        
        setWordChunks(chunks);
        setCurrentChunkIndex(0);
    }, [text, wordsPerChunk]);
    
    // Handle keyboard navigation for focus mode
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!focusMode) return;
            
            if (e.key === 'ArrowRight' || e.key === ' ') {
                // Next chunk
                setCurrentChunkIndex(prev => 
                    prev < wordChunks.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === 'ArrowLeft') {
                // Previous chunk
                setCurrentChunkIndex(prev => prev > 0 ? prev - 1 : prev);
            }
        };
        
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
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