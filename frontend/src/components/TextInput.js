import React, { useState } from 'react';
import './TextInput.css';

const TextInput = React.forwardRef((props, ref) => {
    const [inputText, setInputText] = useState('');

    const sampleText = `Dyslexia is a learning difference that primarily affects reading, writing, and spelling skills. People with dyslexia have trouble matching the letters they see on the page with the sounds those letters make. But it's not a problem with vision or intelligence. Most people with dyslexia have average or above-average intelligence.

Dyslexia is the most common learning disability, affecting about 20% of the population. It can make reading slow and difficult, which can impact a student's vocabulary development and comprehension. However, there are many strategies and tools that can help people with dyslexia succeed in school and life.`;

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const loadSampleText = () => {
        setInputText(sampleText);
    };

    const clearText = () => {
        setInputText('');
    };

    // Expose the inputText value through ref
    React.useImperativeHandle(ref, () => ({
        getText: () => inputText,
        setText: (text) => setInputText(text)
    }));

    return (
        <div className="text-input-container">
            <h2>Text Input</h2>
            <div className="text-input">
                <textarea
                    value={inputText}
                    onChange={handleChange}
                    placeholder="Paste your text here or click 'Load Sample Text' to get started..."
                    rows="8"
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
            <div className="button-container">
                <button onClick={loadSampleText} className="sample-text-btn">
                    Load Sample Text
                </button>
                <button onClick={clearText} className="clear-text-btn">
                    Clear Text
                </button>
            </div>
        </div>
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;