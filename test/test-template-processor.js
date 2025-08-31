const { TemplateProcessor } = require('../lib/template-processor');
const fs = require('fs-extra');
const path = require('path');

class TemplateProcessorTester {
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
    console.log('🧪 开始模板处理引擎测试...\n');
    
    await this.testVariableMapping();
    await this.testPathReplacements();
    await this.testTemplateFileProcessing();
    await this.testErrorHandling();
    
    this.printSummary();
  }

  async testVariableMapping() {
    console.log('\n📋 TC-001: 变量映射测试');
    
    // 测试claude模式
    const claudeProcessor = new TemplateProcessor('claude');
    const claudeVars = claudeProcessor.variables;
    
    this.log(
      'claude模式IDE_DIR',
      claudeVars['{{IDE_DIR}}'] === '.claude',
      '.claude',
      claudeVars['{{IDE_DIR}}']
    );
    
    this.log(
      'claude模式SCRIPTS_DIR',
      claudeVars['{{SCRIPTS_DIR}}'] === '.claude/scripts/NioPD',
      '.claude/scripts/NioPD',
      claudeVars['{{SCRIPTS_DIR}}']
    );
    
    // 测试iflow模式
    const iflowProcessor = new TemplateProcessor('iflow');
    const iflowVars = iflowProcessor.variables;
    
    this.log(
      'iflow模式IDE_DIR',
      iflowVars['{{IDE_DIR}}'] === '.iflow',
      '.iflow',
      iflowVars['{{IDE_DIR}}']
    );
    
    this.log(
      'iflow模式SCRIPTS_DIR',
      iflowVars['{{SCRIPTS_DIR}}'] === '.iflow/scripts/NioPD',
      '.iflow/scripts/NioPD',
      iflowVars['{{SCRIPTS_DIR}}']
    );
  }

  async testPathReplacements() {
    console.log('\n📋 TC-002: 路径替换测试');
    
    const testCases = [
      {
        name: '脚本路径替换',
        input: 'Bash(.claude/scripts/NioPD/init.sh:*)',
        expected: { claude: 'Bash(.claude/scripts/NioPD/init.sh:*)', iflow: 'Bash(.iflow/scripts/NioPD/init.sh:*)' }
      },
      {
        name: '命令路径替换',
        input: '.claude/commands/NioPD/init.md',
        expected: { claude: '.claude/commands/NioPD/init.md', iflow: '.iflow/commands/NioPD/init.md' }
      },
      {
        name: '代理路径替换',
        input: 'Read from .claude/agents/NioPD/competitor-analyzer.md',
        expected: { claude: 'Read from .claude/agents/NioPD/competitor-analyzer.md', iflow: 'Read from .iflow/agents/NioPD/competitor-analyzer.md' }
      },
      {
        name: '基础目录替换',
        input: 'if [ ! -d ".claude" ]; then',
        expected: { claude: 'if [ ! -d ".claude" ]; then', iflow: 'if [ ! -d ".iflow" ]; then' }
      },
      {
        name: '引号内路径替换',
        input: 'path=".claude/scripts/"',
        expected: { claude: 'path=".claude/scripts/"', iflow: 'path=".iflow/scripts/"' }
      }
    ];
    
    testCases.forEach(testCase => {
      const claudeProcessor = new TemplateProcessor('claude');
      const iflowProcessor = new TemplateProcessor('iflow');
      
      const claudeResult = claudeProcessor.processTemplate(testCase.input);
      const iflowResult = iflowProcessor.processTemplate(testCase.input);
      
      this.log(
        `${testCase.name} - claude模式`,
        claudeResult === testCase.expected.claude,
        testCase.expected.claude,
        claudeResult
      );
      
      this.log(
        `${testCase.name} - iflow模式`,
        iflowResult === testCase.expected.iflow,
        testCase.expected.iflow,
        iflowResult
      );
    });
  }

  async testTemplateFileProcessing() {
    console.log('\n📋 TC-003: 模板文件处理测试');
    
    const testContent = `---
allowed-tools: Bash({{SCRIPTS_DIR}}/test.sh:*)
description: Test command
---

Check {{IDE_DIR}} directory and {{TEMPLATES_DIR}}/template.md`;
    
    const testFile = path.join(__dirname, 'temp-test.md.template');
    const outputFile = path.join(__dirname, 'temp-output.md');
    
    try {
      await fs.writeFile(testFile, testContent);
      
      const processor = new TemplateProcessor('iflow');
      await processor.processTemplateFile(testFile, outputFile);
      
      const result = await fs.readFile(outputFile, 'utf8');
      
      this.log(
        '模板变量替换',
        result.includes('.iflow/scripts/NioPD/test.sh') && 
        result.includes('.iflow/') && 
        result.includes('.iflow/templates/template.md'),
        '所有变量正确替换为iflow路径',
        result
      );
      
      // 清理测试文件
      await fs.remove(testFile);
      await fs.remove(outputFile);
      
    } catch (error) {
      this.log('模板文件处理', false, '无错误', error.message, error);
    }
  }

  async testErrorHandling() {
    console.log('\n📋 TC-004: 错误处理测试');
    
    const processor = new TemplateProcessor('test');
    
    // 测试无效IDE类型
    try {
      processor.setIdeType('invalid');
      this.log('无效IDE类型处理', false, '应抛出错误', '未抛出错误');
    } catch (error) {
      this.log('无效IDE类型处理', true, '抛出错误', error.message);
    }
    
    // 测试文件不存在
    try {
      await processor.processTemplateFile('/nonexistent/file.md', '/output/file.md');
      this.log('文件不存在处理', false, '应抛出错误', '未抛出错误');
    } catch (error) {
      this.log('文件不存在处理', true, '抛出错误', '文件操作错误');
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
  const tester = new TemplateProcessorTester();
  tester.runAllTests().catch(console.error);
}

module.exports = { TemplateProcessorTester };