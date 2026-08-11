const fs = require('fs');
const path = require('path');

const slides = [
  { src: 'C:\\Users\\rajbi\\.gemini\\antigravity-ide\\brain\\c8ae826a-8966-42b5-b198-bcec38ae6a9c\\hero_slide_1_1786430503750.png', dest: 'hero-1.png' },
  { src: 'C:\\Users\\rajbi\\.gemini\\antigravity-ide\\brain\\c8ae826a-8966-42b5-b198-bcec38ae6a9c\\hero_slide_2_1786430527879.png', dest: 'hero-2.png' },
  { src: 'C:\\Users\\rajbi\\.gemini\\antigravity-ide\\brain\\c8ae826a-8966-42b5-b198-bcec38ae6a9c\\hero_slide_3_1786430753880.png', dest: 'hero-3.png' },
];

slides.forEach(({ src, dest }) => {
  const target = path.join(__dirname, 'public', dest);
  fs.copyFileSync(src, target);
  console.log(`Copied ${dest}`);
});
