const { FileManager } = require('../lib/file-manager');
const { TemplateProcessor } = require('../lib/template-processor');
const fs = require('fs-extra');
const path = require('path');

class FilenameMappingTester {
  constructor() {
    this.results = [];
    this.passed = 0;
    this.failed = 0;
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

  async runAllTests() {
    console.log('🧪 开始文件名映射功能测试...\n');
    
    await this.testMemoryFileMapping();
    await this.testFileManagerMapping();
    await this.testTemplateProcessorMapping();
    await this.testInstallationSimulation();
    
    this.printSummary();
  }

  async testMemoryFileMapping() {
    console.log('\n📋 TC-020: memory.md文件映射测试');
    
    // 验证memory.md文件存在
    const memoryFile = path.join(__dirname, '..', 'core', 'memory.md');
    const exists = await fs.pathExists(memoryFile);
    
    this.log(
      'memory.md文件存在',
      exists,
      '应存在',
      exists ? '存在' : '不存在'
    );
    
    if (exists) {
      const content = await fs.readFile(memoryFile, 'utf8');
      this.log(
        'memory.md文件内容',
        content.length > 0,
        '应有内容',
        `${content.length}字节`
      );
    }
  }

  async testFileManagerMapping() {
    console.log('\n📋 TC-021: FileManager文件名映射测试');
    
    const fileManager = new FileManager('/test/source', '/test/target');
    
    // 测试claude模式
    const claudeResult = await fileManager.scanFiles(['claude']);
    const claudeMemoryFile = claudeResult.files.find(f => f.source.includes('memory.md'));
    
    if (claudeMemoryFile) {
      this.log(
        'claude模式memory.md映射',
        claudeMemoryFile.target.endsWith('.claude/CLAUDE.md'),
        '应映射到.claude/CLAUDE.md',
        claudeMemoryFile.target
      );
    }
    
    // 测试iflow模式
    const iflowResult = await fileManager.scanFiles(['iflow']);
    const iflowMemoryFile = iflowResult.files.find(f => f.source.includes('memory.md'));
    
    if (iflowMemoryFile) {
      this.log(
        'iflow模式memory.md映射',
        iflowMemoryFile.target.endsWith('.iflow/IFLOW.md'),
        '应映射到.iflow/IFLOW.md',
        iflowMemoryFile.target
      );
    }
  }

  async testTemplateProcessorMapping() {
    console.log('\n📋 TC-022: 模板处理器文件名映射测试');
    
    const processor = new TemplateProcessor('claude');
    
    // 测试文件名映射
    const testContent = 'This is a test content for memory.md';
    const processed = processor.processTemplate(testContent);
    
    // 验证内容保持不变（文件名映射在FileManager中处理）
    this.log(
      '模板处理器内容处理',
      processed === testContent,
      '内容应保持不变',
      processed
    );
  }

  async testInstallationSimulation() {
    console.log('\n📋 TC-023: 安装模拟测试');
    
    const testDir = path.join(__dirname, 'temp-install-test');
    await fs.ensureDir(testDir);
    
    try {
      const fileManager = new FileManager(
        path.join(__dirname, '..'),
        testDir
      );
      
      // 测试claude模式
      const claudeResult = await fileManager.scanFiles(['claude']);
      const claudeMemory = claudeResult.files.find(f => 
        f.source.includes('memory.md') && f.target.includes('.claude')
      );
      
      if (claudeMemory) {
        this.log(
          'claude安装路径',
          claudeMemory.target.endsWith('.claude/CLAUDE.md'),
          '应安装到.claude/CLAUDE.md',
          claudeMemory.target
        );
      }
      
      // 测试iflow模式
      const iflowResult = await fileManager.scanFiles(['iflow']);
      const iflowMemory = iflowResult.files.find(f => 
        f.source.includes('memory.md') && f.target.includes('.iflow')
      );
      
      if (iflowMemory) {
        this.log(
          'iflow安装路径',
          iflowMemory.target.endsWith('.iflow/IFLOW.md'),
          '应安装到.iflow/IFLOW.md',
          iflowMemory.target
        );
      }
      
    } finally {
      await fs.remove(testDir);
    }
  }

  printSummary() {
    console.log('\n📊 文件名映射测试总结');
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
  const tester = new FilenameMappingTester();
  tester.runAllTests().catch(console.error);
}

module.exports = { FilenameMappingTester };