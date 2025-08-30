const fs = require('fs-extra');
const path = require('path');
const os = require('os');

class Utils {
  static async ensureDirectory(dirPath) {
    await fs.ensureDir(dirPath);
    return dirPath;
  }

  static async getSystemInfo() {
    return {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      homeDir: os.homedir(),
      tmpDir: os.tmpdir(),
      cpus: os.cpus().length,
      totalMemory: os.totalmem(),
      freeMemory: os.freemem()
    };
  }

  static formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes > 0) {
      return `${minutes}分${seconds % 60}秒`;
    }
    return `${seconds}秒`;
  }

  static formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static async getLogPath() {
    const logDir = path.join(os.homedir(), '.niopd', 'logs');
    await fs.ensureDir(logDir);
    return logDir;
  }

  static async writeLog(filename, data) {
    const logDir = await this.getLogPath();
    const logPath = path.join(logDir, filename);
    await fs.writeJSON(logPath, data, { spaces: 2 });
    return logPath;
  }

  static isValidIDE(ide) {
    return ['claude', 'iflow'].includes(ide);
  }

  static parseIDEStr(idesStr) {
    if (!idesStr) return ['claude', 'iflow'];
    return idesStr.split(',').map(ide => ide.trim()).filter(this.isValidIDE);
  }

  static async checkPrerequisites() {
    const issues = [];
    
    // 检查Node.js版本
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    if (majorVersion < 16) {
      issues.push(`Node.js版本过低，需要 >= 16.0.0，当前: ${nodeVersion}`);
    }

    // 检查操作系统
    const platform = os.platform();
    const supportedPlatforms = ['darwin', 'linux', 'win32'];
    if (!supportedPlatforms.includes(platform)) {
      issues.push(`不支持的操作系统: ${platform}`);
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  static async createTempDir(prefix = 'niopd-') {
    const tempDir = path.join(os.tmpdir(), prefix + Date.now());
    await fs.ensureDir(tempDir);
    return tempDir;
  }

  static async cleanupTempDir(tempDir) {
    if (tempDir && await fs.pathExists(tempDir)) {
      await fs.remove(tempDir);
    }
  }

  static sanitizeFilename(filename) {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  }

  static async getFileStats(filePath) {
    try {
      const stats = await fs.stat(filePath);
      return {
        exists: true,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        size: stats.size,
        modified: stats.mtime,
        created: stats.birthtime,
        mode: stats.mode
      };
    } catch (error) {
      return {
        exists: false,
        error: error.message
      };
    }
  }

  static async findConfigFiles(startPath) {
    const configFiles = [
      'niopd.config.js',
      'niopd.config.json',
      '.niopdrc',
      '.niopdrc.json'
    ];

    const found = [];
    let currentPath = startPath || process.cwd();

    while (currentPath !== path.dirname(currentPath)) {
      for (const configFile of configFiles) {
        const configPath = path.join(currentPath, configFile);
        if (await fs.pathExists(configPath)) {
          found.push(configPath);
        }
      }
      currentPath = path.dirname(currentPath);
    }

    return found;
  }

  static async loadConfig(configPath) {
    if (!await fs.pathExists(configPath)) {
      return {};
    }

    try {
      if (configPath.endsWith('.js')) {
        delete require.cache[require.resolve(configPath)];
        return require(configPath);
      } else {
        return await fs.readJSON(configPath);
      }
    } catch (error) {
      console.warn(`加载配置文件失败: ${error.message}`);
      return {};
    }
  }
}

module.exports = { Utils };