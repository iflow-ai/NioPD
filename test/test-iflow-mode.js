const { TemplateProcessor } = require('../lib/template-processor');
const fs = require('fs-extra');
const path = require('path');

class IflowModeTester {
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
    console.log('🧪 开始iFlow模式路径替换测试...\n');
    
    await this.testTemplateProcessing();
    await this.testPathGeneration();
    await this.testDirectoryStructure();
    await this.testInstallationSimulation();
    
    this.printSummary();
  }

  async testTemplateProcessing() {
    console.log('\n📋 TC-009: iFlow模式模板处理测试');
    
    const processor = new TemplateProcessor('iflow');
    
    // 测试模板变量替换
    const testTemplate = 'Check {{SCRIPTS_DIR}}/test.sh and {{IDE_DIR}}/directory';
    const processed = processor.processTemplate(testTemplate);
    
    const expectedIflow = 'Check .iflow/scripts/niopd/test.sh and .iflow/directory';
    
    this.log(
      '模板变量iflow模式替换',
      processed === expectedIflow,
      expectedIflow,
      processed
    );
  }

  async testPathGeneration() {
    console.log('\n📋 TC-010: iFlow模式路径生成测试');
    
    const processor = new TemplateProcessor('iflow');
    const mappings = processor.getPathMappings();
    
    // 测试sourceToTarget映射
    const sourcePath = 'core/commands/niopd/init.md';
    const expectedTarget = '.iflow/commands/niopd/init.md';
    const actualTarget = mappings.sourceToTarget(sourcePath);
    
    this.log(
      'sourceToTarget映射',
      actualTarget === expectedTarget,
      expectedTarget,
      actualTarget
    );
    
    // 测试targetToSource映射
    const targetPath = '.iflow/commands/niopd/init.md';
    const expectedSource = 'core/commands/niopd/init.md';
    const actualSource = mappings.targetToSource(targetPath);
    
    this.log(
      'targetToSource映射',
      actualSource === expectedSource,
      expectedSource,
      actualSource
    );
  }

  async testDirectoryStructure() {
    console.log('\n📋 TC-011: iFlow模式目录结构测试');
    
    const processor = new TemplateProcessor('iflow');
    const expectedPaths = {
      scripts: '.iflow/scripts/niopd',
      commands: '.iflow/commands/niopd',
      agents: '.iflow/agents/niopd',
      templates: '.iflow/templates'
    };
    
    Object.entries(expectedPaths).forEach(([type, expectedPath]) => {
      const actualPath = processor.variables[`{{${type.toUpperCase()}_DIR}}`];
      
      this.log(
        `${type}目录路径`,
        actualPath === expectedPath,
        expectedPath,
        actualPath
      );
    });
  }

  async testInstallationSimulation() {
    console.log('\n📋 TC-012: iFlow模式安装模拟测试');
    
    const processor = new TemplateProcessor('iflow');
    
    // 模拟安装过程
    const testFiles = [
      {
        name: 'init.md',
        original: 'allowed-tools: Bash(.claude/scripts/niopd/init.sh:*)',
        expected: 'allowed-tools: Bash(.iflow/scripts/niopd/init.sh:*)'
      },
      {
        name: 'analyze-competitor.md',
        original: 'Read instructions from .claude/agents/niopd/competitor-analyzer.md',
        expected: 'Read instructions from .iflow/agents/niopd/competitor-analyzer.md'
      }
    ];
    
    testFiles.forEach(file => {
      const processed = processor.processTemplate(file.original);
      
      this.log(
        `${file.name}安装路径`,
        processed === file.expected,
        file.expected,
        processed
      );
    });
  }

  printSummary() {
    console.log('\n📊 iFlow模式测试总结');
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
  const tester = new IflowModeTester();
  tester.runAllTests().catch(console.error);
}

module.exports = { IflowModeTester };