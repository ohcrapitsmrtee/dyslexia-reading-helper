// This file helps handle paths correctly when deployed to GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/dyslexia-reading-helper' : '';

export { basePath, isGitHubPages };
