# NioPD CLI 测试计划

## 测试目标

确保 NioPD CLI 安装工具在各种环境和使用场景下都能稳定、可靠地运行，提供一致的用户体验。

## 测试范围

### 功能测试
- 交互式安装流程
- 静默安装模式
- 路径选择和验证
- IDE 选择功能
- 备份和恢复机制
- 错误处理和回滚

### 兼容性测试
- 操作系统兼容性
- Node.js 版本兼容性
- 终端环境兼容性
- 网络环境适应性

### 性能测试
- 安装速度测试
- 内存使用测试
- 并发处理测试
- 大文件处理测试

### 安全测试
- 路径遍历防护
- 权限验证
- 输入验证
- 恶意代码检测

## 测试环境

### 操作系统
- **macOS**: 12.0+ (Monterey), 13.0+ (Ventura), 14.0+ (Sonoma)
- **Windows**: Windows 10, Windows 11
- **Linux**: Ubuntu 20.04+, CentOS 8+, Debian 11+

### Node.js 版本
- **最低版本**: 16.0.0
- **推荐版本**: 18.0.0+
- **测试版本**: 16.x, 18.x, 20.x

### 终端环境
- **macOS**: Terminal, iTerm2, Hyper
- **Windows**: PowerShell, CMD, Windows Terminal
- **Linux**: Bash, Zsh, Fish

## 测试用例

### 1. 功能测试用例

#### 1.1 交互式安装流程

| 用例ID | 描述 | 前置条件 | 测试步骤 | 预期结果 |
|--------|------|----------|----------|----------|
| TC-001 | 完整交互式安装 | 干净环境 | 1. 运行 `npx niopd install`<br>2. 按回车使用当前目录<br>3. 选择 Claude Code 和 iFlow CLI<br>4. 确认安装 | 安装成功，显示完成信息 |
| TC-002 | 自定义路径安装 | 干净环境 | 1. 运行安装命令<br>2. 输入自定义路径<br>3. 选择单个 IDE<br>4. 确认安装 | 安装到指定路径，验证文件存在 |
| TC-003 | 取消安装 | 任意环境 | 1. 运行安装命令<br>2. 在任意步骤按 Ctrl+C | 优雅退出，无残留文件 |
| TC-004 | 覆盖安装 | 已安装环境 | 1. 在已安装目录运行安装<br>2. 选择备份选项<br>3. 完成安装 | 创建备份，新文件覆盖旧文件 |

#### 1.2 静默安装模式

| 用例ID | 描述 | 命令 | 预期结果 |
|--------|------|------|----------|
| TC-005 | 默认静默安装 | `npx niopd install --silent` | 使用默认参数完成安装 |
| TC-006 | 指定路径静默安装 | `npx niopd install --silent --path /custom/path` | 安装到指定路径 |
| TC-007 | 指定IDE静默安装 | `npx niopd install --silent --ides claude` | 仅安装 Claude Code |
| TC-008 | 无备份静默安装 | `npx niopd install --silent --no-backup` | 直接覆盖，不创建备份 |

#### 1.3 路径验证

| 用例ID | 描述 | 测试路径 | 预期结果 |
|--------|------|----------|----------|
| TC-009 | 有效路径 | `/home/user/project` | 验证通过，继续安装 |
| TC-010 | 无效路径 | `/invalid/path` | 显示错误，要求重新输入 |
| TC-011 | 无权限路径 | `/root/protected` | 显示权限错误 |
| TC-012 | 相对路径 | `./my-project` | 正确解析为绝对路径 |
| TC-013 | 网络路径 | `\\server\share` | Windows 网络路径支持 |

### 2. 兼容性测试用例

#### 2.1 操作系统兼容性

