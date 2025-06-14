# Dyslexia Reading Helper - Frontend

This project is designed to assist individuals with dyslexia by providing a web-based application that allows users to paste text and enlarge it for better readability. The application focuses on enhancing the reading experience by allowing users to concentrate on a few words at a time.

## Features

- **Text Input**: Users can paste their text into a dedicated text area.
- **Text Enlargement**: The application allows users to enlarge the text for improved focus.
- **Control Panel**: Users can adjust text size and navigate through the text easily.
- **Responsive Design**: The application is designed to be user-friendly and accessible.

## Project Structure

- `src/components`: Contains React components for the application.
  - `Header.js`: Renders the header with the title and navigation links.
  - `Footer.js`: Displays the footer with copyright information.
  - `TextInput.js`: Provides a text area for user input.
  - `TextDisplay.js`: Displays the enlarged text.
  - `ControlPanel.js`: Manages text size adjustments and navigation.

- `src/styles`: Contains CSS files for styling the application.
  - `main.css`: Main styles for layout and typography.
  - `themes.css`: Additional styles for different themes.

- `src/utils`: Contains utility functions for text processing.
  - `textProcessor.js`: Functions for resizing and formatting text.

- `src/App.js`: Main application component that combines all components.
- `src/index.js`: Entry point of the application.

## Installation

To get started with the frontend application, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:
   ```
   cd dyslexia-reading-helper/frontend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm start
   ```

## Usage

1. Paste your text into the input area.
2. Use the control panel to adjust the text size.
3. Navigate through the text using the provided controls.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.