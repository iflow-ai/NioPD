const fs = require('fs-extra');
const path = require('path');


class BackupManager {
  constructor(targetDir) {
    this.targetDir = targetDir;
    this.backupDir = path.join(targetDir, '.niopd-backups');
  }

  async createBackup(ides, options = {}) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `backup-${timestamp}`;
    const backupPath = path.join(this.backupDir, backupName);
    
    await fs.ensureDir(backupPath);
    
    const backupInfo = {
      timestamp: new Date().toISOString(),
      ides: ides,
      files: [],
      options: options,
      originalPath: this.targetDir
    };

    let totalFiles = 0;
    let totalSize = 0;

    for (const ide of ides) {
      const idePath = path.join(this.targetDir, ide === 'claude' ? '.claude' : '.iflow');
      
      if (!await fs.pathExists(idePath)) {
        continue;
      }

      const backupIdePath = path.join(backupPath, ide);
      await fs.ensureDir(backupIdePath);

      try {
        await fs.copy(idePath, backupIdePath, {
          filter: (src) => {
            const relativePath = path.relative(idePath, src);
            return !relativePath.includes('node_modules') && 
                   !relativePath.includes('.git') &&
                   !relativePath.endsWith('.log');
          }
        });

        const files = await this.scanDirectory(idePath);
        backupInfo.files.push({ ide, files, count: files.length });
        totalFiles += files.length;
        
        // 计算总大小
        for (const file of files) {
          try {
            const stats = await fs.stat(file.fullPath);
            totalSize += stats.size;
          } catch {}
        }
      } catch (error) {
        console.warn(`备份 ${ide} 时出错: ${error.message}`);
        backupInfo.files.push({ ide, files: [], error: error.message });
      }
    }

    backupInfo.totalFiles = totalFiles;
    backupInfo.totalSize = totalSize;

    await fs.writeJSON(path.join(backupPath, 'backup-info.json'), backupInfo, { spaces: 2 });
    
    return {
      path: backupPath,
      name: backupName,
      info: backupInfo,
      totalFiles,
      totalSize
    };
  }

  async restoreBackup(backupPath) {
    const infoPath = path.join(backupPath, 'backup-info.json');
    
    if (!await fs.pathExists(infoPath)) {
      throw new Error('备份信息文件不存在');
    }

    const info = await fs.readJSON(infoPath);
    
    for (const { ide, files } of info.files) {
      if (!files || files.length === 0) continue;
      
      const sourcePath = path.join(backupPath, ide);
      const targetPath = path.join(this.targetDir, ide === 'claude' ? '.claude' : '.iflow');
      
      if (await fs.pathExists(targetPath)) {
        await fs.remove(targetPath);
      }
      
      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, targetPath);
      }
    }

    return {
      success: true,
      restoredIdes: info.files.map(f => f.ide)
    };
  }

  async listBackups() {
    if (!await fs.pathExists(this.backupDir)) {
      return [];
    }
    
    const backups = await fs.readdir(this.backupDir);
    const backupList = [];
    
    for (const backup of backups) {
      const backupPath = path.join(this.backupDir, backup);
      const infoPath = path.join(backupPath, 'backup-info.json');
      
      if (await fs.pathExists(infoPath)) {
        try {
          const info = await fs.readJSON(infoPath);
          const stats = await fs.stat(backupPath);
          
          backupList.push({
            name: backup,
            path: backupPath,
            timestamp: new Date(info.timestamp),
            ides: info.ides || [],
            totalFiles: info.totalFiles || 0,
            totalSize: info.totalSize || 0,
            age: Date.now() - new Date(info.timestamp).getTime(),
            size: await this.getDirectorySize(backupPath)
          });
        } catch (error) {
          console.warn(`读取备份信息失败 ${backup}: ${error.message}`);
        }
      }
    }
    
    return backupList.sort((a, b) => b.timestamp - a.timestamp);
  }

  async cleanupOldBackups(maxAge = 30 * 24 * 60 * 60 * 1000) { // 30天
    const backups = await this.listBackups();
    const now = Date.now();
    let deleted = 0;

    for (const backup of backups) {
      if (now - backup.timestamp.getTime() > maxAge) {
        try {
          await fs.remove(backup.path);
          deleted++;
        } catch (error) {
          console.warn(`删除旧备份失败 ${backup.name}: ${error.message}`);
        }
      }
    }

    return { deleted };
  }

  async scanDirectory(dirPath) {
    const files = [];
    
    if (!await fs.pathExists(dirPath)) {
      return files;
    }

    const walk = async (currentPath) => {
      const items = await fs.readdir(currentPath);
      
      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const relativePath = path.relative(dirPath, fullPath);
        
        try {
          const stats = await fs.stat(fullPath);
          
          if (stats.isDirectory()) {
            if (!item.includes('node_modules') && !item.startsWith('.')) {
              await walk(fullPath);
            }
          } else {
            files.push({
              name: item,
              path: relativePath,
              fullPath,
              size: stats.size,
              modified: stats.mtime
            });
          }
        } catch (error) {
          // 跳过无法访问的文件
        }
      }
    };

    await walk(dirPath);
    return files;
  }

  async getDirectorySize(dirPath) {
    let totalSize = 0;
    
    try {
      const files = await this.scanDirectory(dirPath);
      for (const file of files) {
        try {
          const stats = await fs.stat(file.fullPath);
          totalSize += stats.size;
        } catch {}
      }
    } catch {}
    
    return totalSize;
  }

  async getBackupInfo(backupName) {
    const backupPath = path.join(this.backupDir, backupName);
    const infoPath = path.join(backupPath, 'backup-info.json');
    
    if (!await fs.pathExists(infoPath)) {
      return null;
    }

    return await fs.readJSON(infoPath);
  }
}

module.exports = { BackupManager };