| 环境 | 版本 | 测试重点 | 预期结果 |
|------|------|----------|----------|
| macOS | 12.7 | 权限、路径格式 | ✅ 完全支持 |
| macOS | 13.6 | 新特性兼容性 | ✅ 完全支持 |
| macOS | 14.0 | 最新系统支持 | ✅ 完全支持 |
| Windows | 10 22H2 | 路径分隔符、权限 | ✅ 完全支持 |
| Windows | 11 23H2 | 新终端特性 | ✅ 完全支持 |
| Ubuntu | 20.04 LTS | 包管理、权限 | ✅ 完全支持 |
| Ubuntu | 22.04 LTS | 系统兼容性 | ✅ 完全支持 |
| CentOS | 8 | 企业环境 | ✅ 完全支持 |

#### 2.2 Node.js 版本兼容性

| 版本 | 测试状态 | 备注 |
|------|----------|------|
| 16.0.0 | ✅ 通过 | 最低支持版本 |
| 16.20.0 | ✅ 通过 | LTS 版本 |
| 18.0.0 | ✅ 通过 | 稳定版本 |
| 18.17.0 | ✅ 通过 | 当前 LTS |
| 20.0.0 | ✅ 通过 | 最新版本 |
| 20.5.0 | ✅ 通过 | 推荐版本 |
| 21.0.0 | ⚠️ 测试 | 实验版本 |

#### 2.3 终端环境测试

| 终端 | 操作系统 | 特性测试 | 结果 |
|------|----------|----------|------|
| Terminal | macOS | 颜色、交互 | ✅ |
| iTerm2 | macOS | 高级特性 | ✅ |
| Hyper | macOS | 自定义主题 | ✅ |
| PowerShell | Windows | 原生支持 | ✅ |
| CMD | Windows | 基础功能 | ✅ |
| Windows Terminal | Windows | 新特性 | ✅ |
| Bash | Linux | 标准支持 | ✅ |
| Zsh | Linux | 高级特性 | ✅ |
| Fish | Linux | 现代 shell | ✅ |

### 3. 性能测试用例

#### 3.1 安装速度测试

| 场景 | 文件数量 | 网络条件 | 预期时间 | 实际时间 |
|------|----------|----------|----------|----------|
| 本地安装 | 74 个文件 | 本地磁盘 | < 3 秒 | 待测试 |
| 网络安装 | 74 个文件 | 100Mbps | < 5 秒 | 待测试 |
| 大文件安装 | 1000 个文件 | 本地磁盘 | < 10 秒 | 待测试 |
| 并发安装 | 多个项目 | 本地磁盘 | < 5 秒/项目 | 待测试 |

#### 3.2 内存使用测试

| 操作 | 峰值内存 | 平均内存 | 内存泄漏 |
|------|----------|----------|----------|
| 扫描文件 | < 50MB | < 20MB | 无 |
| 复制文件 | < 100MB | < 50MB | 无 |
| 创建备份 | < 200MB | < 100MB | 无 |
| 完整安装 | < 300MB | < 150MB | 无 |

#### 3.3 并发测试

| 并发数 | 成功率 | 平均时间 | 错误率 |
|--------|--------|----------|--------|
| 1 | 100% | 2.5s | 0% |
| 5 | 100% | 3.2s | 0% |
| 10 | 100% | 4.1s | 0% |
| 20 | 95% | 6.8s | 5% |

### 4. 错误处理测试用例

#### 4.1 网络错误

| 错误类型 | 模拟方法 | 预期处理 |
|----------|----------|----------|
| 网络断开 | 断网测试 | 显示网络错误，提供重试 |
| DNS 解析失败 | 修改 hosts | 显示 DNS 错误 |
| 超时 | 网络延迟模拟 | 显示超时错误 |
| 代理错误 | 配置错误代理 | 显示代理配置错误 |

#### 4.2 文件系统错误

| 错误类型 | 触发条件 | 预期处理 |
|----------|----------|----------|
| 权限不足 | 只读目录 | 显示权限错误，提供解决方案 |
| 磁盘空间不足 | 小磁盘空间 | 显示空间不足，建议清理 |
| 文件锁定 | 占用文件 | 显示文件占用，建议关闭程序 |
| 路径过长 | Windows 长路径 | 显示路径错误 |

