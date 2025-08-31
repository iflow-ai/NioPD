const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const os = require('os');
const { Prompts } = require('./prompts');
const { UI } = require('./ui');
const { FileManager } = require('./file-manager');
const { BackupManager } = require('./backup');
const { Validator } = require('./validator');
const { ConfigManager } = require('./config');
const { TemplateProcessor } = require('./template-processor');

class NioPDInstaller {
  constructor(options = {}) {
    this.configManager = new ConfigManager();
    this.options = {
      silent: false,
      path: process.cwd(),
      ides: ['claude', 'iflow'],
      backup: true,
      verbose: false,
      dryRun: false,
      ...options
    };
    
    this.sourceDir = path.resolve(__dirname, '..');
    this.targetDir = this.options.path;
    this.prompts = new Prompts();
    this.ui = new UI();
    this.fileManager = new FileManager(this.sourceDir, this.targetDir);
    this.backupManager = new BackupManager(this.targetDir);
    this.templateProcessor = new TemplateProcessor();
  }

  async run() {
    try {
      // 加载合并配置
      const config = await this.configManager.getMergedConfig(this.options);
      this.options = { ...this.options, ...config };
      
      if (this.options.verbose) {
        console.log(chalk.dim('使用配置:'), this.options);
      }
      
      if (this.options.silent) {
        return await this.silentInstall();
      }
      
      console.log(chalk.cyan.bold('\n🚀 NioPD 安装向导\n'));
      return await this.interactiveInstall();
    } catch (error) {
      await this.handleError(error);
      throw error;
    }
  }

  async interactiveInstall() {
    // 步骤1: 目录选择
    const { path: installPath, info } = await this.prompts.selectDirectory();
    this.targetDir = installPath;
    this.fileManager.targetDir = installPath;
    this.backupManager.targetDir = installPath;

    // 步骤2: IDE选择
    const ides = await this.prompts.selectIDEs();
    
    // 步骤3: 处理现有安装
    let backupResult = null;
    if (info.existingInstallations.claude || info.existingInstallations.iflow) {
      const action = await this.prompts.handleExistingInstall({ existingInstallations: info.existingInstallations });
      
      if (action === 'cancel') {
        console.log(chalk.yellow('安装已取消'));
        return { success: false, reason: 'user_cancelled' };
      }
      
      if (action === 'backup' && this.options.backup) {
        backupResult = await this.createBackup(ides);
      }
    }

    // 步骤4: 确认安装
    const confirmed = await this.prompts.confirmInstallation({
      installPath,
      ides,
      backup: this.options.backup
    });

    if (!confirmed) {
      console.log(chalk.yellow('安装已取消'));
      return { success: false, reason: 'user_cancelled' };
    }

    // 步骤5: 执行安装
    return await this.performInstallation(ides, backupResult);
  }

  async silentInstall() {
    const ides = Array.isArray(this.options.ides) ? this.options.ides : 
      (typeof this.options.ides === 'string' ? this.options.ides.split(',').map(s => s.trim()) : this.options.ides);
    
    // 验证目录
    const dirResult = await Validator.validateDirectory(this.targetDir);
    if (dirResult !== true) {
      throw new Error(dirResult);
    }

    // 验证IDE
    const validIdes = ['claude', 'iflow'];
    const invalidIdes = ides.filter(ide => !validIdes.includes(ide));
    if (invalidIdes.length > 0) {
      throw new Error(`无效的 IDE: ${invalidIdes.join(', ')}`);
    }

    // 验证磁盘空间
    const spaceResult = await Validator.validateDiskSpace(this.targetDir);
    if (spaceResult !== true) {
      throw new Error(spaceResult);
    }

    // 静默模式下的配置验证
    console.log(chalk.blue('🔧 静默安装模式'));
    console.log(`安装目录: ${this.targetDir}`);
    console.log(`安装 IDE: ${ides.join(', ')}`);
    console.log(`创建备份: ${this.options.backup ? '是' : '否'}`);
    console.log(`详细模式: ${this.options.verbose ? '是' : '否'}`);

    // 检查现有安装
    const info = await Validator.getDirectoryInfo(this.targetDir);
    let backupResult = null;
    
    if (info.existingInstallations.claude || info.existingInstallations.iflow) {
      if (this.options.backup) {
        console.log(chalk.yellow('⚠️  检测到现有安装，将创建备份'));
        backupResult = await this.createBackup(ides);
      } else {
        console.log(chalk.yellow('⚠️  检测到现有安装，将覆盖'));
      }
    }

    return await this.performInstallation(ides, backupResult);
  }

