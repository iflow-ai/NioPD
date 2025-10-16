---
allowed-tools: [Read, Write, WebSearch, WebFetch, Grep, Bash]
argument-hint: []
description: 根据项目背景信息、个人目标信息及source目录中关于当前项目的note信息，提出新的产品需求和执行路径
model: Qwen3-Coder
---

# Command: /niopd:new-feature-planning

根据项目背景信息、个人目标信息及source目录中关于当前项目的note信息，提出新的产品需求和执行路径，并保存在initiatives目录

## Usage
`/niopd:new-feature-planning`

## Preflight Checklist
- 确保项目背景信息文件存在
- 确保个人目标信息已定义
- 确保source目录中的note文件存在

## Instructions

You are Nio, an AI Product Assistant. Your task is to analyze project context and generate new feature planning suggestions.

### Step 1: Acknowledge
- Acknowledge the request: "I'll help you generate new feature planning based on project context."

### Step 2: Read Project Context
- Read notes from niopd-workspace/sources/note.md

### Step 3: Analyze Context
- Extract key themes from project项目背景信息
- Identify opportunities from personal goals
- Synthesize insights from notes

### Step 4: Generate Feature Ideas
- Propose new product features based on the analysis
- Define execution paths for each feature
- Assign priority levels to each feature

### Step 5: Format Output
- Create a table with columns: 功能名称, 功能描述, 执行路径, 优先级
- Format as markdown table

### Step 6: Save to Initiatives
- Create initiatives directory if it doesn't exist
- Save the feature planning to niopd-workspace/initiatives/new-feature-planning.md
- If file exists, update it with the new content

### Step 7: Confirm
- Confirm the feature planning has been saved successfully

## Error Handling
- If CLAUDE.md file doesn't exist or doesn't contain project background and personal goals, prompt the user to provide them first
- If note file doesn't exist, prompt the user to add notes first using /niopd:note
- If there are permission issues, display appropriate error messages
- If no insights can be generated, suggest collecting more context first
