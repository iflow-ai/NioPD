# NioPD CLI 技术实现规范

## 技术架构概览

### 技术栈选择

| 组件 | 技术 | 版本 | 用途 |
|---|---|---|---|
| 运行时 | Node.js | ≥16.0.0 | 执行环境 |
| CLI框架 | Commander.js | ^9.0.0 | 命令行解析 |
| 交互界面 | Inquirer.js | ^8.0.0 | 交互式提示 |
| 文件系统 | fs-extra | ^11.0.0 | 增强文件操作 |
| 进度显示 | Ora | ^6.0.0 | 加载动画 |
| 颜色输出 | Chalk | ^4.0.0 | 终端颜色 |
| 路径处理 | Glob | ^8.0.0 | 文件匹配 |
| 压缩 | Archiver | ^5.0.0 | 备份压缩 |

### 项目结构规范

```
NioPD/
├── package.json                 # npm 包配置
├── bin/
│   └── niopd.js                # CLI 入口点 (可执行)
├── lib/
│   ├── install.js              # 核心安装逻辑
│   ├── init.js                 # 项目初始化
│   ├── utils.js                # 通用工具函数
│   ├── prompts.js              # 交互提示定义
│   ├── validator.js            # 输入验证
│   ├── backup.js               # 备份管理
│   └── logger.js               # 日志系统
├── config/
│   ├── defaults.json           # 默认配置
│   └── schema.json             # 配置验证模式
├── templates/
│   └── package.json            # 项目模板
├── test/
│   ├── unit/                   # 单元测试
│   ├── integration/            # 集成测试
│   └── fixtures/               # 测试数据
└── docs/
    ├── CLI-INSTALL-DESIGN.md   # 设计文档
    ├── USER-FLOW.md            # 用户流程
    ├── TECH-SPEC.md            # 技术规范
    └── TEST-PLAN.md            # 测试计划
```

## 核心模块设计

### 1. CLI 入口模块 (bin/niopd.js)

#### 1.1 命令定义
```javascript
#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');

program
  .name('niopd')
  .description('NioPD CLI 安装工具')
  .version(pkg.version, '-v, --version', '显示版本号');

// 安装命令
program
  .command('install')
  .description('交互式安装 NioPD')
  .option('-s, --silent', '静默安装模式')
  .option('-p, --path <path>', '指定安装路径')
  .option('--ides <ides>', '指定IDE (claude,iflow)', 'claude,iflow')
  .option('--no-backup', '不创建备份')
  .option('--verbose', '显示详细日志')
  .option('--dry-run', '模拟安装过程')
  .action(require('../lib/install'));

// 初始化命令
program
  .command('init [name]')
  .description('初始化新项目')
  .option('-t, --template <template>', '使用指定模板', 'default')
  .option('--skip-install', '跳过依赖安装')
  .action(require('../lib/init'));

// 卸载命令
program
  .command('uninstall')
  .description('卸载 NioPD')
  .option('--backup', '创建卸载备份')
  .action(require('../lib/uninstall'));

// 更新命令
program
  .command('update')
  .description('更新 NioPD 到最新版本')
  .option('--check-only', '仅检查更新')
  .action(require('../lib/update'));

// 帮助命令
program
  .command('help [command]')
  .description('显示帮助信息')
  .action(require('../lib/help'));

// 错误处理
program.on('command:*', () => {
  console.error(chalk.red(`❌ 无效命令: ${program.args.join(' ')}`));
  console.log('运行 "niopd --help" 查看可用命令');
  process.exit(1);
});

program.parse(process.argv);
```

### 2. 核心安装模块 (lib/install.js)

