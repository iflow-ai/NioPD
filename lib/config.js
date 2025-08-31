const fs = require('fs');
const path = require('path');
const os = require('os');

class ConfigManager {
  constructor() {
    this.configDir = path.join(os.homedir(), '.niopd');
    this.configFile = path.join(this.configDir, 'config.json');
    this.defaultConfig = {
      install: {
        defaultPath: process.cwd(),
        defaultIdes: ['claude', 'iflow'],
        backup: true,
        verbose: false,
        templateVariables: {
          ideDir: 'claude',
          ideType: 'claude'
        }
      },
      ui: {
        colors: true,
        progress: true,
        language: 'zh-CN'
      },
      system: {
        checkUpdates: true,
        autoCleanup: true,
        maxBackups: 10
      },
      ide: {
        claude: {
          dir: '.claude',
          scriptsDir: '.claude/scripts/NioPD',
          commandsDir: '.claude/commands/NioPD',
          agentsDir: '.claude/agents/NioPD',
          templatesDir: '.claude/templates'
        },
        iflow: {
          dir: '.iflow',
          scriptsDir: '.iflow/scripts/NioPD',
          commandsDir: '.iflow/commands/NioPD',
          agentsDir: '.iflow/agents/NioPD',
          templatesDir: '.iflow/templates'
        }
      }
    };
  }

  async loadConfig() {
    try {
      if (!fs.existsSync(this.configFile)) {
        await this.createDefaultConfig();
      }
      
      const userConfig = JSON.parse(fs.readFileSync(this.configFile, 'utf8'));
      return this.mergeConfig(this.defaultConfig, userConfig);
    } catch (error) {
      console.warn(`加载配置失败: ${error.message}, 使用默认配置`);
      return this.defaultConfig;
    }
  }

  async saveConfig(config) {
    try {
      if (!fs.existsSync(this.configDir)) {
        fs.mkdirSync(this.configDir, { recursive: true });
      }
      
      fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
      return true;
    } catch (error) {
      console.error(`保存配置失败: ${error.message}`);
      return false;
    }
  }

  async createDefaultConfig() {
    return await this.saveConfig(this.defaultConfig);
  }

  mergeConfig(defaultConfig, userConfig) {
    const merged = { ...defaultConfig };
    
    for (const [key, value] of Object.entries(userConfig)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        merged[key] = { ...merged[key], ...value };
      } else {
        merged[key] = value;
      }
    }
    
    return merged;
  }

  async loadEnvironmentConfig() {
    const envConfig = {};
    
    // 环境变量配置
    if (process.env.NIOPD_INSTALL_PATH) {
      envConfig.install = envConfig.install || {};
      envConfig.install.defaultPath = process.env.NIOPD_INSTALL_PATH;
    }
    
    if (process.env.NIOPD_IDES) {
      envConfig.install = envConfig.install || {};
      envConfig.install.defaultIdes = process.env.NIOPD_IDES.split(',').map(s => s.trim());
    }
    
    if (process.env.NIOPD_BACKUP !== undefined) {
      envConfig.install = envConfig.install || {};
      envConfig.install.backup = process.env.NIOPD_BACKUP === 'true';
    }
    
    if (process.env.NIOPD_VERBOSE !== undefined) {
      envConfig.install = envConfig.install || {};
      envConfig.install.verbose = process.env.NIOPD_VERBOSE === 'true';
    }
    
    return envConfig;
  }

  async findProjectConfig(startPath) {
    const configFiles = [
      'niopd.config.js',
      'niopd.config.json',
      '.niopdrc',
      '.niopdrc.json'
    ];
    
    let currentPath = startPath || process.cwd();
    
    while (currentPath !== path.dirname(currentPath)) {
      for (const configFile of configFiles) {
        const configPath = path.join(currentPath, configFile);
        if (fs.existsSync(configPath)) {
          try {
            if (configFile.endsWith('.js')) {
              delete require.cache[require.resolve(configPath)];
              return require(configPath);
            } else {
              return JSON.parse(fs.readFileSync(configPath, 'utf8'));
            }
          } catch (error) {
            console.warn(`加载项目配置失败 ${configPath}: ${error.message}`);
          }
        }
      }
      currentPath = path.dirname(currentPath);
    }
    
    return {};
  }

  async getMergedConfig(options = {}) {
    const baseConfig = await this.loadConfig();
    const envConfig = await this.loadEnvironmentConfig();
    const projectConfig = await this.findProjectConfig(options.path);
    
    return this.mergeConfig(
      this.mergeConfig(
        this.mergeConfig(baseConfig, envConfig),
        projectConfig
      ),
      options
    );
  }

  validateConfig(config) {
    const errors = [];
    
    if (config.install && config.install.defaultIdes) {
      if (!Array.isArray(config.install.defaultIdes)) {
        errors.push('defaultIdes 必须是数组');
      } else {
        const validIdes = ['claude', 'iflow'];
        const invalid = config.install.defaultIdes.filter(ide => !validIdes.includes(ide));
        if (invalid.length > 0) {
          errors.push(`无效的IDE: ${invalid.join(', ')}`);
        }
      }
    }
    
    if (config.install && config.install.defaultPath) {
      if (typeof config.install.defaultPath !== 'string') {
        errors.push('defaultPath 必须是字符串');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

module.exports = { ConfigManager };