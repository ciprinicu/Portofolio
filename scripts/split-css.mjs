import fs from 'fs';

const lines = fs.readFileSync('style.css', 'utf8').split(/\r?\n/);

function slice(start, end) {
  return lines.slice(start - 1, end).join('\n') + '\n';
}

fs.mkdirSync('css', { recursive: true });
fs.writeFileSync('css/variables.css', slice(1, 36));
fs.writeFileSync('css/preloader.css', slice(37, 945));
fs.writeFileSync('css/hero.css', slice(946, 1012));
fs.writeFileSync('css/deck.css', slice(1013, lines.length));

fs.writeFileSync(
  'style.css',
  `/* CIPRI — split stylesheets (edit css/*.css) */
@import url('css/variables.css');
@import url('css/preloader.css');
@import url('css/hero.css');
@import url('css/deck.css');
`
);

console.log('css split ok');
