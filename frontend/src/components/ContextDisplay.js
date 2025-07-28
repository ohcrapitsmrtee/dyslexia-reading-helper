import React, { useEffect, useRef } from 'react';
import './ContextDisplay.css';

const ContextDisplay = ({ text, fontSize, currentChunkIndex, wordChunks, wordsPerChunk, inverseMode, fontFamily, chunkMappings }) => {
    const highlightedChunkRef = useRef(null);
    const containerRef = useRef(null);
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

    // Function to highlight the current chunk in the full text
    const renderHighlightedText = () => {
        if (!text || !chunkMappings || chunkMappings.length === 0 || currentChunkIndex < 0) {
            return text;
        }

        const currentMapping = chunkMappings[currentChunkIndex];
        if (!currentMapping || currentMapping.startIndex === -1 || currentMapping.endIndex === -1) {
            return text;
        }

        const result = [];

        // Add text before the highlighted chunk
        if (currentMapping.startIndex > 0) {
            result.push(
                <span key="before">
                    {text.substring(0, currentMapping.startIndex)}
                </span>
            );
        }

        // Add the highlighted chunk with ref for auto-scrolling
        result.push(
            <span key="highlighted" className="highlighted-chunk" ref={highlightedChunkRef}>
                {text.substring(currentMapping.startIndex, currentMapping.endIndex)}
            </span>
        );

        // Add text after the highlighted chunk
        if (currentMapping.endIndex < text.length) {
            result.push(
                <span key="after">
                    {text.substring(currentMapping.endIndex)}
                </span>
            );
        }

        return result;
    };

    // Auto-scroll to highlighted chunk when currentChunkIndex changes
    useEffect(() => {
        if (highlightedChunkRef.current && containerRef.current) {
            const highlightedElement = highlightedChunkRef.current;
            const container = containerRef.current;
            
            // Get the position of the highlighted chunk relative to the container
            const highlightedRect = highlightedElement.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            // Calculate if we need to scroll
            const isVisible = highlightedRect.top >= containerRect.top && 
                            highlightedRect.bottom <= containerRect.bottom;
            
            if (!isVisible) {
                // Scroll to center the highlighted chunk in the container
                const scrollTop = highlightedElement.offsetTop - 
                                container.offsetTop - 
                                (container.clientHeight / 2) + 
                                (highlightedElement.clientHeight / 2);
                
                container.scrollTo({
                    top: scrollTop,
                    behavior: 'smooth'
                });
            }
        }
    }, [currentChunkIndex, chunkMappings]);

    const style = {
        fontSize: `${fontSize * 0.8}px`, // Slightly smaller than focus text
        lineHeight: '1.6',
        backgroundColor: inverseMode ? '#1a1a1a' : '#f8f9fa',
        color: inverseMode ? '#ffffff' : '#333333',
    };

    return (
        <div className={`context-display-container ${inverseMode ? 'inverse-mode' : ''}`}>
            <h3 className="context-title">
                Document Context
                {currentChunkIndex >= 0 && wordChunks.length > 0 && (
                    <span className="context-position">
                        (Chunk {currentChunkIndex + 1} of {wordChunks.length})
                    </span>
                )}
            </h3>
            <div 
                ref={containerRef}
                className={`context-display ${getFontClass()}`} 
                style={style}
            >
                {renderHighlightedText()}
            </div>
        </div>
    );
};

export default ContextDisplay;
