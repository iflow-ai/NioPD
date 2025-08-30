const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

class ErrorHandler {
  constructor() {
    this.errorCodes = {
      INVALID_PATH: 'E001',
      PERMISSION_DENIED: 'E002',
      DISK_SPACE: 'E003',
      FILE_NOT_FOUND: 'E004',
      FILE_CORRUPTED: 'E005',
      NETWORK_ERROR: 'E006',
      CONFIG_ERROR: 'E007',
      BACKUP_FAILED: 'E008',
      INSTALL_FAILED: 'E009'
    };

    this.errorMessages = {
      zh: {
        E001: '无效的安装路径',
        E002: '权限不足，无法写入目录',
        E003: '磁盘空间不足',
        E004: '文件未找到',
        E005: '文件已损坏',
        E006: '网络连接错误',
        E007: '配置错误',
        E008: '备份创建失败',
        E009: '安装失败'
      },
      en: {
        E001: 'Invalid installation path',
        E002: 'Permission denied',
        E003: 'Insufficient disk space',
        E004: 'File not found',
        E005: 'File corrupted',
        E006: 'Network error',
        E007: 'Configuration error',
        E008: 'Backup creation failed',
        E009: 'Installation failed'
      }
    };

    this.solutions = {
      E001: {
        zh: [
          '请检查路径是否存在',
          '确保路径是有效的目录',
          '避免使用特殊字符'
        ],
        en: [
          'Check if the path exists',
          'Ensure the path is a valid directory',
          'Avoid special characters'
        ]
      },
      E002: {
        zh: [
          '使用sudo运行命令',
          '检查目录权限',
          '选择有权限的目录'
        ],
        en: [
          'Run with sudo',
          'Check directory permissions',
          'Choose a directory with write permissions'
        ]
      },
      E003: {
        zh: [
          '清理磁盘空间',
          '选择其他磁盘',
          '删除不必要的文件'
        ],
        en: [
          'Free up disk space',
          'Choose another disk',
          'Delete unnecessary files'
        ]
      }
    };
  }

  async handleError(error, context = {}) {
    const errorInfo = this.analyzeError(error);
    const language = context.language || 'zh';
    
    console.error(chalk.red.bold('\n❌ 安装失败'));
    console.error(chalk.red(`错误代码: ${errorInfo.code}`));
    console.error(chalk.red(`错误信息: ${this.getErrorMessage(errorInfo.code, language)}`));
    console.error(chalk.red(`详细信息: ${error.message}`));
    
    // 显示解决方案
    const solutions = this.getSolutions(errorInfo.code, language);
    if (solutions && solutions.length > 0) {
      console.error(chalk.yellow('\n💡 解决方案:'));
      solutions.forEach((solution, index) => {
        console.error(chalk.yellow(`  ${index + 1}. ${solution}`));
      });
    }
    
    // 显示相关文档
    console.error(chalk.blue('\n📖 相关文档:'));
    console.error(chalk.blue('  https://github.com/iflow-ai/NioPD#故障排除'));
    
    // 记录错误日志
    await this.logError(error, context);
    
    // 生成诊断报告
    await this.generateDiagnosticReport(error, context);
    
    return {
      code: errorInfo.code,
      message: error.message,
      solutions,
      logPath: await this.getLogPath()
    };
  }

  analyzeError(error) {
    if (error.code === 'ENOENT') {
      return { code: 'E004', type: 'file_not_found' };
    } else if (error.code === 'EACCES' || error.code === 'EPERM') {
      return { code: 'E002', type: 'permission_denied' };
    } else if (error.message.includes('space') || error.message.includes('disk')) {
      return { code: 'E003', type: 'disk_space' };
    } else if (error.message.includes('path') || error.message.includes('directory')) {
      return { code: 'E001', type: 'invalid_path' };
    } else if (error.message.includes('corrupt') || error.message.includes('checksum')) {
      return { code: 'E005', type: 'file_corrupted' };
    } else if (error.message.includes('network') || error.message.includes('connection')) {
      return { code: 'E006', type: 'network_error' };
    } else if (error.message.includes('config') || error.message.includes('configuration')) {
      return { code: 'E007', type: 'config_error' };
    } else if (error.message.includes('backup')) {
      return { code: 'E008', type: 'backup_failed' };
    } else {
      return { code: 'E009', type: 'install_failed' };
    }
  }

