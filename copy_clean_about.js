const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\rajbi\\.gemini\\antigravity-ide\\brain\\c8ae826a-8966-42b5-b198-bcec38ae6a9c\\about_hero_clean_1786432049759.png';
const dest = path.join(__dirname, 'public', 'about-hero.png');

fs.copyFileSync(src, dest);
console.log('Clean text-free About Us image copied successfully to', dest);
