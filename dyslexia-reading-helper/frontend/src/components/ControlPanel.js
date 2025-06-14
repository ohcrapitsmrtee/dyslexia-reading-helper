import React, { useState } from 'react';

const ControlPanel = ({ onTextSizeChange, onNavigate }) => {
    const [textSize, setTextSize] = useState(16);

    const handleIncreaseSize = () => {
        const newSize = textSize + 2;
        setTextSize(newSize);
        onTextSizeChange(newSize);
    };

    const handleDecreaseSize = () => {
        const newSize = textSize > 10 ? textSize - 2 : textSize;
        setTextSize(newSize);
        onTextSizeChange(newSize);
    };

    const handleNavigate = (direction) => {
        onNavigate(direction);
    };

    return (
        <div className="control-panel">
            <button onClick={handleDecreaseSize}>A-</button>
            <span>{textSize}px</span>
            <button onClick={handleIncreaseSize}>A+</button>
            <button onClick={() => handleNavigate('up')}>↑</button>
            <button onClick={() => handleNavigate('down')}>↓</button>
        </div>
    );
};

export default ControlPanel;