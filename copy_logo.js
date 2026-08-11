const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\rajbi\\.gemini\\antigravity-ide\\brain\\c8ae826a-8966-42b5-b198-bcec38ae6a9c\\media__1786430813936.png';
const dest = path.join(__dirname, 'public', 'logo.png');

fs.copyFileSync(src, dest);
console.log('Official user logo copied successfully to', dest);
