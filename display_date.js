const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

const README_PATH = path.join(__dirname, './README.md');
const README_CONTENT = fs.readFileSync(README_PATH, 'utf8');

const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const newContent = README_CONTENT.replace(
  /<!-- display date -->(.*?)<!-- display date end -->/s,
  `<!-- display date -->\n${today}\n<!-- display date end -->`
);

fs.writeFileSync(README_PATH, newContent);

exec('git config --global user.email "dafrenchie2002@yahoo.fr"');
exec('git config --global user.name "GroovyHooked"');
exec('git add README.md');
exec('git commit -m "Update README with current date"');
exec('git push');


