import React from 'react';

const TestComponent = () => {
    const handleClick = () => {
        console.log('Test button clicked');
        alert('Button works!');
    };

    return (
        <div style={{ margin: '20px', textAlign: 'center' }}>
            <h3>Test Component</h3>
            <p>Click the button below to test if event handlers are working:</p>
            <button 
                onClick={handleClick}
                style={{
                    padding: '10px 20px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                Test Button
            </button>
        </div>
    );
};

export default TestComponent;
