# Sprint 1 测试用例文档

## 测试范围
Sprint 1包含6个用户故事：
- US-1.1: 欢迎界面UI组件
- US-1.2: 目录选择交互
- US-1.3: IDE多选界面
- US-1.4: 安装确认界面
- US-2.1: 备份机制
- US-2.2: 进度显示

## 测试环境
- **Node.js**: 16.0.0+
- **操作系统**: macOS/Windows/Linux
- **测试工具**: Jest + 手动测试

## 测试用例

### TC-001: 欢迎界面显示测试
**优先级**: 🔴 High  
**测试类型**: 功能测试

#### 前置条件
- 已安装依赖: `npm install`
- CLI工具已构建

#### 测试步骤
1. 运行命令: `node bin/niopd.js install`
2. 观察欢迎界面显示
3. 按回车键继续

#### 预期结果
- [ ] 显示品牌化的欢迎界面
- [ ] 包含版本信息(v1.0.0)
- [ ] 显示功能介绍
- [ ] 按回车键后界面清除并继续

#### 边界测试
- [ ] 终端窗口大小变化时界面自适应
- [ ] 不同终端类型显示正常

### TC-002: 目录选择交互测试
**优先级**: 🔴 High  
**测试类型**: 交互测试

#### 测试步骤
1. 运行安装命令
2. 在目录选择步骤测试以下场景：
   - 直接按回车使用当前目录
   - 输入有效绝对路径
   - 输入有效相对路径
   - 输入无效路径
   - 输入无权限路径

#### 预期结果
- [ ] 显示当前工作目录作为默认值
- [ ] 实时验证路径有效性
- [ ] 显示磁盘空间信息
- [ ] 无效路径显示具体错误信息
- [ ] 无权限路径显示权限错误

#### 测试数据
```javascript
const testPaths = [
  process.cwd(),                    // 当前目录
  '/tmp/test-install',              // 绝对路径
  './test-project',                 // 相对路径
  '/invalid/path',                  // 无效路径
  '/root/protected',                // 无权限路径
  '../../../etc/passwd'             // 路径遍历攻击
];
```

### TC-003: IDE多选界面测试
**优先级**: 🔴 High  
**测试类型**: 交互测试

#### 测试步骤
1. 进入IDE选择界面
2. 测试以下选择场景：
   - 选择Claude Code
   - 选择iFlow CLI
   - 同时选择两个IDE
   - 取消所有选择
   - 使用键盘导航

#### 预期结果
- [ ] 显示两个IDE选项
- [ ] 支持空格键选择/取消
- [ ] 支持上下键导航
- [ ] 显示已选择数量
- [ ] 至少选择一个的验证
- [ ] 取消所有选择时显示错误

### TC-004: 安装确认界面测试
**优先级**: 🔴 High  
**测试类型**: 交互测试

#### 测试步骤
1. 完成目录和IDE选择
2. 查看确认界面
3. 测试确认和取消操作

#### 预期结果
- [ ] 显示完整的安装摘要
- [ ] 列出安装目录和选择的IDE
- [ ] 显示备份选项状态
- [ ] 确认后继续安装
- [ ] 取消时优雅退出

### TC-005: 备份机制测试
**优先级**: 🔴 High  
**测试类型**: 功能测试

#### 前置条件
- 目标目录已存在.claude或.iflow文件夹

#### 测试步骤
1. 在已安装目录运行安装
2. 选择备份选项
3. 完成安装
4. 验证备份文件
5. 测试恢复功能

#### 预期结果
- [ ] 检测到现有安装时提示备份
- [ ] 创建带时间戳的备份目录
- [ ] 备份包含所有必要文件
- [ ] 备份信息文件完整
- [ ] 恢复功能正常工作

#### 测试场景
```javascript
const backupScenarios = [
  { existing: ['claude'], new: ['claude'] },
  { existing: ['iflow'], new: ['iflow'] },
  { existing: ['claude', 'iflow'], new: ['claude', 'iflow'] },
  { existing: ['claude'], new: ['claude', 'iflow'] }
];
```

### TC-006: 进度显示测试
**优先级**: 🔴 High  
**测试类型**: 功能测试

#### 测试步骤
1. 开始安装过程
2. 观察进度显示
3. 验证进度准确性

