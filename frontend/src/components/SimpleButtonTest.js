import React, { useState } from 'react';

const SimpleButtonTest = () => {
    const [clicked, setClicked] = useState(false);
    
    const handleClick = () => {
        setClicked(true);
        console.log('Simple button was clicked!');
        alert('Button clicked! If you see this alert, buttons are working.');
    };
    
    return (
        <div style={{ 
            margin: '20px', 
            padding: '20px', 
            border: '2px solid red',
            backgroundColor: '#ffeeee',
            textAlign: 'center'
        }}>
            <h2>Button Test Component</h2>
            <p>This is a test to see if buttons work in your application.</p>
            
            <button 
                onClick={handleClick}
                style={{
                    padding: '15px 30px',
                    fontSize: '18px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    margin: '20px'
                }}
            >
                CLICK THIS TEST BUTTON
            </button>
            
            {clicked && (
                <div style={{ 
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#2ecc71',
                    color: 'white' 
                }}>
                    Success! The button was clicked.
                </div>
            )}
        </div>
    );
};

export default SimpleButtonTest;
