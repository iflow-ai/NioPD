const inquirer = require('inquirer');
const chalk = require('chalk');
const { Validator } = require('./validator');

class Prompts {
  constructor() {
    this.inquirer = inquirer;
  }

  async showWelcome() {
    const { UI } = require('./ui');
    const ui = new UI();
    await ui.showWelcome();
  }

  async selectDirectory() {
    const suggestions = await Validator.suggestDirectories();
    const currentDir = process.cwd();
    
    const { installPath } = await this.inquirer.prompt([
      {
        type: 'input',
        name: 'installPath',
        message: '📁 选择安装目录',
        default: currentDir,
        validate: async (input) => {
          const sanitized = Validator.sanitizePath(input);
          if (!sanitized) {
            return '无效的路径格式';
          }
          
          const dirResult = await Validator.validateDirectory(sanitized);
          if (dirResult !== true) {
            return dirResult;
          }
          
          const spaceResult = await Validator.validateDiskSpace(sanitized);
          if (spaceResult !== true) {
            return spaceResult;
          }
          
          return true;
        },
        filter: (input) => {
          return Validator.sanitizePath(input) || input;
        }
      }
    ]);

    // 获取目录详细信息
    const dirInfo = await Validator.getDirectoryInfo(installPath);
    
    // 如果有现有安装，显示警告
    if (dirInfo.existingInstallations.claude || dirInfo.existingInstallations.iflow) {
      console.log(chalk.yellow('\n⚠️  检测到现有安装:'));
      if (dirInfo.existingInstallations.claude) {
        console.log(chalk.yellow('   • Claude Code 已安装'));
      }
      if (dirInfo.existingInstallations.iflow) {
        console.log(chalk.yellow('   • iFlow CLI 已安装'));
      }
      console.log(chalk.yellow('   现有配置将被备份\n'));
    }

    return {
      path: installPath,
      info: dirInfo
    };
  }

  async selectIDEs() {
    const { ides } = await this.inquirer.prompt([
      {
        type: 'checkbox',
        name: 'ides',
        message: '🎯 选择支持的 IDE',
        choices: [
          {
            name: 'Claude Code',
            value: 'claude',
            checked: true,
            short: 'Claude'
          },
          {
            name: 'iFlow CLI',
            value: 'iflow',
            checked: true,
            short: 'iFlow'
          }
        ],
        validate: (input) => {
          if (input.length === 0) {
            return '至少选择一个 IDE';
          }
          return true;
        }
      }
    ]);

    return ides;
  }

  async confirmInstallation(options) {
    const { installPath, ides, backup } = options;
    
    console.log(chalk.cyan('\n📋 安装确认'));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`安装目录: ${chalk.green(installPath)}`);
    console.log(`安装 IDE: ${chalk.green(ides.join(', '))}`);
    console.log(`创建备份: ${backup ? chalk.green('是') : chalk.yellow('否')}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const { confirm } = await this.inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: '是否继续安装？',
        default: true
      }
    ]);

    return confirm;
  }

  async handleExistingInstall(options) {
    const { existingInstallations } = options;
    
    const choices = [];
    
    if (existingInstallations.claude || existingInstallations.iflow) {
      console.log(chalk.yellow('\n⚠️  检测到现有安装'));
      
      const { action } = await this.inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: '如何处理现有文件？',
          choices: [
            {
              name: '备份现有文件 (推荐)',
              value: 'backup',
              short: '备份'
            },
            {
              name: '覆盖现有文件',
              value: 'overwrite',
              short: '覆盖'
            },
            {
              name: '取消安装',
              value: 'cancel',
              short: '取消'
            }
          ]
        }
      ]);

      return action;
    }

    return 'install';
  }

  async showProgress(message, current, total) {
    const percentage = Math.round((current / total) * 100);
    const bar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));
    
    process.stdout.write(`\r${chalk.cyan(`[${bar}] ${percentage}%`)} ${message}`);
    
    if (current === total) {
      console.log(); // 换行
    }
  }
}

module.exports = { Prompts };