#### 4.3 回滚机制测试

| 场景 | 触发方式 | 预期结果 |
|------|----------|----------|
| 安装中断 | 强制终止进程 | 自动回滚到初始状态 |
| 文件损坏 | 模拟损坏文件 | 检测到损坏，回滚并提示 |
| 权限变更 | 临时修改权限 | 检测到权限问题，回滚 |
| 磁盘故障 | 模拟磁盘错误 | 安全回滚，不损坏数据 |

### 5. 安全测试用例

#### 5.1 路径遍历防护

| 攻击向量 | 测试输入 | 预期结果 |
|----------|----------|----------|
| 相对路径 | `../../../etc/passwd` | 拒绝并显示错误 |
| 绝对路径 | `/etc/passwd` | 拒绝并显示错误 |
| 符号链接 | 恶意链接 | 检测并拒绝 |
| 特殊字符 | `test\0/path` | 清理或拒绝 |

#### 5.2 输入验证

| 输入类型 | 测试数据 | 验证结果 |
|----------|----------|----------|
| 空输入 | `''` | 显示必填错误 |
| 超长输入 | 1000字符路径 | 截断或拒绝 |
| 特殊字符 | `<script>alert('xss')</script>` | 转义或拒绝 |
| SQL注入 | `'; DROP TABLE users; --` | 清理或拒绝 |

#### 5.3 权限验证

| 权限场景 | 测试方法 | 预期结果 |
|----------|----------|----------|
| 无读权限 | chmod 000 目录 | 显示权限错误 |
| 无写权限 | chmod 444 目录 | 显示权限错误 |
| 无执行权限 | chmod 666 目录 | 显示权限错误 |
| 粘滞位目录 | /tmp 目录测试 | 正确处理 |

## 测试环境配置

### 1. 测试环境搭建

#### 1.1 本地测试环境
```bash
# 创建测试目录
mkdir -p ~/niopd-test/{macos,windows,linux}

# 安装测试依赖
npm install -g jest
npm install -g @types/jest
npm install -g ts-jest

# 设置测试环境变量
export NIOPD_TEST_MODE=true
export NIOPD_LOG_LEVEL=debug
```

#### 1.2 CI/CD 测试环境
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm run test:ci
    - run: npm run test:e2e
```

### 2. 测试数据准备

#### 2.1 测试项目结构
```
test-fixtures/
├── projects/
│   ├── empty-project/
│   ├── existing-claude/
│   ├── existing-iflow/
│   ├── both-ides/
│   └── large-project/
├── files/
│   ├── small-files/
│   ├── large-files/
│   └── corrupted-files/
└── configs/
    ├── valid-config.json
    └── invalid-config.json
```

#### 2.2 测试脚本
```javascript
// test/setup.js
const fs = require('fs-extra');
const path = require('path');

async function setupTestEnvironment() {
  const testDir = path.join(__dirname, 'temp');
  await fs.ensureDir(testDir);
  
  // 创建测试项目
  await createTestProjects(testDir);
  
  // 设置环境变量
  process.env.NIOPD_TEST_DIR = testDir;
  process.env.NODE_ENV = 'test';
}

async function teardownTestEnvironment() {
  const testDir = process.env.NIOPD_TEST_DIR;
  if (testDir) {
    await fs.remove(testDir);
  }
}