#### 2.1 类结构设计
```javascript
const EventEmitter = require('events');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const glob = require('glob');

class NioPDInstaller extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = {
      silent: false,
      path: process.cwd(),
      ides: ['claude', 'iflow'],
      backup: true,
      verbose: false,
      dryRun: false,
      ...options
    };
    
    this.sourceDir = path.resolve(__dirname, '..');
    this.targetDir = this.options.path;
    this.installedFiles = [];
    this.backupPaths = [];
  }

  async run() {
    try {
      await this.validateEnvironment();
      await this.prepareInstallation();
      await this.performInstallation();
      await this.finalizeInstallation();
      return { success: true, data: this.getInstallationReport() };
    } catch (error) {
      await this.handleError(error);
      throw error;
    }
  }

  async validateEnvironment() {
    // 环境验证逻辑
    const checks = [
      this.checkNodeVersion(),
      this.checkDiskSpace(),
      this.checkPermissions(),
      this.checkNetwork()
    ];
    
    const results = await Promise.allSettled(checks);
    const failures = results.filter(r => r.status === 'rejected');
    
    if (failures.length > 0) {
      throw new EnvironmentError(failures.map(f => f.reason));
    }
  }

  async prepareInstallation() {
    if (!this.options.silent) {
      await this.interactiveSetup();
    }
    
    await this.createBackup();
    await this.validateTargetDirectory();
  }

  async interactiveSetup() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'installPath',
        message: '📁 选择安装目录',
        default: this.targetDir,
        validate: this.validateDirectory.bind(this)
      },
      {
        type: 'checkbox',
        name: 'ides',
        message: '🎯 选择支持的 IDE',
        choices: [
          { name: 'Claude Code', value: 'claude', checked: true },
          { name: 'iFlow CLI', value: 'iflow', checked: true }
        ],
        validate: (input) => input.length > 0 || '至少选择一个 IDE'
      },
      {
        type: 'confirm',
        name: 'backup',
        message: '💾 是否创建现有配置备份',
        default: true
      }
    ]);
    
    this.targetDir = answers.installPath;
    this.options.ides = answers.ides;
    this.options.backup = answers.backup;
  }
}
```

### 3. 文件操作模块 (lib/file-manager.js)

#### 3.1 文件复制策略
```javascript
const crypto = require('crypto');
const path = require('path');
const fs = require('fs-extra');

class FileManager {
  constructor(sourceDir, targetDir) {
    this.sourceDir = sourceDir;
    this.targetDir = targetDir;
    this.fileMap = new Map();
  }

  async scanFiles() {
    const patterns = [
      '.claude/**/*',
      '.iflow/**/*',
      '!**/node_modules/**',
      '!**/.git/**'
    ];

    for (const pattern of patterns) {
      const files = await glob(pattern, { cwd: this.sourceDir });
      files.forEach(file => {
        const sourcePath = path.join(this.sourceDir, file);
        const targetPath = path.join(this.targetDir, file);
        const stats = fs.statSync(sourcePath);
        
        this.fileMap.set(file, {
          source: sourcePath,
          target: targetPath,
          size: stats.size,
          mode: stats.mode,
          checksum: this.calculateChecksum(sourcePath)
        });
      });
    }
    
    return this.fileMap;
  }

  async copyFiles(progressCallback) {
    const files = Array.from(this.fileMap.values());
    let completed = 0;
    
    for (const file of files) {
      await fs.ensureDir(path.dirname(file.target));
      await fs.copy(file.source, file.target);
      
      // 保持文件权限
      await fs.chmod(file.target, file.mode);
      
      completed++;
      if (progressCallback) {
        progressCallback(completed, files.length, file);
      }
    }
  }

  calculateChecksum(filePath) {
    const data = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(data).digest('hex');
  }
}
```

### 4. 备份管理模块 (lib/backup.js)

