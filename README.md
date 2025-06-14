# Dyslexia Reading Helper

## Overview
The Dyslexia Reading Helper is a web-based application designed to assist individuals with dyslexia in reading text more effectively. The application allows users to paste text and enlarge specific portions to enhance focus and comprehension.

## Features
- **Text Input**: Users can paste their text into a dedicated input area.
- **Text Enlargement**: The application allows users to enlarge specific words or phrases to reduce visual clutter and improve focus.
- **Control Panel**: Users can adjust text size and navigate through the text easily.
- **Responsive Design**: The application is designed to be user-friendly and accessible on various devices.

## Project Structure
The project is organized into two main directories: `frontend` and `backend`.

### Frontend
- **src**: Contains the source code for the React application.
  - **components**: Includes reusable components such as Header, Footer, TextInput, TextDisplay, and ControlPanel.
  - **styles**: Contains CSS files for styling the application.
  - **utils**: Includes utility functions for processing text.
  - **App.js**: The main application component.
  - **index.js**: The entry point for the React application.
- **public**: Contains static files such as HTML and manifest.
- **package.json**: Lists dependencies and scripts for the frontend.

### Backend (Optional)
- **server.js**: Sets up the Express server.
- **controllers**: Contains logic for handling user-related requests.
- **models**: Defines the user model for database interactions.
- **routes**: Exports API routes for the backend.
- **package.json**: Lists dependencies and scripts for the backend.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:
   ```
   cd dyslexia-reading-helper/frontend
   ```

3. Install the frontend dependencies:
   ```
   npm install
   ```

4. (Optional) Navigate to the backend directory and install dependencies:
   ```
   cd ../backend
   npm install
   ```

5. Start the frontend application:
   ```
   cd ../frontend
   npm start
   ```

6. (Optional) Start the backend server:
   ```
   cd ../backend
   node server.js
   ```

## Usage
1. Open the application in your web browser.
2. Paste the text you want to read in the input area.
3. Use the control panel to adjust the text size and navigate through the text.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.