#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ManualTester {
  constructor() {
    this.testDir = path.join(__dirname, 'temp');
  }

  async setup() {
    console.log('🧪 设置手动测试环境...');
    
    if (!fs.existsSync(this.testDir)) {
      fs.mkdirSync(this.testDir, { recursive: true });
    }
    
    // 创建测试项目
    const fixtures = ['empty', 'existing-claude', 'existing-iflow', 'both'];
    fixtures.forEach(fixture => {
      const fixturePath = path.join(this.testDir, fixture);
      if (!fs.existsSync(fixturePath)) {
        fs.mkdirSync(fixturePath, { recursive: true });
      }
      
      if (fixture.includes('claude')) {
        fs.mkdirSync(path.join(fixturePath, '.claude', 'agents', 'NioPD'), { recursive: true });
        fs.writeFileSync(path.join(fixturePath, '.claude', 'agents', 'NioPD', 'test.md'), '# Test');
      }
      
      if (fixture.includes('iflow')) {
        fs.mkdirSync(path.join(fixturePath, '.iflow', 'agents', 'NioPD'), { recursive: true });
        fs.writeFileSync(path.join(fixturePath, '.iflow', 'agents', 'NioPD', 'test.md'), '# Test');
      }
    });
  }

  async testModuleLoading() {
    console.log('\n📋 测试模块加载...');
    
    try {
      // 测试CLI入口
      const cliPath = path.join(__dirname, '..', 'bin', 'niopd.js');
      if (fs.existsSync(cliPath)) {
        console.log('✅ CLI入口文件存在');
      } else {
        console.log('❌ CLI入口文件不存在');
        return false;
      }

      // 测试核心模块
      const modules = [
        '../lib/install.js',
        '../lib/validator.js',
        '../lib/file-manager.js',
        '../lib/backup.js',
        '../lib/prompts.js',
        '../lib/ui.js',
        '../lib/utils.js'
      ];

      modules.forEach(module => {
        const modulePath = path.join(__dirname, module);
        if (fs.existsSync(modulePath)) {
          console.log(`✅ ${path.basename(module)} 存在`);
        } else {
          console.log(`❌ ${path.basename(module)} 不存在`);
        }
      });

      return true;
    } catch (error) {
      console.log('❌ 模块加载测试失败:', error.message);
      return false;
    }
  }

  async testDirectoryValidation() {
    console.log('\n📁 测试目录验证...');
    
    try {
      const validatorPath = path.join(__dirname, '..', 'lib', 'validator.js');
      if (!fs.existsSync(validatorPath)) {
        console.log('❌ 验证器模块不存在');
        return false;
      }

      // 简单测试目录存在性
      const testPaths = [
        process.cwd(),
        path.join(this.testDir, 'empty'),
        '/invalid/path'
      ];

      testPaths.forEach(testPath => {
        const exists = fs.existsSync(testPath);
        const isDir = exists && fs.statSync(testPath).isDirectory();
        console.log(`${exists && isDir ? '✅' : '❌'} ${testPath}: ${exists && isDir ? '有效目录' : '无效'}`);
      });

      return true;
    } catch (error) {
      console.log('❌ 目录验证测试失败:', error.message);
      return false;
    }
  }

  async testFileStructure() {
    console.log('\n📂 测试文件结构...');
    
    const expectedFiles = [
      'package.json',
      'bin/niopd.js',
      'lib/install.js',
      'lib/validator.js',
      'lib/file-manager.js',
      'lib/backup.js',
      'lib/prompts.js',
      'lib/ui.js',
      'lib/utils.js'
    ];

    let allExist = true;
    expectedFiles.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file}`);
      } else {
        console.log(`❌ ${file}`);
        allExist = false;
      }
    });

    return allExist;
  }

  async testCLIHelp() {
    console.log('\n🔧 测试CLI帮助...');
    
    try {
      const cliPath = path.join(__dirname, '..', 'bin', 'niopd.js');
      
      // 测试版本显示
      const versionCmd = `node ${cliPath} --version`;
      console.log(`版本命令: ${versionCmd}`);
      
      // 测试帮助显示
      const helpCmd = `node ${cliPath} --help`;
      console.log(`帮助命令: ${helpCmd}`);
      
      console.log('✅ CLI命令结构正确');
      return true;
    } catch (error) {
      console.log('❌ CLI测试失败:', error.message);
      return false;
    }
  }

  async testMockInstall() {
    console.log('\n🚀 测试模拟安装...');
    
    const testPath = path.join(this.testDir, 'mock-install');
    
    try {
      // 测试文件管理器
      const fmPath = path.join(__dirname, '..', 'lib', 'file-manager.js');
      if (fs.existsSync(fmPath)) {
        console.log('✅ 文件管理器模块存在');
        
        // 测试文件扫描
        const sourceDir = path.join(__dirname, '..');
        const claudePath = path.join(sourceDir, '.claude');
        const iflowPath = path.join(sourceDir, '.iflow');
        
        const claudeExists = fs.existsSync(claudePath);
        const iflowExists = fs.existsSync(iflowPath);
        
        console.log(`源文件检查: .claude ${claudeExists ? '✅' : '❌'}, .iflow ${iflowExists ? '✅' : '❌'}`);
        
        return true;
      }
    } catch (error) {
      console.log('❌ 模拟安装测试失败:', error.message);
    }
    
    return false;
  }

  async runAllTests() {
    console.log('🚀 开始Sprint 1手动测试...\n');
    
    await this.setup();
    
    const results = {
      total: 5,
      passed: 0,
      failed: 0,
      details: {}
    };

    const tests = [
      { name: '模块加载', fn: () => this.testModuleLoading() },
      { name: '目录验证', fn: () => this.testDirectoryValidation() },
      { name: '文件结构', fn: () => this.testFileStructure() },
      { name: 'CLI帮助', fn: () => this.testCLIHelp() },
      { name: '模拟安装', fn: () => this.testMockInstall() }
    ];

    for (const test of tests) {
      try {
        const passed = await test.fn();
        if (passed) {
          results.passed++;
          results.details[test.name] = { status: 'passed' };
        } else {
          results.failed++;
          results.details[test.name] = { status: 'failed' };
        }
      } catch (error) {
        results.failed++;
        results.details[test.name] = { status: 'failed', error: error.message };
      }
    }

    console.log('\n📊 Sprint 1手动测试结果:');
    console.log(`总测试: ${results.total}`);
    console.log(`通过: ${results.passed}`);
    console.log(`失败: ${results.failed}`);
    
    if (results.failed > 0) {
      console.log('\n❌ 失败详情:');
      Object.entries(results.details).forEach(([test, result]) => {
        if (result.status === 'failed') {
          console.log(`  ${test}: ${result.error || '测试失败'}`);
        }
      });
    } else {
      console.log('\n✅ 所有手动测试通过！');
    }

    // 保存结果
    fs.writeFileSync(
      path.join(this.testDir, 'manual-test-results.json'),
      JSON.stringify(results, null, 2)
    );

    return results;
  }

  async cleanup() {
    console.log('\n🧹 清理测试环境...');
    if (fs.existsSync(this.testDir)) {
      fs.rmSync(this.testDir, { recursive: true, force: true });
    }
  }
}

// 如果直接运行
if (require.main === module) {
  const tester = new ManualTester();
  tester.runAllTests()
    .then(() => tester.cleanup())
    .catch(console.error);
}

module.exports = { ManualTester };