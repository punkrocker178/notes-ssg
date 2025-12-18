const fs = require('fs');
const path = require('path');

const markdownDir = path.join(__dirname, 'markdown');

function scanFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanFiles(filePath);
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      console.log(`Scanning: ${filePath}`);
      escapeVueCurlyBraces(content, file);
      escapeVueCodeBlocks(content, file);
    }
  });
}

function escapeVueCurlyBraces(content, fileName) {
  let curlyBracketMatches = content.match(/`\{\{.+?\}\}`/g);
  if (curlyBracketMatches?.length > 0) {
    const modifiedContent = content.replace(/`\{\{.+?\}\}`/g, '<span v-pre>$&</span>');
    console.log(`-> Curly brackets found at ${fileName}. Wrapping with v-pre`);
    fs.writeFileSync(fileName, modifiedContent, 'utf-8');
    console.log(`-> ${fileName} is cleaned ✓`);
  }
}

function escapeVueCodeBlocks(content, filePath) {
  let codeBlockMatches = content.match(/```vue[\s\S]*?```/g);
  if (codeBlockMatches?.length > 0) {
    const modifiedContent = content.replace(/```vue[\s\S]*?```/g, '````md\n$&\n````');
    fs.writeFileSync(filePath, modifiedContent, 'utf-8');
    console.log(`-> Wrapped Vue code block in ${filePath}`);
  }
}

scanFiles(markdownDir);