  async createBackup(ides) {
    if (!this.options.backup) {
      return null;
    }

    const spinner = ora('创建备份...').start();
    
    try {
      const backupResult = await this.backupManager.createBackup(ides);
      spinner.succeed(`备份已创建: ${backupResult.name}`);
      return backupResult;
    } catch (error) {
      spinner.fail('备份创建失败');
      throw error;
    }
  }

  async performInstallation(ides, backupResult) {
    const startTime = Date.now();
    
    try {
      // 扫描文件
      const { files, totalFiles, totalSize } = await this.fileManager.scanFiles(ides);
      
      if (totalFiles === 0) {
        throw new Error('未找到要安装的文件');
      }

      if (this.options.dryRun) {
        console.log(chalk.cyan('\n🔍 模拟安装模式'));
        console.log(`将安装 ${totalFiles} 个文件，总计 ${this.formatBytes(totalSize)}`);
        return { success: true, dryRun: true, files: totalFiles, size: totalSize };
      }

      // 创建目录
      await fs.ensureDir(this.targetDir);

      // 处理模板文件
      const spinner = ora('正在处理模板文件...').start();
      await this.processTemplates(ides);
      spinner.text = '正在安装文件...';
      
      const copyResult = await this.fileManager.copyFiles((progress) => {
        if (this.options.verbose) {
          spinner.text = `正在安装... ${progress.current}/${progress.total} (${progress.percentage}%)`;
        }
      });

      // 验证安装
      spinner.text = '验证安装...';
      const verification = await this.fileManager.verifyFiles();
      
      if (verification.invalid > 0) {
        spinner.fail('安装验证失败');
        throw new Error(`验证失败: ${verification.errors.join(', ')}`);
      }

      spinner.succeed('安装完成！');

      // 显示结果
      const duration = this.formatDuration(Date.now() - startTime);
      
      this.ui.showSummary({
        installPath: this.targetDir,
        duration,
        ides,
        totalFiles: copyResult.copiedFiles,
        backupCount: backupResult ? 1 : 0
      });

      return {
        success: true,
        installPath: this.targetDir,
        ides,
        files: copyResult.copiedFiles,
        size: copyResult.totalSize,
        duration,
        backup: backupResult,
        cdCommand: `cd "${this.targetDir}"`
      };

    } catch (error) {
      // 回滚操作
      if (backupResult) {
        console.log(chalk.yellow('正在回滚更改...'));
        try {
          await this.backupManager.restoreBackup(backupResult.path);
          console.log(chalk.green('已回滚到之前状态'));
        } catch (rollbackError) {
          console.error(chalk.red('回滚失败:', rollbackError.message));
        }
      }
      throw error;
    }
  }

  async handleError(error) {
    const { ErrorHandler } = require('./error-handler');
    const handler = new ErrorHandler();
    
    const language = this.options.language || 'zh';
    await handler.handleError(error, {
      language,
      options: this.options,
      context: 'install'
    });
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes > 0) {
      return `${minutes}分${seconds % 60}秒`;
    }
    return `${seconds}秒`;
  }

  async processTemplates(ides) {
    const { TemplateProcessor } = require('./template-processor');
    
    for (const ide of ides) {
      const processor = new TemplateProcessor(ide);
      
      // 处理命令模板
      const commandsSource = path.join(this.sourceDir, 'core', 'commands', 'NioPD');
      const commandsTarget = path.join(this.targetDir, ide === 'claude' ? '.claude' : '.iflow', 'commands', 'NioPD');
      
      if (await fs.pathExists(commandsSource)) {
        await processor.processTemplateDirectory(commandsSource, commandsTarget, '*.md.template');
      }
      
      // 处理脚本模板
      const scriptsSource = path.join(this.sourceDir, 'core', 'scripts', 'NioPD');
      const scriptsTarget = path.join(this.targetDir, ide === 'claude' ? '.claude' : '.iflow', 'scripts', 'NioPD');
      
      if (await fs.pathExists(scriptsSource)) {
        await processor.processTemplateDirectory(scriptsSource, scriptsTarget, '*.sh.template');
      }
      
      // 处理代理模板
      const agentsSource = path.join(this.sourceDir, 'core', 'agents', 'NioPD');
      const agentsTarget = path.join(this.targetDir, ide === 'claude' ? '.claude' : '.iflow', 'agents', 'NioPD');
      
      if (await fs.pathExists(agentsSource)) {
        await processor.processTemplateDirectory(agentsSource, agentsTarget, '*.md');
      }
    }
  }
}

async function interactiveInstall(options = {}) {
  const installer = new NioPDInstaller(options);
  return await installer.run();
}

module.exports = { interactiveInstall, NioPDInstaller };