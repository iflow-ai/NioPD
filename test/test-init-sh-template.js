const { TemplateProcessor } = require('../lib/template-processor');
const fs = require('fs-extra');
const path = require('path');

class InitShTemplateTester {
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
    console.log('🧪 开始init.sh模板处理测试...\n');
    
    await this.testInitShTemplateProcessing();
    
    this.printSummary();
  }

  async testInitShTemplateProcessing() {
    console.log('\n📋 TC-001: init.sh模板处理测试');
    
    // 创建临时测试文件
    const testContent = `#!/bin/bash

# Script to initialize the NioPD system by creating the necessary directory structure.
# Usage: ./init.sh

# --- Check for {{IDE_DIR}} directory ---
if [ ! -d "{{IDE_DIR}}" ]; then
    echo "❌ Error: {{IDE_DIR}} directory not found. This script must be run from the root of a project that contains the {{IDE_DIR}} directory."
    exit 1
fi

echo "🚀 Initializing NioPD System"
echo "============================"
echo ""

# Create data directories
mkdir -p niopd-workspace/initiatives
mkdir -p niopd-workspace/prds
mkdir -p niopd-workspace/reports
mkdir -p niopd-workspace/roadmaps
mkdir -p niopd-workspace/sources

echo "  ✅ Data directories created"

exit 0`;
    
    const testFile = path.join(__dirname, 'temp-init.sh');
    const outputClaudeFile = path.join(__dirname, 'temp-output-claude.sh');
    const outputIflowFile = path.join(__dirname, 'temp-output-iflow.sh');
    
    try {
      // 写入测试文件
      await fs.writeFile(testFile, testContent);
      
      // 测试claude模式
      const claudeProcessor = new TemplateProcessor('claude');
      await claudeProcessor.processTemplateFile(testFile, outputClaudeFile);
      const claudeResult = await fs.readFile(outputClaudeFile, 'utf8');
      
      // 检查claude模式替换结果
      this.log(
        'Claude模式{{IDE_DIR}}替换',
        claudeResult.includes('.claude') && !claudeResult.includes('{{IDE_DIR}}'),
        '所有{{IDE_DIR}}变量替换为.claude',
        claudeResult.includes('.claude') ? '替换成功' : '替换失败'
      );
      
      // 测试iflow模式
      const iflowProcessor = new TemplateProcessor('iflow');
      await iflowProcessor.processTemplateFile(testFile, outputIflowFile);
      const iflowResult = await fs.readFile(outputIflowFile, 'utf8');
      
      // 检查iflow模式替换结果
      this.log(
        'Iflow模式{{IDE_DIR}}替换',
        iflowResult.includes('.iflow') && !iflowResult.includes('{{IDE_DIR}}'),
        '所有{{IDE_DIR}}变量替换为.iflow',
        iflowResult.includes('.iflow') ? '替换成功' : '替换失败'
      );
      
      // 清理测试文件
      await fs.remove(testFile);
      await fs.remove(outputClaudeFile);
      await fs.remove(outputIflowFile);
      
    } catch (error) {
      this.log('init.sh模板处理', false, '无错误', error.message, error);
    }
  }

  printSummary() {
    console.log('\n📊 测试总结');
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
  const tester = new InitShTemplateTester();
  tester.runAllTests().catch(console.error);
}

module.exports = { InitShTemplateTester };