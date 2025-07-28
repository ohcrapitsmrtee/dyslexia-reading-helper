import React, { useState, useEffect, useRef } from 'react';
import './TextDisplay.css';

const TextDisplay = ({ text, fontSize, focusMode, wordsPerChunk = 4, inverseMode = false, fontFamily = 'default', onChunkChange }) => {
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
    const [wordChunks, setWordChunks] = useState([]);
    const [chunkMappings, setChunkMappings] = useState([]);
    const containerRef = useRef(null);
    const contextDisplayRef = useRef(null);
    const highlightedChunkRef = useRef(null);
    
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
    
    // Calculate chunk mappings when chunks change
    useEffect(() => {
        if (!text || wordChunks.length === 0) {
            setChunkMappings([]);
            return;
        }

        const mappings = [];
        let textIndex = 0;
        
        for (let i = 0; i < wordChunks.length; i++) {
            const chunk = wordChunks[i];
            const chunkWords = chunk.split(/\s+/).filter(word => word.trim() !== '');
            
            // Find where this chunk starts in the original text
            let startIndex = -1;
            let endIndex = -1;
            
            // Search for the first word of this chunk
            if (chunkWords.length > 0) {
                const firstWord = chunkWords[0];
                const searchText = text.substring(textIndex);
                const wordRegex = new RegExp('\\b' + firstWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
                const match = searchText.match(wordRegex);
                
                if (match) {
                    startIndex = textIndex + match.index;
                    
                    // Find the end by looking for all words in sequence
                    let tempIndex = startIndex;
                    let wordsFound = 0;
                    
                    for (let word of chunkWords) {
                        const remainingText = text.substring(tempIndex);
                        const regex = new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
                        const wordMatch = remainingText.match(regex);
                        
                        if (wordMatch) {
                            tempIndex += wordMatch.index + wordMatch[0].length;
                            wordsFound++;
                        } else {
                            break;
                        }
                    }
                    
                    if (wordsFound === chunkWords.length) {
                        endIndex = tempIndex;
                        textIndex = tempIndex; // Update search position for next chunk
                    }
                }
            }
            
            mappings.push({
                chunkIndex: i,
                chunkText: chunk,
                startIndex,
                endIndex,
                words: chunkWords
            });
        }
        
        setChunkMappings(mappings);
    }, [text, wordChunks]);
    
    // Notify parent component about chunk changes
    useEffect(() => {
        if (onChunkChange && chunkMappings.length > 0) {
            onChunkChange({
                currentChunkIndex,
                wordChunks,
                totalChunks: wordChunks.length,
                originalText: text,
                chunkMappings
            });
        }
    }, [currentChunkIndex, wordChunks, onChunkChange, text, chunkMappings]);
    
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
            // More comprehensive check for input elements to ensure paste works correctly
            return active && (
                active.tagName === 'INPUT' || 
                active.tagName === 'TEXTAREA' || 
                active.isContentEditable ||
                active.getAttribute('role') === 'textbox'
            );
        };

        const handleKeyPress = (e) => {
            // Check if an input is focused or if paste operation is in progress (Ctrl+V)
            if (!focusMode || isInputFocused() || (e.ctrlKey && e.key.toLowerCase() === 'v')) return;
            
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
            // Only prevent default behavior if we're in focus mode and not working with an input
            if (!focusMode || isInputFocused()) return;
            
            // Make sure the wheel event is happening over this component
            if (!containerRef.current?.contains(e.target) && e.target !== containerRef.current) return;
            
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
    
    // Auto-scroll context display to show current chunk (conservative approach)
    useEffect(() => {
        if (focusMode && highlightedChunkRef.current && contextDisplayRef.current) {
            const highlightedElement = highlightedChunkRef.current;
            const contextContainer = contextDisplayRef.current;
            
            // Get positions
            const containerRect = contextContainer.getBoundingClientRect();
            const elementRect = highlightedElement.getBoundingClientRect();
            
            // Check if element is visible in container
            const isElementVisible = 
                elementRect.top >= containerRect.top && 
                elementRect.bottom <= containerRect.bottom;
            
            // Only scroll if the highlighted text is not visible
            if (!isElementVisible) {
                const elementTop = highlightedElement.offsetTop;
                const elementHeight = highlightedElement.offsetHeight;
                const containerHeight = contextContainer.clientHeight;
                const currentScrollTop = contextContainer.scrollTop;
                
                let newScrollTop = currentScrollTop;
                
                // If element is above visible area, scroll up to show it at the top
                if (elementRect.top < containerRect.top) {
                    newScrollTop = elementTop - 20; // 20px padding from top
                }
                // If element is below visible area, scroll down to show it at the bottom
                else if (elementRect.bottom > containerRect.bottom) {
                    newScrollTop = elementTop - containerHeight + elementHeight + 20; // 20px padding from bottom
                }
                
                // Only scroll if we need to move significantly (avoid micro-adjustments)
                if (Math.abs(newScrollTop - currentScrollTop) > 10) {
                    contextContainer.scrollTo({
                        top: Math.max(0, newScrollTop),
                        behavior: 'smooth'
                    });
                }
            }
        }
    }, [currentChunkIndex, focusMode]);
    
    // Handle focus mode rendering
    const renderContent = () => {
        if (!focusMode || wordChunks.length === 0) {
            // When focus mode is disabled, show the full text
            return (
                <div className="full-text-display">
                    {text}
                </div>
            );
        }
        
        return (
            <div className="focus-mode-content">
                {/* Document Context with highlighting */}
                <div className="document-context-section">
                    <h3 className="context-title">
                        Document Context
                        <span className="context-position">
                            (Chunk {currentChunkIndex + 1} of {wordChunks.length})
                        </span>
                    </h3>
                    <div className="context-display" ref={contextDisplayRef}>
                        {renderHighlightedText()}
                    </div>
                </div>

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
                        <span className="words-info">
                            ({wordChunks[currentChunkIndex] ? wordChunks[currentChunkIndex].split(/\s+/).length : 0} words this chunk)
                        </span>
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

    // Function to highlight the current chunk in the full text using precise positions
    const renderHighlightedText = () => {
        if (!text || currentChunkIndex < 0 || !chunkMappings || chunkMappings.length === 0) {
            return text;
        }

        const currentMapping = chunkMappings[currentChunkIndex];
        if (!currentMapping || currentMapping.startIndex === -1 || currentMapping.endIndex === -1) {
            return text;
        }

        return (
            <>
                <span>{text.substring(0, currentMapping.startIndex)}</span>
                <span 
                    ref={highlightedChunkRef}
                    className="highlighted-chunk" 
                    style={{
                        backgroundColor: inverseMode ? '#e74c3c' : '#ffc107',
                        color: inverseMode ? '#ffffff' : '#000000',
                        padding: '2px 4px',
                        borderRadius: '3px',
                        fontWeight: 'bold'
                    }}
                >
                    {text.substring(currentMapping.startIndex, currentMapping.endIndex)}
                </span>
                <span>{text.substring(currentMapping.endIndex)}</span>
            </>
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