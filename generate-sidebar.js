#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MARKDOWN_DIR = path.join(__dirname, 'markdown', 'notes-vault-main');
const CONFIG_FILE = path.join(__dirname, 'config', '.vitepress', 'config.mts');

// Ignore patterns
const IGNORE_PATTERNS = ['.obsidian', '.gitignore', 'img'];

// Category mapping and display names
const CATEGORY_CONFIG = {
  'Angular': { name: 'Angular', collapsed: true },
  'React': { name: 'React', collapsed: true },
  'Javascript': { name: 'JavaScript', collapsed: true },
  'CSharp': { name: 'C#', collapsed: true },
  'Design patterns': { name: 'Design Patterns', collapsed: true },
  'Algo': { name: 'Algo', collapsed: true },
  'Docker': { name: 'Docker', collapsed: true },
  'AWS': { name: 'AWS', collapsed: true },
};

const TOP_LEVEL_CATEGORIES = {
  'Angular': 'Frontend Development',
  'React': 'Frontend Development',
  'VueJS': 'Frontend Development',
  'Javascript': 'Programming Languages',
  'CSharp': 'Programming Languages',
  'Design patterns': 'Design & Architecture',
  'Algo': 'Algorithms & Data Structures',
  'Docker': 'Infrastructure & DevOps',
  'AWS': 'Infrastructure & DevOps',
  'Common PR comments': 'References & Utilities',
  'Git commands': 'References & Utilities',
  'Random Interview questions': 'References & Utilities',
  'Trunk based development': 'Design & Architecture',
  'install-chromium.sh': 'References & Utilities',
};

function sanitizeLink(text) {
  return text.replace(/\.md$/, '');
}

function getDisplayName(filename) {
  return filename.replace(/\.md$/, '');
}

function readDirectory(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const result = {
    files: [],
    dirs: {}
  };

  items.forEach(item => {
    if (IGNORE_PATTERNS.includes(item.name)) return;

    if (item.isDirectory()) {
      result.dirs[item.name] = readDirectory(path.join(dir, item.name));
    } else if (item.name.endsWith('.md')) {
      result.files.push(item.name);
    }
  });

  // Sort files and directories
  result.files.sort();
  Object.keys(result.dirs).forEach(key => {
    result.dirs[key].files.sort();
  });

  return result;
}

function buildSidebarItems(dir, baseLink = '') {
  const items = [];

  // Add directory items (subdirectories)
  Object.entries(dir.dirs).forEach(([dirName, subDir]) => {
    const config = CATEGORY_CONFIG[dirName] || { name: dirName, collapsed: false };
    const subItems = [];

    // Add markdown files from subdirectory
    subDir.files.forEach(file => {
      const displayName = getDisplayName(file);
      const link = `${baseLink}/${dirName}/${sanitizeLink(file)}`;
      subItems.push({
        text: displayName,
        link: link
      });
    });

    // Add nested directories
    Object.entries(subDir.dirs).forEach(([subDirName, subSubDir]) => {
      const nestedItems = [];
      subSubDir.files.forEach(file => {
        const displayName = getDisplayName(file);
        const link = `${baseLink}/${dirName}/${subDirName}/${sanitizeLink(file)}`;
        nestedItems.push({
          text: displayName,
          link: link
        });
      });

      if (nestedItems.length > 0) {
        subItems.push({
          text: subDirName,
          collapsed: false,
          items: nestedItems
        });
      }
    });

    if (subItems.length > 0) {
      items.push({
        text: config.name,
        collapsed: config.collapsed,
        items: subItems
      });
    }
  });

  // Add root level markdown files
  dir.files.forEach(file => {
    const displayName = getDisplayName(file);
    const link = `/${sanitizeLink(file)}`;
    items.push({
      text: displayName,
      link: link
    });
  });

  return items;
}

function organizeByTopLevelCategory(sidebarItems) {
  const grouped = {};

  // First, group nested categories
  sidebarItems.forEach(item => {
    if (item.items) {
      const topCategory = TOP_LEVEL_CATEGORIES[item.text] || 'Other';
      if (!grouped[topCategory]) {
        grouped[topCategory] = { text: topCategory, items: [] };
      }
      grouped[topCategory].items.push(item);
    } else {
      // Root level file
      const topCategory = TOP_LEVEL_CATEGORIES[item.text] || 'References & Utilities';
      if (!grouped[topCategory]) {
        grouped[topCategory] = { text: topCategory, items: [] };
      }
      grouped[topCategory].items.push(item);
    }
  });

  // Order categories
  const categoryOrder = [
    'Frontend Development',
    'Programming Languages',
    'Design & Architecture',
    'Algorithms & Data Structures',
    'Infrastructure & DevOps',
    'References & Utilities'
  ];

  const ordered = [];
  categoryOrder.forEach(cat => {
    if (grouped[cat]) {
      ordered.push(grouped[cat]);
    }
  });

  return ordered;
}

function generateSidebarConfig() {
  const dir = readDirectory(MARKDOWN_DIR);
  const sidebarItems = buildSidebarItems(dir, '');
  const organizedSidebar = organizeByTopLevelCategory(sidebarItems);
  return organizedSidebar;
}

function updateConfigFile(sidebar) {
  const configContent = fs.readFileSync(CONFIG_FILE, 'utf-8');

  // Generate the sidebar as a string
  const sidebarStr = JSON.stringify(sidebar, null, 2);

  // Find and replace the sidebar section
  const sidebarRegex = /sidebar:\s*\[[\s\S]*?\]\s*,/m;

  const newConfig = configContent.replace(
    sidebarRegex,
    `sidebar: ${sidebarStr},`
  );

  fs.writeFileSync(CONFIG_FILE, newConfig, 'utf-8');
  console.log('✅ Sidebar configuration updated successfully!');
}

// Main execution
try {
  const sidebar = generateSidebarConfig();
  updateConfigFile(sidebar);
} catch (error) {
  console.error('❌ Error generating sidebar:', error);
  process.exit(1);
}
