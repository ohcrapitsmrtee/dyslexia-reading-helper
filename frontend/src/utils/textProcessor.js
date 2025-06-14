export const resizeText = (text, size) => {
    return `<span style="font-size: ${size}px;">${text}</span>`;
};

export const formatTextForDisplay = (text) => {
    return text.split('\n').map((line, index) => (
        `<p key=${index}>${line}</p>`
    )).join('');
};