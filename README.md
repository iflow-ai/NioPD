# @iflow-ai/niopd

@iflow-ai/niopd 是一个强大的命令行工具，用于将 NioPD AI驱动产品管理工具包安装到您的开发环境中。支持 Claude Code 和 iFlow CLI 的完整集成。

## 安装方式

### 全局安装（推荐）
```bash
npm install -g @iflow-ai/niopd
```

### 使用 npx（无需全局安装）
```bash
npx @iflow-ai/niopd install
```

### 从源码安装
```bash
git clone https://github.com/iflow-ai/NioPD.git
cd NioPD
npm install
npm link
```

## 快速开始

### 1. 交互式安装（推荐新手）
```bash
npx @iflow-ai/niopd install
```
按照提示选择安装目录和IDE。

### 2. 静默安装（自动化场景）
```bash
npx @iflow-ai/niopd install --silent --path ./my-project --ides claude,iflow
```

### 3. 查看帮助
```bash
npx @iflow-ai/niopd --help
```

## 详细使用方式

### 安装命令详解

#### 基本安装
```bash
# 安装到当前目录
npx @iflow-ai/niopd install

# 安装到指定目录
npx @iflow-ai/niopd install --path /Users/yourname/projects/my-project

# 只安装到Claude Code
npx @iflow-ai/niopd install --ides claude

# 只安装到iFlow CLI
npx @iflow-ai/niopd install --ides iflow

# 安装到两个IDE
npx @iflow-ai/niopd install --ides claude,iflow
```

#### 高级选项
```bash
# 静默安装（无交互）
npx @iflow-ai/niopd install --silent

# 不创建备份
npx @iflow-ai/niopd install --no-backup

# 模拟安装（查看会安装哪些文件）
npx @iflow-ai/niopd install --dry-run

# 显示详细日志
npx @iflow-ai/niopd install --verbose

# 英文界面
npx @iflow-ai/niopd install --lang en
```

#### 组合使用
```bash
# 静默安装到指定目录，不创建备份，显示详细日志
npx @iflow-ai/niopd install --silent --path ./my-project --no-backup --verbose
```

### 安装后使用

安装完成后，您可以在支持的IDE中使用以下命令：

#### Claude Code 使用
```bash
# 启动Claude Code
claude

# 在Claude Code中使用NioPD命令
/niopd:init                    # 初始化系统
/niopd:new-initiative "新功能"  # 创建新功能
/niopd:help                   # 查看所有命令
```

#### iFlow CLI 使用
```bash
# 启动iFlow CLI
iflow

# 在iFlow CLI中使用NioPD命令
/niopd:init                    # 初始化系统
/niopd:new-initiative "新功能"  # 创建新功能
/niopd:help                   # 查看所有命令
```

### 配置管理

#### 配置文件
创建 `~/.niopd/config.json`:
```json
{
  "install": {
    "defaultPath": "./projects",
    "defaultIdes": ["claude", "iflow"],
    "backup": true,
    "verbose": false
  },
  "ui": {
    "colors": true,
    "language": "zh"
  }
}
```

#### 环境变量
```bash
# 设置默认安装路径
export NIOPD_INSTALL_PATH=./my-projects

# 设置默认IDE
export NIOPD_IDES=claude,iflow

# 设置语言
export NIOPD_LANG=zh

# 设置是否备份
export NIOPD_BACKUP=true
```

### 故障排除

#### 常见问题及解决方案

1. **权限错误**
   ```bash
   # 使用管理员权限
   sudo npx @iflow-ai/niopd install --path /opt/project
   
   # 或选择用户目录
   npx @iflow-ai/niopd install --path ~/projects
   ```

2. **路径问题**
   ```bash
   # 使用绝对路径
   npx @iflow-ai/niopd install --path /home/user/projects/my-project
   
   # 使用相对路径
   npx @iflow-ai/niopd install --path ./my-project
   ```

3. **网络问题**
   ```bash
   # 使用国内镜像
   npm config set registry https://registry.npmmirror.com
   npx @iflow-ai/niopd install
   ```

4. **查看详细日志**
   ```bash
   npx @iflow-ai/niopd install --verbose
   ```

### 验证安装

#### 检查安装是否成功
```bash
# 检查包是否安装成功
npm list -g @iflow-ai/niopd

# 检查命令是否可用
which niopd

# 测试命令
niopd --version
```

