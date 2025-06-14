import React from 'react';
import './TextDisplay.css';

const TextDisplay = ({ text, fontSize }) => {
    const style = {
        fontSize: `${fontSize}px`,
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
    };

    return (
        <div className="text-display" style={style}>
            {text}
        </div>
    );
};

export default TextDisplay;