#### 4.1 备份策略
```javascript
const path = require('path');
const fs = require('fs-extra');
const archiver = require('archiver');

class BackupManager {
  constructor(targetDir) {
    this.targetDir = targetDir;
    this.backupDir = path.join(targetDir, '.niopd-backups');
  }

  async createBackup(ides) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `backup-${timestamp}`;
    const backupPath = path.join(this.backupDir, backupName);
    
    await fs.ensureDir(backupPath);
    
    const backupInfo = {
      timestamp: new Date().toISOString(),
      ides: ides,
      files: []
    };

    for (const ide of ides) {
      const idePath = path.join(this.targetDir, ide === 'claude' ? '.claude' : '.iflow');
      
      if (await fs.pathExists(idePath)) {
        const backupIdePath = path.join(backupPath, ide);
        await fs.copy(idePath, backupIdePath);
        
        const files = await this.scanDirectory(idePath);
        backupInfo.files.push({ ide, files });
      }
    }

    await fs.writeJSON(path.join(backupPath, 'backup-info.json'), backupInfo);
    
    return {
      path: backupPath,
      info: backupInfo
    };
  }

  async restoreBackup(backupPath) {
    const info = await fs.readJSON(path.join(backupPath, 'backup-info.json'));
    
    for (const { ide, files } of info.files) {
      const sourcePath = path.join(backupPath, ide);
      const targetPath = path.join(this.targetDir, ide === 'claude' ? '.claude' : '.iflow');
      
      await fs.remove(targetPath);
      await fs.copy(sourcePath, targetPath);
    }
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
        const info = await fs.readJSON(infoPath);
        backupList.push({
          name: backup,
          path: backupPath,
          ...info
        });
      }
    }
    
    return backupList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
}
```

### 5. 验证模块 (lib/validator.js)

#### 5.1 输入验证规则
```javascript
const path = require('path');
const fs = require('fs-extra');

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

  static async validateDiskSpace(dirPath, requiredSpace) {
    const stats = await fs.statfs(dirPath);
    const availableSpace = stats.available * stats.blksize;
    
    if (availableSpace < requiredSpace) {
      return `磁盘空间不足，需要 ${this.formatBytes(requiredSpace)}，可用 ${this.formatBytes(availableSpace)}`;
    }
    
    return true;
  }

  static validateIDEs(ides) {
    if (!Array.isArray(ides) || ides.length === 0) {
      return '至少选择一个 IDE';
    }
    
    const validIDEs = ['claude', 'iflow'];
    const invalid = ides.filter(ide => !validIDEs.includes(ide));
    
    if (invalid.length > 0) {
      return `无效的 IDE: ${invalid.join(', ')}`;
    }
    
    return true;
  }

  static formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }
}
```

### 6. 日志系统 (lib/logger.js)

#### 6.1 日志配置
```javascript
const winston = require('winston');
const path = require('path');
const os = require('os');

class Logger {
  constructor(options = {}) {
    this.logDir = path.join(os.homedir(), '.niopd', 'logs');
    this.level = options.level || 'info';
    this.silent = options.silent || false;
    
    this.logger = winston.createLogger({
      level: this.level,
      silent: this.silent,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File({
          filename: path.join(this.logDir, 'error.log'),
          level: 'error'
        }),
        new winston.transports.File({
          filename: path.join(this.logDir, 'install.log')
        })
      ]
    });
    
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }));
    }
  }

  log(level, message, meta = {}) {
    this.logger.log(level, message, meta);
  }

  info(message, meta) {
    this.log('info', message, meta);
  }

  error(message, meta) {
    this.log('error', message, meta);
  }

  warn(message, meta) {
    this.log('warn', message, meta);
  }

  debug(message, meta) {
    this.log('debug', message, meta);
  }
}
```

## 性能优化

### 1. 并发处理
```javascript
const pLimit = require('p-limit');
const limit = pLimit(10); // 限制并发数为10

async function copyFilesConcurrently(files) {
  const promises = files.map(file => 
    limit(() => fs.copy(file.source, file.target))
  );
  
  await Promise.all(promises);
}
```

### 2. 缓存机制
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10分钟缓存

