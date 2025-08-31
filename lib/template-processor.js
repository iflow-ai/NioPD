const fs = require('fs-extra');
const path = require('path');

class TemplateProcessor {
  constructor(ideType = 'claude') {
    this.ideType = ideType;
    this.ideDir = ideType === 'claude' ? '.claude' : '.iflow';
    this.variables = {
      '{{IDE_DIR}}': this.ideDir,
      '{{IDE_TYPE}}': this.ideType,
      '{{SCRIPTS_DIR}}': path.posix.join(this.ideDir, 'scripts', 'NioPD'),
      '{{COMMANDS_DIR}}': path.posix.join(this.ideDir, 'commands', 'NioPD'),
      '{{AGENTS_DIR}}': path.posix.join(this.ideDir, 'agents', 'NioPD'),
      '{{TEMPLATES_DIR}}': path.posix.join(this.ideDir, 'templates')
    };
    
    // 直接路径替换映射 - 按长度降序排列，避免部分匹配问题
    this.directReplacements = {
      '.claude/scripts/niopd/': this.variables['{{SCRIPTS_DIR}}'] + '/',
      '.claude/commands/niopd/': this.variables['{{COMMANDS_DIR}}'] + '/',
      '.claude/agents/niopd/': this.variables['{{AGENTS_DIR}}'] + '/',
      '.claude/templates/': this.variables['{{TEMPLATES_DIR}}'] + '/',
      '.claude': this.variables['{{IDE_DIR}}']
    };
  }

  setIdeType(ideType) {
    const validIdes = ['claude', 'iflow'];
    if (!validIdes.includes(ideType)) {
      throw new Error(`无效的IDE类型: ${ideType}. 支持的类型: ${validIdes.join(', ')}`);
    }
    
    this.ideType = ideType;
    this.ideDir = ideType === 'claude' ? '.claude' : '.iflow';
    this.variables = {
      '{{IDE_DIR}}': this.ideDir,
      '{{IDE_TYPE}}': this.ideType,
      '{{SCRIPTS_DIR}}': path.posix.join(this.ideDir, 'scripts', 'NioPD'),
      '{{COMMANDS_DIR}}': path.posix.join(this.ideDir, 'commands', 'NioPD'),
      '{{AGENTS_DIR}}': path.posix.join(this.ideDir, 'agents', 'NioPD'),
      '{{TEMPLATES_DIR}}': path.posix.join(this.ideDir, 'templates')
    };
    
    this.directReplacements = {
      '.claude/scripts/niopd/': this.variables['{{SCRIPTS_DIR}}'] + '/',
      '.claude/commands/niopd/': this.variables['{{COMMANDS_DIR}}'] + '/',
      '.claude/agents/niopd/': this.variables['{{AGENTS_DIR}}'] + '/',
      '.claude/templates/': this.variables['{{TEMPLATES_DIR}}'] + '/',
      '.claude': this.variables['{{IDE_DIR}}']
    };
  }

  processTemplate(content) {
    let processedContent = content;
    
    // 先处理直接路径替换
    for (const [search, replace] of Object.entries(this.directReplacements)) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      processedContent = processedContent.replace(regex, replace);
    }
    
    // 再处理模板变量
    for (const [placeholder, value] of Object.entries(this.variables)) {
      const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      processedContent = processedContent.replace(regex, value);
    }
    
    return processedContent;
  }

  async processTemplateFile(sourcePath, targetPath) {
    try {
      const content = await fs.readFile(sourcePath, 'utf8');
      const processedContent = this.processTemplate(content);
      
      // 如果源文件是.template，则去掉.template后缀
      let finalTargetPath = targetPath;
      if (sourcePath.endsWith('.template')) {
        finalTargetPath = targetPath.replace(/\.template$/, '');
      }
      
      await fs.ensureDir(path.dirname(finalTargetPath));
      await fs.writeFile(finalTargetPath, processedContent, 'utf8');
      return true;
    } catch (error) {
      throw new Error(`处理模板文件失败 ${sourcePath} -> ${targetPath}: ${error.message}`);
    }
  }

  async processTemplateDirectory(sourceDir, targetDir, filePattern = '**/*') {
    const glob = require('glob');
    const files = glob.sync(filePattern, { cwd: sourceDir });
    
    const results = {
      processed: 0,
      skipped: 0,
      errors: []
    };

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      try {
        const stats = await fs.stat(sourcePath);
        if (stats.isFile()) {
          await this.processTemplateFile(sourcePath, targetPath);
          results.processed++;
        } else if (stats.isDirectory()) {
          await fs.ensureDir(targetPath);
        }
      } catch (error) {
        results.errors.push({ file, error: error.message });
        results.skipped++;
      }
    }

    return results;
  }

  getPathMappings() {
    return {
      sourceToTarget: (sourcePath) => {
        return sourcePath.replace(/^core\//, `${this.ideDir}/`);
      },
      targetToSource: (targetPath) => {
        return targetPath.replace(new RegExp(`^${this.ideDir}/`), 'core/');
      }
    };
  }

  validateTemplateVariables(content) {
    const missingVariables = [];
    const variablePattern = /\{\{([^}]+)\}\}/g;
    let match;
    
    while ((match = variablePattern.exec(content)) !== null) {
      const variable = match[0];
      if (!Object.prototype.hasOwnProperty.call(this.variables, variable)) {
        missingVariables.push(variable);
      }
    }
    
    return {
      isValid: missingVariables.length === 0,
      missingVariables
    };
  }
}

module.exports = { TemplateProcessor };