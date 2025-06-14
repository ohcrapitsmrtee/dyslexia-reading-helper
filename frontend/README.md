# Dyslexia Reading Helper - Frontend

This project is designed to assist individuals with dyslexia by providing a web-based application that allows users to paste text and enlarge it for better readability. The application focuses on enhancing the reading experience by allowing users to concentrate on a few words at a time.

## Features

- **Text Input**: Users can paste their text into a dedicated text area or load sample texts
- **Text Enlargement**: Users can increase/decrease text size or set a custom size
- **Control Panel**: Adjust text size, font family, and enable accessibility features
- **Focus Mode**: Display text in manageable chunks to improve reading focus
- **Customizable Reading Experience**: 
  - Configure words per chunk in focus mode
  - Toggle between normal and inverse color modes (dark/light)
  - Choose from different dyslexia-friendly fonts
- **User Preference Saving**: Settings are saved automatically between sessions
- **Dyslexia-Friendly Fonts**:
  - OpenDyslexic: Specially designed font with weighted bottoms
  - Lexend: Font optimized for reading proficiency
  - Other accessible fonts like Roboto and Open Sans
- **Help Panel**: Comprehensive guide on features and reading tips
- **Responsive Design**: User-friendly and accessible across different devices

## Project Structure

- `src/components`: Contains React components for the application.
  - `Header.js`: Renders the header with the title and navigation links.
  - `Footer.js`: Displays the footer with copyright information.
  - `TextInput.js`: Provides a text area for user input and sample text loading.
  - `TextDisplay.js`: Displays the text with focus mode and formatting options.
  - `ControlPanel.js`: Manages text size, font selection, focus mode, and color mode.
  - `SettingsPanel.js`: Interface for viewing and clearing saved user preferences.
  - `HelpPanel.js`: Comprehensive guide on features and reading tips.

- `src/styles`: Contains CSS files for styling the application.
  - `main.css`: Main styles for layout and typography.
  - `themes.css`: Additional styles for different themes.
  - `fonts.css`: Imports and defines dyslexia-friendly fonts.

- `public/fonts`: Contains self-hosted font files.
  - OpenDyslexic font files downloaded during installation.

- `scripts`: Contains utility scripts.
  - `download-fonts.js`: Script to download OpenDyslexic fonts during installation.

- `src/utils`: Contains utility functions for text processing.
  - `textProcessor.js`: Functions for text processing and formatting.

- `src/App.js`: Main application component with state management and user preferences.
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

4. The installation process will automatically download the required OpenDyslexic fonts.
   If you need to download them manually, run:
   ```
   npm run download-fonts
   ```

5. Start the application:
   ```
   npm start
   ```

## Usage

1. Paste your text into the input area.
2. Use the control panel to adjust the text size.
3. Navigate through the text using the provided controls.

## Keyboard Shortcuts

When focus mode is enabled, you can use the following keyboard shortcuts:

- **Right Arrow** or **Spacebar**: Navigate to the next chunk of text
- **Left Arrow**: Navigate to the previous chunk of text

## Accessibility Features

This application is designed with accessibility in mind, particularly for users with dyslexia:

1. **Font Selection**: Multiple dyslexia-friendly fonts are available:
   - OpenDyslexic: Specially designed with weighted bottoms to prevent letter flipping
   - Lexend: Designed to reduce visual stress and improve reading speed
   - Other accessible alternatives (Roboto, Open Sans)

2. **Visual Customization**:
   - Adjustable text size
   - Inverse color mode (white text on black background)
   - Focus mode with configurable words per chunk

3. **User Preferences**: Settings are automatically saved between sessions

4. **Reading Assistance**:
   - Text chunking in focus mode
   - Progress indicators
   - Visual guides

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.