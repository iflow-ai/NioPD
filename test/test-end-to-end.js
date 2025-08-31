const { TemplateProcessor } = require('../lib/template-processor');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

class EndToEndTester {
  constructor() {
    this.results = [];
    this.passed = 0;
    this.failed = 0;
    this.testDir = path.join(os.tmpdir(), 'niopd-end-to-end-test');
  }

  log(testName, passed, expected, actual, error = null) {
    const result = {
      test: testName,
      passed,
      expected,
      actual,
      error: error?.message || null
    };
    
    this.results.push(result);
    if (passed) this.passed++;
    else this.failed++;
    
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${testName}`);
    if (!passed) {
      console.log(`   预期: ${expected}`);
      console.log(`   实际: ${actual}`);
      if (error) console.log(`   错误: ${error.message}`);
    }
  }

  async setup() {
    await fs.ensureDir(this.testDir);
  }

  async cleanup() {
    await fs.remove(this.testDir);
  }

  async runAllTests() {
    console.log('🧪 开始端到端安装流程测试...\n');
    
    await this.setup();
    
    try {
      await this.testCompleteInstallation('claude');
      await this.testCompleteInstallation('iflow');
      await this.testDualInstallation();
      await this.testInstallationValidation();
    } finally {
      await this.cleanup();
    }
    
    this.printSummary();
  }

  async testCompleteInstallation(ideType) {
    console.log(`\n📋 TC-017: ${ideType}模式完整安装测试`);
    
    const installDir = path.join(this.testDir, `install-${ideType}`);
    const processor = new TemplateProcessor(ideType);
    
    try {
      // 模拟完整安装流程
      const sourceDirs = [
        { source: 'core/commands/NioPD', target: `${ideType}/commands/NioPD`, pattern: '*.md.template' },
        { source: 'core/scripts/NioPD', target: `${ideType}/scripts/NioPD`, pattern: '*.sh.template' },
        { source: 'core/agents/NioPD', target: `${ideType}/agents/NioPD`, pattern: '*.md' },
        { source: 'core/templates', target: `${ideType}/templates`, pattern: '*.md' }
      ];
      
      let totalProcessed = 0;
      
      for (const dirConfig of sourceDirs) {
        const sourcePath = path.join(__dirname, '..', dirConfig.source);
        const targetPath = path.join(installDir, dirConfig.target);
        
        if (await fs.pathExists(sourcePath)) {
          const result = await processor.processTemplateDirectory(sourcePath, targetPath, dirConfig.pattern);
          totalProcessed += result.processed;
        }
      }
      
      // 验证安装结果
      const expectedDirs = [
        `${ideType}/commands/NioPD`,
        `${ideType}/scripts/NioPD`,
        `${ideType}/agents/NioPD`,
        `${ideType}/templates`
      ];
      
      let allDirsExist = true;
      for (const expectedDir of expectedDirs) {
        const dirPath = path.join(installDir, expectedDir);
        const exists = await fs.pathExists(dirPath);
        
        this.log(
          `${ideType} ${expectedDir}目录`,
          exists,
          '应存在',
          exists ? '存在' : '不存在'
        );
        
        if (!exists) allDirsExist = false;
      }
      
      this.log(
        `${ideType}完整安装`,
        totalProcessed > 0 && allDirsExist,
        '应处理文件且所有目录存在',
        `处理: ${totalProcessed}个文件, 目录: ${allDirsExist}`
      );
      
      // 验证文件内容
      if (allDirsExist) {
        await this.validateInstallationContent(installDir, ideType);
      }
      
    } catch (error) {
      this.log(`${ideType}完整安装`, false, '无错误', error.message, error);
    }
  }

  async testDualInstallation() {
    console.log('\n📋 TC-018: 双IDE同时安装测试');
    
    const installDir = path.join(this.testDir, 'dual-install');
    const ides = ['claude', 'iflow'];
    
    try {
      let totalProcessed = 0;
      
      for (const ideType of ides) {
        const processor = new TemplateProcessor(ideType);
        
        // 处理命令文件
        const sourcePath = path.join(__dirname, '..', 'core', 'commands', 'NioPD');
        const targetPath = path.join(installDir, ideType, 'commands', 'NioPD');
        
        if (await fs.pathExists(sourcePath)) {
          const result = await processor.processTemplateDirectory(sourcePath, targetPath, '*.md.template');
          totalProcessed += result.processed;
        }
      }
      
      // 验证两个IDE目录都存在
      const claudeExists = await fs.pathExists(path.join(installDir, 'claude'));
      const iflowExists = await fs.pathExists(path.join(installDir, 'iflow'));
      
      this.log(
        '双IDE目录创建',
        claudeExists && iflowExists && totalProcessed > 0,
        '应同时创建claude和iflow目录',
        `claude: ${claudeExists}, iflow: ${iflowExists}, 处理: ${totalProcessed}`
      );
      
      // 验证内容不冲突
      if (claudeExists && iflowExists) {
        await this.validateNoPathConflicts(installDir);
      }
      
    } catch (error) {
      this.log('双IDE安装', false, '无错误', error.message, error);
    }
  }

  async testInstallationValidation() {
    console.log('\n📋 TC-019: 安装验证测试');
    
    const installDir = path.join(this.testDir, 'validation-test');
    const processor = new TemplateProcessor('iflow');
    
    try {
      // 安装核心文件
      const sourcePath = path.join(__dirname, '..', 'core', 'commands', 'NioPD');
      const targetPath = path.join(installDir, 'iflow', 'commands', 'NioPD');
      
      await processor.processTemplateDirectory(sourcePath, targetPath, '*.md.template');
      
      // 验证关键文件
      const keyFiles = [
        'iflow/commands/NioPD/init.md',
        'iflow/commands/NioPD/analyze-competitor.md',
        'iflow/commands/NioPD/draft-prd.md'
      ];
      
      let allFilesValid = true;
      
      for (const keyFile of keyFiles) {
        const filePath = path.join(installDir, keyFile);
        const exists = await fs.pathExists(filePath);
        
        if (exists) {
          const content = await fs.readFile(filePath, 'utf8');
          const hasIflowPaths = content.includes('.iflow/');
          const hasClaudePaths = content.includes('.claude/');
          const hasTemplateVars = content.includes('{{');
          
          const isValid = hasIflowPaths && !hasClaudePaths && !hasTemplateVars;
          
          this.log(
            `${keyFile}验证`,
            isValid,
            '应包含.iflow路径，不包含.claude和模板变量',
            `iflow: ${hasIflowPaths}, claude: ${hasClaudePaths}, vars: ${hasTemplateVars}`
          );
          
          if (!isValid) allFilesValid = false;
        } else {
          this.log(`${keyFile}存在`, false, '应存在', '不存在');
          allFilesValid = false;
        }
      }
      
      this.log(
        '安装验证',
        allFilesValid,
        '所有关键文件应验证通过',
        allFilesValid ? '全部通过' : '部分失败'
      );
      
    } catch (error) {
      this.log('安装验证', false, '无错误', error.message, error);
    }
  }

  async validateInstallationContent(installDir, ideType) {
    // 验证安装后的文件内容
    const commandsDir = path.join(installDir, ideType, 'commands', 'NioPD');
    
    if (await fs.pathExists(commandsDir)) {
      const files = await fs.readdir(commandsDir);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(commandsDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          const hasCorrectPaths = content.includes(`.${ideType}/`);
          const hasWrongPaths = ideType === 'claude' ? content.includes('.iflow/') : content.includes('.claude/');
          
          this.log(
            `${ideType}/${file}内容验证`,
            hasCorrectPaths && !hasWrongPaths,
            `应包含.${ideType}路径，不包含其他IDE路径`,
            `${ideType}: ${hasCorrectPaths}, 错误: ${hasWrongPaths}`
          );
        }
      }
    }
  }

  async validateNoPathConflicts(installDir) {
    // 验证claude和iflow目录内容不冲突
    const claudeCommands = path.join(installDir, 'claude', 'commands', 'NioPD');
    const iflowCommands = path.join(installDir, 'iflow', 'commands', 'NioPD');
    
    if (await fs.pathExists(claudeCommands) && await fs.pathExists(iflowCommands)) {
      const claudeFiles = await fs.readdir(claudeCommands);
      const iflowFiles = await fs.readdir(iflowCommands);
      
      // 验证文件数量一致
      this.log(
        '双IDE文件数量一致',
        claudeFiles.length === iflowFiles.length,
        '两个IDE应有相同数量的文件',
        `claude: ${claudeFiles.length}, iflow: ${iflowFiles.length}`
      );
      
      // 验证路径不冲突
      for (const file of claudeFiles) {
        const claudeContent = await fs.readFile(path.join(claudeCommands, file), 'utf8');
        const iflowContent = await fs.readFile(path.join(iflowCommands, file), 'utf8');
        
        const claudeHasClaude = claudeContent.includes('.claude/');
        const claudeHasIflow = claudeContent.includes('.iflow/');
        const iflowHasClaude = iflowContent.includes('.claude/');
        const iflowHasIflow = iflowContent.includes('.iflow/');
        
        this.log(
          `${file}路径隔离`,
          claudeHasClaude && !claudeHasIflow && !iflowHasClaude && iflowHasIflow,
          'claude文件应只包含claude路径，iflow文件应只包含iflow路径',
          `claude: ${claudeHasClaude}/${claudeHasIflow}, iflow: ${iflowHasClaude}/${iflowHasIflow}`
        );
      }
    }
  }

  printSummary() {
    console.log('\n📊 端到端安装测试总结');
    console.log(`✅ 通过: ${this.passed}`);
    console.log(`❌ 失败: ${this.failed}`);
    console.log(`📈 成功率: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
    
    if (this.failed > 0) {
      console.log('\n❌ 失败的测试:');
      this.results.filter(r => !r.passed).forEach(r => {
        console.log(`   - ${r.test}: ${r.error || '结果不匹配'}`);
      });
    }
  }
}

// 运行测试
if (require.main === module) {
  const tester = new EndToEndTester();
  tester.runAllTests().catch(console.error);
}

module.exports = { EndToEndTester };