const fs = require('fs-extra');
const path = require('path');
const os = require('os');

class Validator {
  static async validateDirectory(dirPath) {
    if (!dirPath || typeof dirPath !== 'string') {
      return '目录路径不能为空';
    }
    
    try {
      const stats = await fs.stat(dirPath);
      if (!stats.isDirectory()) {
        return '路径必须是目录';
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        return '目录不存在';
      }
      return `无法访问目录: ${error.message}`;
    }
    
    try {
      await fs.access(dirPath, fs.constants.W_OK);
    } catch (error) {
      return '目录无写入权限';
    }
    
    return true;
  }

  static async validateDiskSpace(dirPath, requiredSpace = 5 * 1024 * 1024) { // 5MB
    try {
      const stats = await fs.statfs(dirPath);
      const availableSpace = stats.available * stats.blksize;
      
      if (availableSpace < requiredSpace) {
        return `磁盘空间不足，需要 ${this.formatBytes(requiredSpace)}，可用 ${this.formatBytes(availableSpace)}`;
      }
      
      return true;
    } catch (error) {
      return `无法检查磁盘空间: ${error.message}`;
    }
  }

  static async getDirectoryInfo(dirPath) {
    try {
      const stats = await fs.stat(dirPath);
      const diskStats = await fs.statfs(dirPath);
      
      const info = {
        path: dirPath,
        exists: true,
        isDirectory: stats.isDirectory(),
        writable: false,
        space: {
          available: diskStats.available * diskStats.blksize,
          total: diskStats.blocks * diskStats.blksize,
          used: (diskStats.blocks - diskStats.available) * diskStats.blksize
        },
        permissions: {
          readable: false,
          writable: false,
          executable: false
        },
        existingInstallations: {
          claude: false,
          iflow: false
        }
      };

      // 检查权限
      try {
        await fs.access(dirPath, fs.constants.R_OK);
        info.permissions.readable = true;
      } catch {}

      try {
        await fs.access(dirPath, fs.constants.W_OK);
        info.permissions.writable = true;
      } catch {}

      try {
        await fs.access(dirPath, fs.constants.X_OK);
        info.permissions.executable = true;
      } catch {}

      // 检查现有安装
      const claudePath = path.join(dirPath, '.claude');
      const iflowPath = path.join(dirPath, '.iflow');
      
      info.existingInstallations.claude = await fs.pathExists(claudePath);
      info.existingInstallations.iflow = await fs.pathExists(iflowPath);

      return info;
    } catch (error) {
      return {
        path: dirPath,
        exists: false,
        error: error.message
      };
    }
  }

  static formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static sanitizePath(inputPath) {
    if (!inputPath || typeof inputPath !== 'string') {
      return null;
    }
    
    const resolved = path.resolve(inputPath);
    const normalized = path.normalize(resolved);
    
    // 防止路径遍历攻击
    if (normalized.includes('..')) {
      return null;
    }
    
    return normalized;
  }

  static async suggestDirectories() {
    const suggestions = [
      {
        name: '当前目录',
        value: process.cwd(),
        description: '使用当前工作目录'
      }
    ];

    // 添加用户主目录
    const homeDir = os.homedir();
    suggestions.push({
      name: '用户主目录',
      value: homeDir,
      description: `安装到 ${homeDir}`
    });

    // 添加常见项目目录
    const commonPaths = [
      path.join(homeDir, 'Projects'),
      path.join(homeDir, 'workspace'),
      path.join(homeDir, 'dev')
    ];

    for (const commonPath of commonPaths) {
      if (await fs.pathExists(commonPath)) {
        suggestions.push({
          name: `项目目录 (${path.basename(commonPath)})`,
          value: commonPath,
          description: `使用 ${commonPath}`
        });
      }
    }

    return suggestions;
  }
}

module.exports = { Validator };