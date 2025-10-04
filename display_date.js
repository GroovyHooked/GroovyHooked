const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

const README_PATH = path.join(__dirname, './README.md');
const README_CONTENT = fs.readFileSync(README_PATH, 'utf8');

// Generate a random number of zero-width spaces
const getRandomInvisibleString = () => {
  const zeroWidthSpace = '\u200B';
  const count = Math.floor(Math.random() * 5) + 1;
  return zeroWidthSpace.repeat(count);
};

const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const newContent = README_CONTENT.replace(
  /<!-- display date -->(.*?)<!-- display date end -->/s,
  `<!-- display date -->\n${today}${getRandomInvisibleString()}\n<!-- display date end -->`
);

fs.writeFileSync(README_PATH, newContent);

exec('git config --global user.email "dafrenchie2002@yahoo.fr"');
exec('git config --global user.name "GroovyHooked"');
exec('git add README.md');

// Check if there are changes to commit
try {
  const status = exec('git status --porcelain').toString().trim();
  if (status) {
    console.log('Changes detected, committing...');
    exec('git commit -m "Update README with current date"');
    exec('git push');
  } else {
    console.log('No changes to commit');
  }
} catch (error) {
  console.error('Error during git operations:', error.message);
}


