#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

class Sprint1Tester {
  constructor() {
    this.testDir = path.join(__dirname, 'temp');
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      details: {}
    };
  }

  async setup() {
    console.log('🧪 设置测试环境...');
    await fs.ensureDir(this.testDir);
    
    // 创建测试项目结构
    const fixtures = [
      'empty-project',
      'existing-claude',
      'existing-iflow',
      'both-ides',
      'large-project'
    ];

    for (const fixture of fixtures) {
      const fixturePath = path.join(this.testDir, fixture);
      await fs.ensureDir(fixturePath);
      
      if (fixture.includes('claude')) {
        await this.createMockClaude(fixturePath);
      }
      if (fixture.includes('iflow')) {
        await this.createMockIFlow(fixturePath);
      }
    }
  }

  async createMockClaude(dirPath) {
    const claudePath = path.join(dirPath, '.claude');
    await fs.ensureDir(path.join(claudePath, 'agents', 'NioPD'));
    await fs.ensureDir(path.join(claudePath, 'commands', 'NioPD'));
    await fs.ensureDir(path.join(claudePath, 'scripts', 'NioPD'));
    await fs.ensureDir(path.join(claudePath, 'templates'));
    
    await fs.writeFile(path.join(claudePath, 'agents', 'NioPD', 'test-agent.md'), '# Test Agent');
    await fs.writeFile(path.join(claudePath, 'commands', 'NioPD', 'test-command.md'), '# Test Command');
  }

  async createMockIFlow(dirPath) {
    const iflowPath = path.join(dirPath, '.iflow');
    await fs.ensureDir(path.join(iflowPath, 'agents', 'NioPD'));
    await fs.ensureDir(path.join(iflowPath, 'commands', 'NioPD'));
    await fs.ensureDir(path.join(iflowPath, 'scripts', 'NioPD'));
    await fs.ensureDir(path.join(iflowPath, 'templates'));
    
    await fs.writeFile(path.join(iflowPath, 'agents', 'NioPD', 'test-agent.md'), '# Test Agent');
    await fs.writeFile(path.join(iflowPath, 'commands', 'NioPD', 'test-command.md'), '# Test Command');
  }

  async runTest(testName, testFn) {
    this.results.total++;
    console.log(`
🧪 运行测试: ${testName}`);
    
    try {
      await testFn();
      this.results.passed++;
      this.results.details[testName] = { status: 'passed', notes: '' };
      console.log(`✅ ${testName}: 通过`);
    } catch (error) {
      this.results.failed++;
      this.results.details[testName] = { status: 'failed', error: error.message };
      console.log(`❌ ${testName}: 失败 - ${error.message}`);
    }
  }

  async testWelcome() {
    await this.runTest('TC-001: 欢迎界面', async () => {
      // 测试CLI命令存在
      const cliPath = path.join(__dirname, '..', 'bin', 'niopd.js');
      if (!await fs.pathExists(cliPath)) {
        throw new Error('CLI文件不存在');
      }
      
      // 测试版本显示
      const output = execSync(`node ${cliPath} --version`, { encoding: 'utf8' });
      if (!output.includes('1.0.0')) {
        throw new Error('版本显示不正确');
      }
    });
  }

  async testDirectoryValidation() {
    await this.runTest('TC-002: 目录验证', async () => {
      const { Validator } = require('../lib/validator');
      
      // 测试有效目录
      const validResult = await Validator.validateDirectory(process.cwd());
      if (validResult !== true) {
        throw new Error('有效目录验证失败');
      }
      
      // 测试无效目录
      const invalidResult = await Validator.validateDirectory('/invalid/path');
      if (invalidResult === true) {
        throw new Error('无效目录未正确识别');
      }
    });
  }

  async testFileManager() {
    await this.runTest('TC-003: 文件管理器', async () => {
      const { FileManager } = require('../lib/file-manager');
      const sourceDir = path.join(__dirname, '..');
      const tempDir = path.join(this.testDir, 'file-manager-test');
      
      const fm = new FileManager(sourceDir, tempDir);
      const result = await fm.scanFiles(['claude', 'iflow']);
      
      if (result.totalFiles === 0) {
        throw new Error('未找到任何文件');
      }
    });
  }

  async testBackupManager() {
    await this.runTest('TC-004: 备份管理器', async () => {
      const { BackupManager } = require('../lib/backup');
      const testPath = path.join(this.testDir, 'backup-test');
      
      await fs.ensureDir(testPath);
      await fs.ensureDir(path.join(testPath, '.claude'));
      
      const bm = new BackupManager(testPath);
      const backup = await bm.createBackup(['claude']);
      
      if (!backup || !backup.path) {
        throw new Error('备份创建失败');
      }
      
      const backups = await bm.listBackups();
      if (backups.length === 0) {
        throw new Error('备份列表为空');
      }
    });
  }

  async testSilentInstall() {
    await this.runTest('TC-005: 静默安装', async () => {
      const testPath = path.join(this.testDir, 'silent-test');
      
      try {
        const output = execSync(
          `node ${path.join(__dirname, '..', 'bin', 'niopd.js')} install --silent --path ${testPath} --ides claude --dry-run`,
          { encoding: 'utf8', timeout: 10000 }
        );
        
        if (!output.includes('模拟安装')) {
          throw new Error('静默安装输出不正确');
        }
      } catch (error) {
        if (error.status !== 0) {
          throw new Error(`静默安装失败: ${error.message}`);
        }
      }
    });
  }

  async testCrossPlatformPaths() {
    await this.runTest('TC-006: 跨平台路径', async () => {
      const { Validator } = require('../lib/validator');
      
      // 测试路径清理
      const cleanPath = Validator.sanitizePath('../../../etc/passwd');
      if (cleanPath !== null) {
        throw new Error('路径遍历未正确防护');
      }
    });
  }

  async testErrorHandling() {
    await this.runTest('TC-007: 错误处理', async () => {
      const { Validator } = require('../lib/validator');
      
      // 测试无效路径
      const result = await Validator.validateDirectory('/invalid/path/12345');
      if (result === true) {
        throw new Error('无效路径未正确识别');
      }
    });
  }

  async testIntegration() {
    await this.runTest('TC-008: 集成测试', async () => {
      const testPath = path.join(this.testDir, 'integration-test');
      
      // 测试完整流程（dry-run模式）
      const { interactiveInstall } = require('../lib/install');
      
      // 由于需要交互，这里测试模块加载
      if (typeof interactiveInstall !== 'function') {
        throw new Error('安装函数未正确导出');
      }
    });
  }

  async runAllTests() {
    console.log('🚀 开始Sprint 1测试...\n');
    
    await this.setup();
    
    await this.testWelcome();
    await this.testDirectoryValidation();
    await this.testFileManager();
    await this.testBackupManager();
    await this.testSilentInstall();
    await this.testCrossPlatformPaths();
    await this.testErrorHandling();
    await this.testIntegration();
    
    console.log('\n📊 Sprint 1测试结果:');
    console.log(`总测试: ${this.results.total}`);
    console.log(`通过: ${this.results.passed}`);
    console.log(`失败: ${this.results.failed}`);
    
    if (this.results.failed > 0) {
      console.log('\n❌ 失败详情:');
      Object.entries(this.results.details).forEach(([test, result]) => {
        if (result.status === 'failed') {
          console.log(`  ${test}: ${result.error}`);
        }
      });
    } else {
      console.log('\n✅ 所有测试通过！');
    }
    
    // 保存测试结果
    await fs.writeJSON(
      path.join(this.testDir, 'sprint1-results.json'),
      this.results,
      { spaces: 2 }
    );
    
    return this.results;
  }

  async cleanup() {
    console.log('\n🧹 清理测试环境...');
    await fs.remove(this.testDir);
  }
}

// 如果直接运行此文件
if (require.main === module) {
  const tester = new Sprint1Tester();
  tester.runAllTests()
    .then(() => tester.cleanup())
    .catch(console.error);
}

module.exports = { Sprint1Tester };