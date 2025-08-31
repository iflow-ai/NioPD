# NioPD 通用IDE路径解决方案测试用例

## 测试概述
测试NioPD系统对claude和iflow两种IDE模式的通用路径支持，确保路径替换正确，安装流程正常。

## 测试环境
- 操作系统: macOS Darwin 24.5.0
- Node.js版本: 最新稳定版
- 测试目录: /Users/linshirong/workspace/NioPD

## 测试用例列表

### TC-001: 模板处理引擎基础功能测试
**测试目的**: 验证TemplateProcessor类的基本功能
**前置条件**: 模板处理引擎已部署
**测试步骤**:
1. 创建TemplateProcessor实例，指定ideType为'claude'
2. 创建TemplateProcessor实例，指定ideType为'iflow'
3. 验证变量映射正确性
4. 测试模板内容处理

**预期结果**:
- claude模式下变量映射为.claude相关路径
- iflow模式下变量映射为.iflow相关路径
- 模板变量正确替换

### TC-002: 路径替换准确性测试
**测试目的**: 验证各种路径格式的正确替换
**测试步骤**:
1. 测试脚本路径替换 (.claude/scripts/niopd/)
2. 测试命令路径替换 (.claude/commands/niopd/)
3. 测试代理路径替换 (.claude/agents/niopd/)
4. 测试模板路径替换 (.claude/templates/)
5. 测试基础目录替换 (.claude/)

**预期结果**:
- 所有.claude路径在iflow模式下替换为.iflow
- 所有.claude路径在claude模式下保持不变
- 引号内的路径也正确替换

### TC-003: 模板文件处理测试
**测试目的**: 验证模板文件(.template)的正确处理
**测试步骤**:
1. 读取init.md.template文件
2. 使用TemplateProcessor处理内容
3. 验证输出内容中的路径
4. 检查是否包含正确的IDE目录

**预期结果**:
- 模板变量{{SCRIPTS_DIR}}等正确替换
- 最终输出不包含.claude硬编码路径
- 文件内容格式保持正确

### TC-004: Claude模式完整安装测试
**测试目的**: 验证claude模式的完整安装流程
**测试步骤**:
1. 运行安装器，选择claude模式
2. 验证生成的目录结构
3. 检查所有命令文件中的路径
4. 检查所有脚本文件中的路径

**预期结果**:
- 目录结构为.claude/commands/niopd/
- 所有文件路径使用.claude前缀
- 安装成功无错误

### TC-005: iFlow模式完整安装测试
**测试目的**: 验证iflow模式的完整安装流程
**测试步骤**:
1. 运行安装器，选择iflow模式
2. 验证生成的目录结构
3. 检查所有命令文件中的路径
4. 检查所有脚本文件中的路径

**预期结果**:
- 目录结构为.iflow/commands/niopd/
- 所有文件路径使用.iflow前缀
- 安装成功无错误

### TC-006: 多IDE同时安装测试
**测试目的**: 验证同时安装claude和iflow两种模式
**测试步骤**:
1. 运行安装器，同时选择claude和iflow
2. 验证两种目录结构都存在
3. 检查各自模式下的路径正确性

**预期结果**:
- 同时存在.claude和.iflow目录
- 各自目录下的文件路径正确
- 无路径冲突

### TC-007: 向后兼容性测试
**测试目的**: 验证现有.claude用户不受影响
**测试步骤**:
1. 模拟现有.claude安装
2. 运行新安装器
3. 验证现有功能正常

**预期结果**:
- 现有.claude安装不受影响
- 新功能不破坏旧功能

### TC-008: 错误处理测试
**测试目的**: 验证错误处理机制
**测试步骤**:
1. 测试无效IDE类型
2. 测试文件权限问题
3. 测试模板文件缺失

**预期结果**:
- 提供清晰的错误信息
- 优雅处理异常情况

## 测试数据

### 测试输入数据
```javascript
// 模板变量测试
const templateVars = {
  claude: {
    '{{IDE_DIR}}': '.claude',
    '{{SCRIPTS_DIR}}': '.claude/scripts/niopd',
    '{{COMMANDS_DIR}}': '.claude/commands/niopd',
    '{{AGENTS_DIR}}': '.claude/agents/niopd',
    '{{TEMPLATES_DIR}}': '.claude/templates'
  },
  iflow: {
    '{{IDE_DIR}}': '.iflow',
    '{{SCRIPTS_DIR}}': '.iflow/scripts/niopd',
    '{{COMMANDS_DIR}}': '.iflow/commands/niopd',
    '{{AGENTS_DIR}}': '.iflow/agents/niopd',
    '{{TEMPLATES_DIR}}': '.iflow/templates'
  }
};

// 测试内容样本
const testContent = {
  command: 'allowed-tools: Bash(.claude/scripts/niopd/init.sh:*)',
  script: 'if [ ! -d ".claude" ]; then',
  agent: 'Read instructions from .claude/agents/niopd/competitor-analyzer.md'
};
```

### 预期输出数据
```javascript
// iflow模式预期输出
const expectedIflow = {
  command: 'allowed-tools: Bash(.iflow/scripts/niopd/init.sh:*)',
  script: 'if [ ! -d ".iflow" ]; then',
  agent: 'Read instructions from .iflow/agents/niopd/competitor-analyzer.md'
};

// claude模式预期输出
const expectedClaude = {
  command: 'allowed-tools: Bash(.claude/scripts/niopd/init.sh:*)',
  script: 'if [ ! -d ".claude" ]; then',
  agent: 'Read instructions from .claude/agents/niopd/competitor-analyzer.md'
};
```

## 测试执行步骤

### 阶段1: 单元测试
1. 测试TemplateProcessor类
2. 测试路径替换逻辑
3. 测试模板文件处理

### 阶段2: 集成测试
1. 测试安装器集成
2. 测试文件复制流程
3. 测试目录结构生成

### 阶段3: 端到端测试
1. 完整安装流程测试
2. 功能验证测试
3. 回归测试

## 测试通过标准
- 所有测试用例执行通过
- 路径替换准确率100%
- 安装成功率100%
- 无回归问题

## 测试报告格式
每个测试用例将包含:
- 测试编号和标题
- 执行结果(通过/失败)
- 实际输出与预期对比
- 错误信息(如有)
- 性能指标(如适用)