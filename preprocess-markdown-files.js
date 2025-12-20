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
      let escapedContent = escapeVueCurlyBraces(content, file);
      escapedContent = escapeVueCodeBlocks(escapedContent, file);
      fs.writeFileSync(filePath, escapedContent, 'utf-8');
    }
  });
}

function escapeVueCurlyBraces(content, fileName) {
  let curlyBracketMatches = content.match(/`\{\{.+?\}\}`/g);
  if (curlyBracketMatches?.length > 0) {
    const modifiedContent = content.replace(/`\{\{.+?\}\}`/g, '<span v-pre>$&</span>');
    console.log(`-> Curly brackets found at ${fileName}. Wrapping with v-pre`);
    console.log(`-> ${fileName} is wrapped ✓`);
    return modifiedContent;
  }
  return content;
}

function escapeVueCodeBlocks(content, fileName) {
  let codeBlockMatches = content.match(/```vue[\s\S]*?```/g);
  if (codeBlockMatches?.length > 0) {
    const modifiedContent = content.replace(/```vue[\s\S]*?```/g, '````md\n$&\n````');
    console.log(`-> Vue code block found at ${fileName}. Wrapping with markdown code block`);
    console.log(`-> Wrapped Vue code block in ${fileName}`);
    return modifiedContent;
  }
  return content;
}

scanFiles(markdownDir);
