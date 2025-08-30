#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');
const { interactiveInstall } = require('../lib/install');

program
  .name('niopd')
  .description('NioPD CLI 安装工具 - AI驱动产品管理工具包')
  .version(pkg.version, '-v, --version', '显示版本号');

program
  .command('install')
  .description('安装 NioPD 到指定目录')
  .option('-s, --silent', '静默安装模式')
  .option('-p, --path <path>', '指定安装路径')
  .option('--ides <ides>', '指定IDE (claude,iflow)', 'claude,iflow')
  .option('--no-backup', '不创建备份')
  .option('--verbose', '显示详细日志')
  .option('--dry-run', '模拟安装过程')
  .option('--lang <lang>', '界面语言 (zh/en)', 'zh')
  .action(async (options) => {
    const { interactiveInstall } = require('../lib/install');
    try {
      await interactiveInstall(options);
    } catch (error) {
      console.error('安装失败:', error.message);
      process.exit(1);
    }
  });

program
  .command('help')
  .description('显示帮助信息')
  .action(() => {
    console.log(chalk.cyan.bold('\n🚀 NioPD CLI 安装工具\n'));
    console.log('使用示例:');
    console.log('  niopd install              # 交互式安装');
    console.log('  niopd install --silent     # 静默安装');
    console.log('  niopd install --path ./my-project');
    console.log('\n更多信息: https://github.com/iflow-ai/NioPD\n');
  });

program.on('command:*', () => {
  console.error(chalk.red(`❌ 无效命令: ${program.args.join(' ')}`));
  console.log('运行 "niopd --help" 查看可用命令');
  process.exit(1);
});

// 如果没有提供命令，显示帮助
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);