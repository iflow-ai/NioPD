const fs = require('fs');
const path = require('path');

class I18n {
  constructor(language = 'zh') {
    this.language = language;
    this.translations = {
      zh: {
        welcome: {
          title: 'NioPD 安装向导',
          subtitle: 'AI驱动产品管理工具包',
          description: '欢迎使用 NioPD CLI 安装工具！'
        },
        steps: {
          directory: '步骤 1: 选择安装目录',
          ides: '步骤 2: 选择支持的 IDE',
          confirm: '步骤 3: 确认安装选项'
        },
        options: {
          claude: 'Claude Code',
          iflow: 'iFlow CLI',
          backup: '创建备份'
        },
        errors: {
          invalidPath: '无效的路径',
          permissionDenied: '权限不足',
          diskSpace: '磁盘空间不足'
        },
        success: {
          title: '安装成功完成！',
          summary: '安装摘要'
        }
      },
      en: {
        welcome: {
          title: 'NioPD Installation Wizard',
          subtitle: 'AI-Driven Product Management Toolkit',
          description: 'Welcome to NioPD CLI installer!'
        },
        steps: {
          directory: 'Step 1: Select Installation Directory',
          ides: 'Step 2: Choose Supported IDEs',
          confirm: 'Step 3: Confirm Installation Options'
        },
        options: {
          claude: 'Claude Code',
          iflow: 'iFlow CLI',
          backup: 'Create Backup'
        },
        errors: {
          invalidPath: 'Invalid path',
          permissionDenied: 'Permission denied',
          diskSpace: 'Insufficient disk space'
        },
        success: {
          title: 'Installation completed successfully!',
          summary: 'Installation Summary'
        }
      }
    };
  }

  t(key, section = '') {
    const keys = section ? `${section}.${key}` : key;
    return this.getNestedValue(this.translations[this.language], keys) ||
           this.getNestedValue(this.translations.en, keys) ||
           key;
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  detectLanguage() {
    // 检测系统语言
    const envLang = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL;
    if (envLang) {
      if (envLang.startsWith('zh')) return 'zh';
      if (envLang.startsWith('en')) return 'en';
    }
    
    // 检测环境变量
    if (process.env.NIOPD_LANG) {
      return process.env.NIOPD_LANG;
    }
    
    return 'zh'; // 默认中文
  }

  setLanguage(language) {
    if (this.translations[language]) {
      this.language = language;
    }
  }

  getAvailableLanguages() {
    return Object.keys(this.translations);
  }
}

module.exports = { I18n };