async function getFileStats(filePath) {
  const cacheKey = `stats_${filePath}`;
  let stats = cache.get(cacheKey);
  
  if (!stats) {
    stats = await fs.stat(filePath);
    cache.set(cacheKey, stats);
  }
  
  return stats;
}
```

### 3. 进度优化
```javascript
class ProgressTracker {
  constructor(total) {
    this.total = total;
    this.current = 0;
    this.startTime = Date.now();
  }

  update(current) {
    this.current = current;
    const elapsed = Date.now() - this.startTime;
    const rate = this.current / elapsed;
    const remaining = (this.total - this.current) / rate;
    
    return {
      percentage: Math.round((this.current / this.total) * 100),
      elapsed: this.formatTime(elapsed),
      remaining: this.formatTime(remaining),
      rate: Math.round(rate * 100) / 100
    };
  }

  formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
}
```

## 安全考虑

### 1. 路径遍历防护
```javascript
const path = require('path');

function sanitizePath(inputPath) {
  const resolved = path.resolve(inputPath);
  const normalized = path.normalize(resolved);
  
  // 防止路径遍历攻击
  if (normalized.includes('..')) {
    throw new Error('无效的路径');
  }
  
  return normalized;
}
```

### 2. 文件权限检查
```javascript
async function checkFilePermissions(filePath) {
  try {
    await fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (error) {
    return false;
  }
}
```

### 3. 输入验证
```javascript
const validator = require('validator');

function validateInput(input, type) {
  switch (type) {
    case 'path':
      return validator.isAlphanumeric(input.replace(/[\/\\\-_\.]/g, ''));
    case 'ide':
      return ['claude', 'iflow'].includes(input);
    default:
      return false;
  }
}
```

## 部署配置

### 1. package.json 配置
```json
{
  "name": "@niopd/cli",
  "version": "1.0.0",
  "description": "NioPD CLI 安装工具",
  "main": "lib/index.js",
  "bin": {
    "niopd": "./bin/niopd.js"
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "scripts": {
    "start": "node bin/niopd.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint lib/ bin/",
    "lint:fix": "eslint lib/ bin/ --fix",
    "build": "npm run lint && npm test",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "niopd",
    "claude-code",
    "iflow",
    "product-management",
    "cli",
    "installer"
  ],
  "author": "NioPD Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/iflow-ai/NioPD.git"
  },
  "bugs": {
    "url": "https://github.com/iflow-ai/NioPD/issues"
  },
  "homepage": "https://github.com/iflow-ai/NioPD#readme"
}
```

### 2. 构建配置
```javascript
// webpack.config.js (可选)
const path = require('path');

module.exports = {
  target: 'node',
  entry: './bin/niopd.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'niopd.js'
  },
  mode: 'production',
  externals: {
    // 排除 node 内置模块
    fs: 'commonjs fs',
    path: 'commonjs path',
    os: 'commonjs os'
  }
};
```

### 3. Docker 支持
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN chmod +x bin/niopd.js

ENTRYPOINT ["node", "bin/niopd.js"]
```

## 监控和遥测

### 1. 性能指标
```javascript
const perf = require('perf_hooks');

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
  }

  startTimer(name) {
    this.metrics.set(name, perf.performance.now());
  }

  endTimer(name) {
    const start = this.metrics.get(name);
    const duration = perf.performance.now() - start;
    this.metrics.set(name, duration);
    return duration;
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }
}
```

### 2. 使用统计
```javascript
class UsageTracker {
  track(event, data = {}) {
    const payload = {
      event,
      timestamp: new Date().toISOString(),
      version: require('../package.json').version,
      nodeVersion: process.version,
      platform: process.platform,
      ...data
    };
    
    // 发送到分析服务 (可选)
    this.sendAnalytics(payload);
  }

  sendAnalytics(payload) {
    // 实现遥测发送逻辑
    if (process.env.NIOPD_DISABLE_ANALYTICS) return;
    
    // 发送到远程服务
  }
}
```