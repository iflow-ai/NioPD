const { TemplateProcessor } = require('../lib/template-processor');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

class InstallerIntegrationTester {
  constructor() {
    this.results = [];
    this.passed = 0;
    this.failed = 0;
    this.testDir = path.join(os.tmpdir(), 'niopd-installer-test');
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
    console.log('🧪 开始安装器集成模板处理测试...\n');
    
    await this.setup();
    
    try {
      await this.testTemplateDirectoryProcessing();
      await this.testMultiIdeProcessing();
      await this.testFileCopyIntegration();
      await this.testInstallationPaths();
    } finally {
      await this.cleanup();
    }
    
    this.printSummary();
  }

  async testTemplateDirectoryProcessing() {
    console.log('\n📋 TC-013: 模板目录处理测试');
    
    const processor = new TemplateProcessor('iflow');
    const sourceDir = path.join(__dirname, '..', 'core', 'commands', 'NioPD');
    const targetDir = path.join(this.testDir, 'iflow', 'commands', 'NioPD');
    
    try {
      const result = await processor.processTemplateDirectory(sourceDir, targetDir, '*.md.template');
      
      // 验证处理结果
      const processedFiles = await fs.readdir(targetDir);
      const expectedFiles = ['init.md', 'analyze-competitor.md', 'draft-prd.md'];
      
      let allFilesExist = true;
      for (const expectedFile of expectedFiles) {
        const filePath = path.join(targetDir, expectedFile);
        if (!await fs.pathExists(filePath)) {
          allFilesExist = false;
          break;
        }
        
        // 验证文件内容
        const content = await fs.readFile(filePath, 'utf8');
        const hasIflowPaths = content.includes('.iflow/');
        const hasTemplateVars = content.includes('{{');
        
        this.log(
          `${expectedFile}内容验证`,
          hasIflowPaths && !hasTemplateVars,
          '应包含.iflow路径，不包含模板变量',
          `iflow: ${hasIflowPaths}, vars: ${hasTemplateVars}`
        );
      }
      
      this.log(
        '目录处理完成',
        result.processed > 0 && allFilesExist,
        '应处理文件且目标文件存在',
        `处理: ${result.processed}, 错误: ${result.errors.length}`
      );
      
    } catch (error) {
      this.log('目录处理', false, '无错误', error.message, error);
    }
  }

  async testMultiIdeProcessing() {
    console.log('\n📋 TC-014: 多IDE同时处理测试');
    
    const ides = ['claude', 'iflow'];
    
    for (const ide of ides) {
      const processor = new TemplateProcessor(ide);
      const sourceDir = path.join(__dirname, '..', 'core', 'commands', 'NioPD');
      const targetDir = path.join(this.testDir, ide, 'commands', 'NioPD');
      
      try {
        await processor.processTemplateDirectory(sourceDir, targetDir, '*.md.template');
        
        // 验证目录存在
        const exists = await fs.pathExists(targetDir);
        
        this.log(
          `${ide}目录创建`,
          exists,
          `应创建${ide}目录`,
          exists ? '已创建' : '未创建'
        );
        
        if (exists) {
          const files = await fs.readdir(targetDir);
          this.log(
            `${ide}文件数量`,
            files.length > 0,
            '应包含处理后的文件',
            `${files.length}个文件`
          );
        }
        
      } catch (error) {
        this.log(`${ide}处理`, false, '无错误', error.message, error);
      }
    }
  }

  async testFileCopyIntegration() {
    console.log('\n📋 TC-015: 文件复制集成测试');
    
    const processor = new TemplateProcessor('iflow');
    const sourceDir = path.join(__dirname, '..', 'core', 'agents', 'NioPD');
    const targetDir = path.join(this.testDir, 'iflow', 'agents', 'NioPD');
    
    try {
      await processor.processTemplateDirectory(sourceDir, targetDir, '*.md');
      
      // 验证文件权限和内容
      const files = await fs.readdir(targetDir);
      
      for (const file of files) {
        const filePath = path.join(targetDir, file);
        const stats = await fs.stat(filePath);
        
        this.log(
          `${file}文件权限`,
          stats.isFile(),
          '应为普通文件',
          stats.isFile() ? '是文件' : '不是文件'
        );
        
        if (stats.isFile()) {
          const content = await fs.readFile(filePath, 'utf8');
          const size = content.length;
          
          this.log(
            `${file}文件大小`,
            size > 0,
            '应有内容',
            `${size}字节`
          );
        }
      }
      
    } catch (error) {
      this.log('文件复制集成', false, '无错误', error.message, error);
    }
  }

  async testInstallationPaths() {
    console.log('\n📋 TC-016: 安装路径验证测试');
    
    const testCases = [
      {
        ide: 'claude',
        expectedPaths: {
          scripts: '.claude/scripts/NioPD',
          commands: '.claude/commands/NioPD',
          agents: '.claude/agents/NioPD'
        }
      },
      {
        ide: 'iflow',
        expectedPaths: {
          scripts: '.iflow/scripts/NioPD',
          commands: '.iflow/commands/NioPD',
          agents: '.iflow/agents/NioPD'
        }
      }
    ];
    
    for (const testCase of testCases) {
      const processor = new TemplateProcessor(testCase.ide);
      
      Object.entries(testCase.expectedPaths).forEach(([type, expectedPath]) => {
        const actualPath = processor.variables[`{{${type.toUpperCase()}_DIR}}`];
        
        this.log(
          `${testCase.ide} ${type}路径`,
          actualPath === expectedPath,
          expectedPath,
          actualPath
        );
      });
    }
  }

  printSummary() {
    console.log('\n📊 安装器集成测试总结');
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
  const tester = new InstallerIntegrationTester();
  tester.runAllTests().catch(console.error);
}

module.exports = { InstallerIntegrationTester };