#### 验证文件安装
```bash
# 检查Claude Code目录
ls -la ~/.claude/commands/NioPD/

# 检查iFlow CLI目录
ls -la ~/.iflow/commands/NioPD/
```

### 卸载

#### 卸载全局安装
```bash
npm uninstall -g @iflow-ai/niopd
```

#### 清理配置文件
```bash
rm -rf ~/.niopd/
```

#### 清理安装的文件
```bash
# 清理Claude Code中的NioPD文件
rm -rf ~/.claude/commands/NioPD/
rm -rf ~/.claude/scripts/NioPD/
rm -rf ~/.claude/templates/

# 清理iFlow CLI中的NioPD文件
rm -rf ~/.iflow/commands/NioPD/
rm -rf ~/.iflow/scripts/NioPD/
rm -rf ~/.iflow/templates/
```

## 系统要求

- **Node.js**: 16.0.0 或更高版本
- **操作系统**: Windows 10+, macOS 12+, Ubuntu 20.04+
- **磁盘空间**: 至少 10MB 可用空间
- **网络**: 需要互联网连接进行安装

## 支持的IDE版本

- **Claude Code**: 最新版本
- **iFlow CLI**: 最新版本

## 获取帮助

- **文档**: https://github.com/iflow-ai/NioPD
- **问题报告**: https://github.com/iflow-ai/NioPD/issues
- **日志文件**: `~/.niopd/logs/install.log`
- **社区支持**: GitHub Discussions

## 开发贡献

```bash
# 克隆项目
git clone https://github.com/iflow-ai/NioPD.git
cd NioPD

# 安装依赖
npm install

# 运行测试
npm test

# 构建项目
npm run build

# 本地测试
npm link
niopd --help
```

## 功能特性

- ✅ **交互式安装向导** - 友好的用户界面
- ✅ **静默安装模式** - 无交互自动化
- ✅ **自定义配置** - 支持配置文件和环境变量
- ✅ **跨平台支持** - Windows, macOS, Linux
- ✅ **错误处理** - 详细的错误信息和解决方案
- ✅ **备份机制** - 自动备份现有配置
- ✅ **国际化支持** - 中英文界面
- ✅ **性能优化** - 快速安装体验

## 使用示例

### 基本用法
```bash
# 交互式安装
niopd install

# 静默安装到指定目录
niopd install --silent --path ./my-project

# 指定IDE
niopd install --ides claude

# 模拟安装（不实际安装）
niopd install --dry-run
```

### 配置管理
```bash
# 显示当前配置
niopd config --show

# 设置默认路径
niopd config --set install.defaultPath=./projects

# 重置配置
niopd config --reset
```

### 故障排除
```bash
# 诊断系统问题
niopd diagnose

# 查看帮助
niopd help install
```

## 配置

### 配置文件
创建 `~/.niopd/config.json`:
```json
{
  "install": {
    "defaultPath": "./projects",
    "defaultIdes": ["claude", "iflow"],
    "backup": true,
    "verbose": false
  },
  "ui": {
    "colors": true,
    "language": "zh"
  }
}
```

### 环境变量
```bash
export NIOPD_INSTALL_PATH=./my-project
export NIOPD_IDES=claude,iflow
export NIOPD_BACKUP=true
export NIOPD_LANG=zh
```

## 支持的IDE

- **Claude Code** - Claude Code 完整集成
- **iFlow CLI** - iFlow CLI 无缝支持

## 系统要求

- Node.js 16.0.0 或更高版本
- 支持的操作系统: Windows 10+, macOS 12+, Ubuntu 20.04+
- 至少 10MB 可用磁盘空间

## 故障排除

### 常见问题

1. **权限错误**
   ```bash
   # 使用管理员权限
   sudo niopd install --path /opt/project
   ```

2. **磁盘空间不足**
   ```bash
   # 清理空间或选择其他目录
   niopd install --path /path/with/space
   ```

3. **路径无效**
   ```bash
   # 使用绝对路径
   niopd install --path /home/user/project
   ```

### 获取帮助

- **文档**: https://github.com/iflow-ai/NioPD
- **问题报告**: https://github.com/iflow-ai/NioPD/issues
- **日志文件**: `~/.niopd/logs/`

## 开发

```bash
# 克隆项目
git clone https://github.com/iflow-ai/NioPD.git
cd NioPD

# 安装依赖
npm install

# 运行测试
npm test

# 构建
npm run build
```

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件