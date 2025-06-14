import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import TextDisplay from './components/TextDisplay';
import ControlPanel from './components/ControlPanel';
import './styles/main.css';

const App = () => {
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(24); // Default font size

    const handleTextChange = (newText) => {
        setText(newText);
    };

    const handleFontSizeChange = (newSize) => {
        setFontSize(newSize);
    };

    return (
        <div className="app-container">
            <Header />
            <TextInput onTextChange={handleTextChange} />
            <ControlPanel onFontSizeChange={handleFontSizeChange} />
            <TextDisplay text={text} fontSize={fontSize} />
            <Footer />
        </div>
    );
};

export default App;