  getErrorMessage(code, language = 'zh') {
    return this.errorMessages[language]?.[code] || this.errorMessages.en[code] || '未知错误';
  }

  getSolutions(code, language = 'zh') {
    return this.solutions[code]?.[language] || this.solutions[code]?.en || [];
  }

  async logError(error, context = {}) {
    const logDir = path.join(os.homedir(), '.niopd', 'logs');
    await fs.ensureDir(logDir);
    
    const logFile = path.join(logDir, `error-${Date.now()}.json`);
    const logData = {
      timestamp: new Date().toISOString(),
      error: {
        message: error.message,
        stack: error.stack,
        code: this.analyzeError(error).code
      },
      context: {
        ...context,
        platform: os.platform(),
        nodeVersion: process.version,
        cwd: process.cwd()
      },
      system: {
        platform: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem()
      }
    };
    
    await fs.writeJSON(logFile, logData, { spaces: 2 });
    return logFile;
  }

  async generateDiagnosticReport(error, context = {}) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        error: error.message,
        code: this.analyzeError(error).code,
        platform: os.platform()
      },
      environment: {
        node: process.version,
        platform: os.platform(),
        arch: os.arch(),
        memory: {
          total: os.totalmem(),
          free: os.freemem()
        }
      },
      paths: {
        cwd: process.cwd(),
        home: os.homedir(),
        tmp: os.tmpdir()
      },
      recommendations: this.getRecommendations(error)
    };
    
    const reportPath = path.join(os.homedir(), '.niopd', 'diagnostic-report.json');
    await fs.ensureDir(path.dirname(reportPath));
    await fs.writeJSON(reportPath, report, { spaces: 2 });
    
    return reportPath;
  }

  getRecommendations(error) {
    const recommendations = [];
    
    if (error.code === 'E003') {
      recommendations.push('清理磁盘空间');
      recommendations.push('选择其他磁盘');
    } else if (error.code === 'E002') {
      recommendations.push('使用管理员权限运行');
      recommendations.push('检查目录权限');
    } else if (error.code === 'E001') {
      recommendations.push('检查路径是否存在');
      recommendations.push('使用绝对路径');
    }
    
    return recommendations;
  }

  async getLogPath() {
    return path.join(os.homedir(), '.niopd', 'logs');
  }

  async showHelp(errorCode, language = 'zh') {
    const help = {
      zh: {
        title: '故障排除帮助',
        sections: [
          {
            title: '常见问题',
            items: [
              '磁盘空间不足: 清理空间或选择其他目录',
              '权限错误: 使用管理员权限运行',
              '路径无效: 检查路径是否存在'
            ]
          },
          {
            title: '获取帮助',
            items: [
              '查看日志: ~/.niopd/logs/',
              '文档: https://github.com/iflow-ai/NioPD',
              '社区支持: GitHub Issues'
            ]
          }
        ]
      },
      en: {
        title: 'Troubleshooting Help',
        sections: [
          {
            title: 'Common Issues',
            items: [
              'Disk space: Free up space or choose another directory',
              'Permission error: Run with administrator privileges',
              'Invalid path: Check if path exists'
            ]
          },
          {
            title: 'Get Help',
            items: [
              'Check logs: ~/.niopd/logs/',
              'Documentation: https://github.com/iflow-ai/NioPD',
              'Community support: GitHub Issues'
            ]
          }
        ]
      }
    };
    
    const helpContent = help[language] || help.en;
    console.log(chalk.cyan.bold(`\n${helpContent.title}\n`));
    
    helpContent.sections.forEach(section => {
      console.log(chalk.yellow.bold(section.title));
      section.items.forEach(item => {
        console.log(chalk.white(`  • ${item}`));
      });
      console.log();
    });
  }
}

module.exports = { ErrorHandler };