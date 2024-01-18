const fs = require('fs');
const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const filePath = './README.md'; // Path to README file

// Read the current README content
let readmeContent = fs.readFileSync(filePath, 'utf-8');

// Update the date under the <!-- display date --> comment
const updatedContent = readmeContent.replace(/(<!-- display date -->)[\s\S]*?(<!-- display date end -->)/, `$1\n${today}$2`);

// Write the updated content back to the README file
fs.writeFileSync(filePath, updatedContent, 'utf-8');
