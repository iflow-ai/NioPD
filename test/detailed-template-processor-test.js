const { TemplateProcessor } = require('../lib/template-processor');
const fs = require('fs-extra');
const path = require('path');

class DetailedTemplateProcessorTester {
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
    console.log('🧪 开始详细模板处理引擎测试...\n');
    
    await this.testClaudeModeComprehensive();
    await this.testIflowModeComprehensive();
    await this.testInitShTemplateProcessing();
    await this.testPathReplacements();
    await this.testVariableMapping();
    await this.testErrorHandling();
    
    this.printSummary();
  }

  async testClaudeModeComprehensive() {
    console.log('\n📋 TC-001: Claude模式综合测试');
    
    const processor = new TemplateProcessor('claude');
    
    // 测试init.sh文件处理
    const initShContent = `#!/bin/bash
if [ ! -d "{{IDE_DIR}}" ]; then
    echo "Error: {{IDE_DIR}} directory not found."
fi
mkdir -p {{SCRIPTS_DIR}}/test`;
    
    const processed = processor.processTemplate(initShContent);
    const expected = `#!/bin/bash
if [ ! -d ".claude" ]; then
    echo "Error: .claude directory not found."
fi
mkdir -p .claude/scripts/niopd/test`;
    
    this.log(
      'Claude模式init.sh处理',
      processed === expected,
      expected,
      processed
    );
  }

  async testIflowModeComprehensive() {
    console.log('\n📋 TC-002: iFlow模式综合测试');
    
    const processor = new TemplateProcessor('iflow');
    
    // 测试init.sh文件处理
    const initShContent = `#!/bin/bash
if [ ! -d "{{IDE_DIR}}" ]; then
    echo "Error: {{IDE_DIR}} directory not found."
fi
mkdir -p {{SCRIPTS_DIR}}/test`;
    
    const processed = processor.processTemplate(initShContent);
    const expected = `#!/bin/bash
if [ ! -d ".iflow" ]; then
    echo "Error: .iflow directory not found."
fi
mkdir -p .iflow/scripts/niopd/test`;
    
    this.log(
      'iFlow模式init.sh处理',
      processed === expected,
      expected,
      processed
    );
  }

  async testInitShTemplateProcessing() {
    console.log('\n📋 TC-003: init.sh模板处理测试');
    
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

  async testPathReplacements() {
    console.log('\n📋 TC-004: 路径替换测试');
    
    const testCases = [
      {
        name: '脚本路径替换-claude',
        ide: 'claude',
        input: 'Bash(.claude/scripts/niopd/init.sh:*)',
        expected: 'Bash(.claude/scripts/niopd/init.sh:*)'
      },
      {
        name: '脚本路径替换-iflow',
        ide: 'iflow',
        input: 'Bash(.claude/scripts/niopd/init.sh:*)',
        expected: 'Bash(.iflow/scripts/niopd/init.sh:*)'
      },
      {
        name: '命令路径替换-claude',
        ide: 'claude',
        input: '.claude/commands/niopd/init.md',
        expected: '.claude/commands/niopd/init.md'
      },
      {
        name: '命令路径替换-iflow',
        ide: 'iflow',
        input: '.claude/commands/niopd/init.md',
        expected: '.iflow/commands/niopd/init.md'
      },
      {
        name: '代理路径替换-claude',
        ide: 'claude',
        input: 'Read from .claude/agents/niopd/competitor-analyzer.md',
        expected: 'Read from .claude/agents/niopd/competitor-analyzer.md'
      },
      {
        name: '代理路径替换-iflow',
        ide: 'iflow',
        input: 'Read from .claude/agents/niopd/competitor-analyzer.md',
        expected: 'Read from .iflow/agents/niopd/competitor-analyzer.md'
      }
    ];
    
    testCases.forEach(testCase => {
      const processor = new TemplateProcessor(testCase.ide);
      const result = processor.processTemplate(testCase.input);
      
      this.log(
        testCase.name,
        result === testCase.expected,
        testCase.expected,
        result
      );
    });
  }

  async testVariableMapping() {
    console.log('\n📋 TC-005: 变量映射测试');
    
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
      claudeVars['{{SCRIPTS_DIR}}'] === '.claude/scripts/niopd',
      '.claude/scripts/niopd',
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
      iflowVars['{{SCRIPTS_DIR}}'] === '.iflow/scripts/niopd',
      '.iflow/scripts/niopd',
      iflowVars['{{SCRIPTS_DIR}}']
    );
  }

  async testErrorHandling() {
    console.log('\n📋 TC-006: 错误处理测试');
    
    // 测试无效IDE类型
    try {
      const processor = new TemplateProcessor('invalid');
      this.log('无效IDE类型处理', false, '应抛出错误', '未抛出错误');
    } catch (error) {
      this.log('无效IDE类型处理', true, '抛出错误', error.message);
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
  const tester = new DetailedTemplateProcessorTester();
  tester.runAllTests().catch(console.error);
}

module.exports = { DetailedTemplateProcessorTester };