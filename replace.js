const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const ignoreDirs = ['node_modules', '.next', '.git'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      const dirname = path.basename(file);
      if (!ignoreDirs.includes(dirname)) {
        results = results.concat(walk(file));
      }
    } else {
      // only text files, for safety let's do common extensions
      if (/\.(js|jsx|ts|tsx|html|css|md|json)$/.test(file)) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(targetDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/Kwikr/g, 'Kwikr')
    .replace(/kwikr/g, 'kwikr')
    .replace(/KWIKR/g, 'KWIKR');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
