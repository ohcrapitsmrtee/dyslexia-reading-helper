const fs = require('fs');
const path = require('path');
const https = require('https');

// URLs for OpenDyslexic font files
const fonts = [
  {
    name: 'OpenDyslexic-Regular.otf',
    url: 'https://github.com/antijingoist/opendyslexic/raw/master/compiled/OpenDyslexic-Regular.otf'
  },
  {
    name: 'OpenDyslexic-Bold.otf',
    url: 'https://github.com/antijingoist/opendyslexic/raw/master/compiled/OpenDyslexic-Bold.otf'
  }
];

// Create fonts directory if it doesn't exist
const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
  console.log('Created fonts directory');
}

// Download each font
fonts.forEach(font => {
  const filePath = path.join(fontsDir, font.name);
  const file = fs.createWriteStream(filePath);
  
  console.log(`Downloading ${font.name}...`);
  
  https.get(font.url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download ${font.name}: HTTP Status ${response.statusCode}`);
      fs.unlinkSync(filePath); // Remove the file if download failed
      return;
    }
    
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`Successfully downloaded ${font.name}`);
    });
  }).on('error', (err) => {
    fs.unlinkSync(filePath); // Remove the file if download failed
    console.error(`Error downloading ${font.name}: ${err.message}`);
  });
});

console.log('Font download script completed. Please check for any errors above.');
