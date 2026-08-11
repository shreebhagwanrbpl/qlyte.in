const fs = require('fs');
const path = require('path');

const files = [
  { src: 'C:\\Users\\rajbi\\.gemini\\antigravity-ide\\brain\\c8ae826a-8966-42b5-b198-bcec38ae6a9c\\about_company_hero_1786431629855.png', dest: 'about-hero.png' },
  { src: 'C:\\Users\\rajbi\\.gemini\\antigravity-ide\\brain\\c8ae826a-8966-42b5-b198-bcec38ae6a9c\\services_biomedical_tech_1786431653228.png', dest: 'services-hero.png' }
];

files.forEach(({ src, dest }) => {
  const target = path.join(__dirname, 'public', dest);
  fs.copyFileSync(src, target);
  console.log(`Copied ${dest}`);
});