module.exports = {
  setupTestEnvironment,
  teardownTestEnvironment
};
```

## 测试执行计划

### 1. 测试阶段

#### 阶段1: 单元测试 (开发阶段)
- **时间**: 开发过程中持续进行
- **范围**: 单个函数、模块测试
- **工具**: Jest
- **覆盖率目标**: 90%+

#### 阶段2: 集成测试 (功能完成)
- **时间**: 功能开发完成后
- **范围**: 模块间交互测试
- **工具**: Jest + Supertest
- **覆盖率目标**: 80%+

#### 阶段3: 端到端测试 (发布前)
- **时间**: 发布前1周
- **范围**: 完整用户流程测试
- **工具**: Puppeteer + Jest
- **测试场景**: 所有用户场景

#### 阶段4: 兼容性测试 (发布前)
- **时间**: 发布前3天
- **范围**: 多平台、多版本测试
- **工具**: GitHub Actions + Docker
- **平台**: macOS, Windows, Linux

### 2. 测试执行命令

```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行集成测试
npm run test:integration

# 运行端到端测试
npm run test:e2e

# 运行兼容性测试
npm run test:compatibility

# 运行性能测试
npm run test:performance

# 运行安全测试
npm run test:security

# 生成测试报告
npm run test:report
```

### 3. 测试报告

#### 3.1 测试报告格式
```json
{
  "summary": {
    "totalTests": 150,
    "passed": 145,
    "failed": 3,
    "skipped": 2,
    "coverage": {
      "statements": 92,
      "branches": 88,
      "functions": 95,
      "lines": 93
    }
  },
  "details": {
    "unitTests": {
      "total": 100,
      "passed": 98,
      "failed": 2
    },
    "integrationTests": {
      "total": 30,
      "passed": 30,
      "failed": 0
    },
    "e2eTests": {
      "total": 20,
      "passed": 17,
      "failed": 1,
      "skipped": 2
    }
  }
}
```

## 测试工具配置

### 1. Jest 配置
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'lib/**/*.js',
    'bin/**/*.js',
    '!lib/**/*.test.js',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '**/test/**/*.test.js',
    '**/test/**/*.spec.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  testTimeout: 30000
};
```

### 2. E2E 测试配置
```javascript
// test/e2e/config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/e2e/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/test/e2e/setup.js'],
  testTimeout: 60000,
  globalSetup: '<rootDir>/test/e2e/global-setup.js',
  globalTeardown: '<rootDir>/test/e2e/global-teardown.js'
};
```

## 测试验收标准

### 1. 功能验收标准
- ✅ 所有用户场景都能正常完成
- ✅ 错误处理覆盖所有已知错误类型
- ✅ 回滚机制在失败时能正确执行
- ✅ 用户界面响应时间 < 100ms

### 2. 性能验收标准
- ✅ 安装时间 < 5 秒（标准项目）
- ✅ 内存使用 < 200MB
- ✅ CPU 使用率 < 50%
- ✅ 并发安装成功率 > 95%

### 3. 兼容性验收标准
- ✅ 支持所有目标操作系统
- ✅ 支持所有目标 Node.js 版本
- ✅ 支持所有目标终端环境
- ✅ 国际化支持完整

### 4. 安全验收标准
- ✅ 通过所有安全测试用例
- ✅ 无已知安全漏洞
- ✅ 输入验证覆盖所有用户输入
- ✅ 权限验证完整

## 测试完成标准

测试完成需要满足以下条件：

1. **功能测试**: 所有测试用例通过
2. **代码覆盖率**: 语句覆盖率 ≥ 90%
3. **性能测试**: 所有性能指标达标
4. **安全测试**: 无高危安全漏洞
5. **兼容性测试**: 所有目标平台通过
6. **文档**: 测试报告完整
7. **回归测试**: 无回归缺陷

## 测试时间表

| 阶段 | 时间 | 里程碑 |
|------|------|--------|
| 单元测试 | 3 天 | 所有单元测试通过 |
| 集成测试 | 2 天 | 所有集成测试通过 |
| 端到端测试 | 2 天 | 所有用户场景通过 |
| 兼容性测试 | 1 天 | 所有平台通过 |
| 性能测试 | 1 天 | 所有性能指标达标 |
| 安全测试 | 1 天 | 无安全漏洞 |
| 回归测试 | 1 天 | 无回归缺陷 |

**总计**: 11 个工作日