#### 预期结果
- [ ] 显示每个IDE的安装进度
- [ ] 显示文件复制进度条
- [ ] 进度百分比准确
- [ ] 显示当前文件名
- [ ] 静默模式下不显示进度

### TC-007: 静默安装测试
**优先级**: 🟡 Medium  
**测试类型**: 功能测试

#### 测试命令
```bash
# 基本静默安装
node bin/niopd.js install --silent

# 指定路径和IDE
node bin/niopd.js install --silent --path ./test-project --ides claude,iflow

# 无备份模式
node bin/niopd.js install --silent --no-backup
```

#### 预期结果
- [ ] 跳过所有交互步骤
- [ ] 使用默认或指定参数
- [ ] 显示最少输出
- [ ] 安装成功完成

### TC-008: 错误处理测试
**优先级**: 🔴 High  
**测试类型**: 异常测试

#### 错误场景测试
1. **磁盘空间不足**
   - 模拟小磁盘空间
   - 验证错误提示

2. **权限错误**
   - 尝试安装到无权限目录
   - 验证权限错误处理

3. **文件损坏**
   - 模拟源文件损坏
   - 验证验证失败处理

4. **网络中断**
   - 模拟网络问题
   - 验证错误恢复

#### 预期结果
- [ ] 每种错误都有清晰提示
- [ ] 提供具体解决方案
- [ ] 错误日志记录完整
- [ ] 回滚机制正常工作

### TC-009: 跨平台兼容性测试
**优先级**: 🔴 High  
**测试类型**: 兼容性测试

#### 测试平台
- **macOS**: Terminal, iTerm2
- **Windows**: PowerShell, CMD, Windows Terminal
- **Linux**: Bash, Zsh, Fish

#### 测试内容
- [ ] 路径格式正确处理
- [ ] 权限模型适配
- [ ] 终端颜色显示正常
- [ ] 键盘输入响应正确

### TC-010: 性能测试
**优先级**: 🟡 Medium  
**测试类型**: 性能测试

#### 性能指标
- [ ] 标准安装时间 < 5秒
- [ ] 内存使用 < 200MB
- [ ] 大项目安装时间 < 10秒
- [ ] 并发处理正常

## 测试数据

### 测试项目结构
```
test-fixtures/
├── empty-project/
├── existing-claude/
│   └── .claude/
├── existing-iflow/
│   └── .iflow/
├── both-ides/
│   ├── .claude/
│   └── .iflow/
└── large-project/
    ├── .claude/
    └── .iflow/
```

### 测试脚本
```bash
#!/bin/bash
# test-sprint1.sh

echo "开始Sprint 1测试..."

# 创建测试环境
mkdir -p test-fixtures
cd test-fixtures

# 测试1: 新目录安装
echo "测试1: 新目录安装"
mkdir -p new-install
cd new-install
node ../../bin/niopd.js install --dry-run

# 测试2: 现有安装备份
echo "测试2: 现有安装备份"
cd ..
mkdir -p existing-install
cd existing-install
mkdir -p .claude/agents/niopd
touch .claude/agents/niopd/test.md
node ../../bin/niopd.js install --silent --path ./test-backup

# 测试3: 静默安装
echo "测试3: 静默安装"
cd ..
mkdir -p silent-test
cd silent-test
node ../../bin/niopd.js install --silent --ides claude --path ./silent-result

echo "Sprint 1测试完成"
```

## 测试执行计划

### 阶段1: 单元测试 (2天)
- [ ] 测试所有独立模块
- [ ] 验证边界条件
- [ ] 检查错误处理

### 阶段2: 集成测试 (1天)
- [ ] 测试完整安装流程
- [ ] 验证模块间交互
- [ ] 测试备份和恢复

### 阶段3: 手动测试 (1天)
- [ ] 交互式测试
- [ ] 跨平台测试
- [ ] 性能测试

### 阶段4: 回归测试 (0.5天)
- [ ] 修复后验证
- [ ] 整体流程测试

## 测试报告模板

```javascript
// test-results.json
{
  "testSuite": "Sprint 1",
  "timestamp": "2024-01-01T00:00:00Z",
  "results": {
    "total": 10,
    "passed": 0,
    "failed": 0,
    "skipped": 0
  },
  "details": {
    "TC-001": { "status": "passed", "notes": "" },
    "TC-002": { "status": "passed", "notes": "" },
    // ...
  }
}
```