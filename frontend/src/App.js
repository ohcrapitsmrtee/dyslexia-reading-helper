import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import TextDisplay from './components/TextDisplay';
import ControlPanel from './components/ControlPanel';
import SettingsPanel from './components/SettingsPanel';
import HelpPanel from './components/HelpPanel';
import './styles/main.css';

const App = () => {
    // Create ref for TextInput component
    const textInputRef = useRef(null);
    // Load saved preferences or set defaults
    const loadSavedPreferences = () => {
        const savedPreferences = localStorage.getItem('dyslexiaHelperPreferences');
        if (savedPreferences) {
            try {
                return JSON.parse(savedPreferences);
            } catch (e) {
                console.error('Failed to parse saved preferences:', e);
            }
        }
        return null;
    };
    
    const savedPrefs = loadSavedPreferences();
    
    const [text, setText] = useState('');
    const [currentPage, setCurrentPage] = useState('input'); // 'input' or 'reading'
    const [fontSize, setFontSize] = useState(savedPrefs?.fontSize || 24); // Default font size
    const [focusMode, setFocusMode] = useState(savedPrefs?.focusMode || false); // Focus mode state
    const [wordsPerChunk, setWordsPerChunk] = useState(savedPrefs?.wordsPerChunk || 4); // Words per chunk for focus mode
    const [inverseMode, setInverseMode] = useState(savedPrefs?.inverseMode || false); // Inverse color mode
    const [fontFamily, setFontFamily] = useState(savedPrefs?.fontFamily || 'default'); // Font family
    
    // Chunk state for context display
    const [chunkInfo, setChunkInfo] = useState({
        currentChunkIndex: 0,
        wordChunks: [],
        totalChunks: 0,
        originalText: '',
        chunkMappings: []
    });

    const handleFontSizeChange = (newSize) => {
        setFontSize(newSize);
    };
    
    // Function to handle focus mode toggle
    const handleFocusModeToggle = (isEnabled) => {
        console.log(`Focus mode ${isEnabled ? 'enabled' : 'disabled'}`);
        setFocusMode(isEnabled);
    };
    
    // Function to handle words per chunk change
    const handleWordsPerChunkChange = (numWords) => {
        console.log(`Words per chunk changed to ${numWords}`);
        setWordsPerChunk(numWords);
    };
    
    // Function to handle inverse color mode toggle
    const handleInverseModeToggle = (isEnabled) => {
        console.log(`Inverse mode ${isEnabled ? 'enabled' : 'disabled'}`);
        setInverseMode(isEnabled);
    };
    
    // Function to handle font family change
    const handleFontFamilyChange = (newFont) => {
        console.log(`Font family changed to ${newFont}`);
        setFontFamily(newFont);
    };
    
    // Function to handle chunk information changes
    const handleChunkChange = (newChunkInfo) => {
        setChunkInfo(newChunkInfo);
    };

    // Navigation functions for page switching
    const goToReadingPage = () => {
        const inputText = textInputRef.current?.getText() || '';
        if (inputText.trim()) {
            setText(inputText);
            setCurrentPage('reading');
        } else {
            alert('Please enter or paste some text first!');
        }
    };

    const goToInputPage = () => {
        setCurrentPage('input');
    };
    
    // Save preferences to local storage
    useEffect(() => {
        const preferences = {
            fontSize,
            focusMode,
            wordsPerChunk,
            inverseMode,
            fontFamily
        };
        
        localStorage.setItem('dyslexiaHelperPreferences', JSON.stringify(preferences));
        console.log('Preferences saved:', preferences);
    }, [fontSize, focusMode, wordsPerChunk, inverseMode, fontFamily]);

    return (
        <div className="app-container">
            <Header />
            <SettingsPanel />
            <HelpPanel />
            
            {currentPage === 'input' && (
                <div className="input-page">
                    <TextInput ref={textInputRef} />
                    
                    {/* Navigation button to go to reading page */}
                    <div className="page-navigation">
                        <button 
                            className="nav-button primary-nav" 
                            onClick={goToReadingPage}
                        >
                            Start Reading →
                        </button>
                    </div>
                </div>
            )}

            {currentPage === 'reading' && (
                <div className="reading-page">
                    {/* Navigation button to go back to input */}
                    <div className="page-navigation">
                        <button 
                            className="nav-button secondary-nav" 
                            onClick={goToInputPage}
                        >
                            ← Back to Edit Text
                        </button>
                    </div>

                    <ControlPanel 
                        onTextSizeChange={handleFontSizeChange} 
                        onFocusModeToggle={handleFocusModeToggle}
                        onWordsPerChunkChange={handleWordsPerChunkChange}
                        onInverseModeToggle={handleInverseModeToggle}
                        onFontFamilyChange={handleFontFamilyChange}
                        fontFamily={fontFamily}
                    />
                    
                    <TextDisplay 
                        text={text} 
                        fontSize={fontSize} 
                        focusMode={focusMode}
                        wordsPerChunk={wordsPerChunk}
                        inverseMode={inverseMode}
                        fontFamily={fontFamily}
                        onChunkChange={handleChunkChange}
                    />
                </div>
            )}
            
            <Footer />
        </div>
    );
};

export default App;