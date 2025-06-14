import React, { useState } from 'react';

const TextInput = ({ onTextChange }) => {
    const [inputText, setInputText] = useState('');

    const handleChange = (event) => {
        setInputText(event.target.value);
        onTextChange(event.target.value);
    };

    return (
        <div className="text-input">
            <textarea
                value={inputText}
                onChange={handleChange}
                placeholder="Paste your text here..."
                rows="10"
                cols="50"
            />
        </div>
    );
};

export default TextInput;