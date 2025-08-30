const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const glob = require('glob');

class FileManager {
  constructor(sourceDir, targetDir) {
    this.sourceDir = sourceDir;
    this.targetDir = targetDir;
    this.fileMap = new Map();
    this.totalSize = 0;
  }

  async scanFiles(ides) {
    this.fileMap.clear();
    this.totalSize = 0;

    for (const ide of ides) {
      const sourceFolder = ide === 'claude' ? '.claude' : '.iflow';
      const sourcePath = path.join(this.sourceDir, sourceFolder);
      
      if (!await fs.pathExists(sourcePath)) {
        continue;
      }

      const pattern = `${sourceFolder}/**/*`;
      const ignore = [
        `${sourceFolder}/**/node_modules/**`,
        `${sourceFolder}/**/.git/**`,
        `${sourceFolder}/**/logs/**`,
        `${sourceFolder}/**/*.log`
      ];

      const files = glob.sync(pattern, { 
        cwd: this.sourceDir,
        ignore: ignore
      });
      
      for (const file of files) {
        const sourceFile = path.join(this.sourceDir, file);
        const targetFile = path.join(this.targetDir, file);
        
        try {
          const stats = await fs.stat(sourceFile);
          if (stats.isFile()) {
            this.fileMap.set(file, {
              source: sourceFile,
              target: targetFile,
              size: stats.size,
              mode: stats.mode,
              checksum: await this.calculateChecksum(sourceFile),
              ide: ide
            });
            this.totalSize += stats.size;
          }
        } catch (error) {
          console.warn(`跳过文件 ${file}: ${error.message}`);
        }
      }
    }

    return {
      files: Array.from(this.fileMap.values()),
      totalFiles: this.fileMap.size,
      totalSize: this.totalSize
    };
  }

  async calculateChecksum(filePath) {
    try {
      const data = await fs.readFile(filePath);
      return crypto.createHash('md5').update(data).digest('hex');
    } catch (error) {
      return null;
    }
  }

  async copyFiles(progressCallback) {
    const files = Array.from(this.fileMap.values());
    let completed = 0;
    let copiedSize = 0;

    for (const file of files) {
      try {
        await fs.ensureDir(path.dirname(file.target));
        await fs.copy(file.source, file.target);
        await fs.chmod(file.target, file.mode);
        
        completed++;
        copiedSize += file.size;
        
        if (progressCallback) {
          progressCallback({
            current: completed,
            total: files.length,
            currentFile: path.basename(file.target),
            copiedSize: copiedSize,
            totalSize: this.totalSize,
            percentage: Math.round((completed / files.length) * 100)
          });
        }
      } catch (error) {
        throw new Error(`复制文件失败 ${file.source} -> ${file.target}: ${error.message}`);
      }
    }

    return {
      copiedFiles: completed,
      totalSize: copiedSize
    };
  }

  async verifyFiles() {
    const files = Array.from(this.fileMap.values());
    const results = {
      valid: 0,
      invalid: 0,
      errors: []
    };

    for (const file of files) {
      try {
        if (!await fs.pathExists(file.target)) {
          results.invalid++;
          results.errors.push(`文件不存在: ${file.target}`);
          continue;
        }

        const stats = await fs.stat(file.target);
        if (stats.size !== file.size) {
          results.invalid++;
          results.errors.push(`文件大小不匹配: ${file.target}`);
          continue;
        }

        const checksum = await this.calculateChecksum(file.target);
        if (checksum !== file.checksum) {
          results.invalid++;
          results.errors.push(`文件校验失败: ${file.target}`);
          continue;
        }

        results.valid++;
      } catch (error) {
        results.invalid++;
        results.errors.push(`验证错误 ${file.target}: ${error.message}`);
      }
    }

    return results;
  }

  async getFileList(ides) {
    const result = {
      claude: [],
      iflow: []
    };

    for (const ide of ides) {
      const sourceFolder = ide === 'claude' ? '.claude' : '.iflow';
      const sourcePath = path.join(this.sourceDir, sourceFolder);
      
      if (!await fs.pathExists(sourcePath)) {
        continue;
      }

      const pattern = `${sourceFolder}/**/*`;
      const ignore = [
        `${sourceFolder}/**/node_modules/**`,
        `${sourceFolder}/**/.git/**`
      ];

      const files = glob.sync(pattern, { 
        cwd: this.sourceDir,
        ignore: ignore
      });
      result[ide] = files.map(file => ({
        source: path.join(this.sourceDir, file),
        target: path.join(this.targetDir, file),
        relative: file
      }));
    }

    return result;
  }
}

module.exports = { FileManager };