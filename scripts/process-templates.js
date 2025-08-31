const fs = require('fs-extra');
const path = require('path');

const commandsDir = path.join(__dirname, '..', 'core', 'commands', 'niopd');
const scriptsDir = path.join(__dirname, '..', 'core', 'scripts', 'niopd');

const replacements = {
  '.claude/scripts/niopd/': '{{SCRIPTS_DIR}}/',
  '.claude/commands/niopd/': '{{COMMANDS_DIR}}/',
  '.claude/agents/niopd/': '{{AGENTS_DIR}}/',
  '.claude/templates/': '{{TEMPLATES_DIR}}/',
  '.claude/': '{{IDE_DIR}}/',
  'claude/agents/': '{{IDE_TYPE}}/agents/',
  'claude/scripts/': '{{IDE_TYPE}}/scripts/'
};

async function processFile(sourcePath, targetPath) {
  try {
    let content = await fs.readFile(sourcePath, 'utf8');
    
    for (const [search, replace] of Object.entries(replacements)) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, replace);
    }
    
    await fs.writeFile(targetPath, content, 'utf8');
    console.log(`✅ 已处理: ${path.basename(sourcePath)}`);
  } catch (error) {
    console.error(`❌ 处理失败: ${sourcePath}`, error.message);
  }
}

async function processDirectory(dirPath, extension = '.md') {
  const files = await fs.readdir(dirPath);
  
  for (const file of files) {
    if (file.endsWith(extension)) {
      const sourcePath = path.join(dirPath, file);
      const targetPath = path.join(dirPath, file + '.template');
      await processFile(sourcePath, targetPath);
    }
  }
}

async function main() {
  console.log('🔄 开始处理命令文件模板...');
  await processDirectory(commandsDir, '.md');
  
  console.log('🔄 开始处理脚本文件模板...');
  await processDirectory(scriptsDir, '.sh');
  
  console.log('✅ 模板处理完成！');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { processFile, processDirectory };