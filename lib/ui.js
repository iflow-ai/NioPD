const chalk = require('chalk');

class UI {
  constructor() {
    this.colors = {
      primary: chalk.cyan,
      success: chalk.green,
      warning: chalk.yellow,
      error: chalk.red,
      info: chalk.blue,
      dim: chalk.gray
    };
  }

  showWelcome() {
    console.clear();
    
    const welcomeText = `
╔══════════════════════════════════════╗
║         NioPD 安装向导               ║
║    AI驱动产品管理工具包              ║
║         版本 v1.0.0                  ║
╚══════════════════════════════════════╝

欢迎使用 NioPD CLI 安装工具！

这个向导将帮助您将 NioPD 安装到您的开发环境中。

🎯 支持的功能：
   • Claude Code 完整集成
   • iFlow CLI 无缝支持
   • 智能备份机制
   • 跨平台兼容

📖 文档：https://github.com/iflow-ai/NioPD

按回车键开始安装...
    `.trim();

    console.log(this.colors.primary(welcomeText));
    
    return new Promise(resolve => {
      process.stdin.once('data', () => {
        console.clear();
        resolve();
      });
    });
  }

  showStep(step, title) {
    console.log(this.colors.primary.bold(`\n📋 步骤 ${step}: ${title}\n`));
  }

  showInfo(message) {
    console.log(this.colors.info(`ℹ️  ${message}`));
  }

  showSuccess(message) {
    console.log(this.colors.success(`✅ ${message}`));
  }

  showWarning(message) {
    console.log(this.colors.warning(`⚠️  ${message}`));
  }

  showError(message) {
    console.log(this.colors.error(`❌ ${message}`));
  }

  showProgress(current, total, message = '') {
    const percentage = Math.round((current / total) * 100);
    const bar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));
    
    process.stdout.write(`\r${this.colors.primary(`[${bar}] ${percentage}%`)} ${message}`);
    
    if (current === total) {
      console.log(); // 换行
    }
  }

  showSummary(data) {
    console.log(chalk.green.bold('\n🎉 安装成功完成！\n'));
    console.log('📊 安装摘要：');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`安装目录: ${chalk.green(data.installPath)}`);
    console.log(`安装时间: ${chalk.green(data.duration)}`);
    console.log(`已安装 IDE: ${chalk.green(data.ides.join(', '))}`);
    console.log(`文件总数: ${chalk.green(data.totalFiles)} 个`);
    console.log(`备份文件: ${chalk.green(data.backupCount)} 个`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎯 下一步操作：');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`1. 进入安装目录: ${chalk.cyan('cd ' + data.installPath)}`);
    console.log('2. 启动 Claude Code: claude');
    console.log('3. 启动 iFlow CLI: iflow');
    console.log('4. 创建新项目: /niopd:new-initiative "项目名"');
    console.log('📖 文档: https://github.com/iflow-ai/NioPD\n');
  }

  showErrorReport(error) {
    console.log(chalk.red.bold('❌ 安装失败'));
    console.log(`错误信息：${error.message}`);
    console.log(`解决方案：${error.solution || '请查看日志文件获取详细信息'}`);
    console.log(`日志文件：${error.logPath || '~/.niopd/logs/install.log'}`);
  }
}

module.exports = { UI };