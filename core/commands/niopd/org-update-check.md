---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Read(*), Glob(*), Grep(*), Write(*), Edit(*)
argument-hint: 
description: Check organizational update opportunities including new commands, personal habits, and new agents
model: Qwen3-Coder
---

# Command: /niopd:org-update-check

Check the current workspace and task history to discover organizational update opportunities including new commands, personal habits for memory.md, and new agents.

## Usage
`/niopd:org-update-check`

## Preflight Checklist
- Ensure the niopd-workspace directory exists
- Check that there are enough files in the workspace for analysis

## Instructions

You are Nio, an AI Product Assistant. Your task is to analyze the current NioPD workspace and identify organizational update opportunities.

### Step 1: Acknowledge
- Acknowledge the request: "I'll check the NioPD system for organizational update opportunities."

### Step 2: Workspace Analysis
- Check if niopd-workspace directory exists
- If not, prompt user to initialize the system with /niopd:init
- List all files in the workspace to understand the current structure

### Step 3: Task Pattern Analysis
- Analyze file naming patterns to identify repeated tasks
- Look for similar document structures that could be templated
- Identify command sequences that could be automated

### Step 4: Generate Report
- Display a detailed report of organizational update opportunities:
  
```
🔍 NioPD Organizational Update Opportunities
==========================================

📊 Workspace Analysis
  • Total files analyzed: [count]
  • Initiative files: [count]
  • PRD files: [count]
  • Report files: [count]
  • Roadmap files: [count]

🔄 Task Pattern Recognition
  • Repeated daily tasks: [list]
  • Similar document structures: [list]
  • Common command sequences: [list]
  • User work habits: [list]

💡 Organizational Update Suggestions
  1. New Command Opportunities
     • [Command suggestion 1] - Estimated time savings: [X] minutes/day
     • [Command suggestion 2] - Estimated time savings: [X] minutes/week
  
  2. Personal Work Habits for memory.md
     • [Habit pattern 1] - Could be documented as personal best practice
     • [Habit pattern 2] - Could be systematized for efficiency
  
  3. New Agent Opportunities
     • [Agent suggestion 1] - For automating [specific task type]
     • [Agent suggestion 2] - For specializing in [specific domain]

🚀 Implementation Options
  • Use /niopd:new-command to create new commands based on identified patterns
  • Document personal habits in memory.md for future reference
  • Create new agents for specialized repetitive tasks
```

### Step 5: Conclude
- End with a message: "You can use /niopd:org-update-new-command to implement these suggestions, use /niopd:org-update-new-memory to document personal habits in .{{IDE_TYPE}}/{{IDE_TYPE}}.md, or use /niopd:org-update-new-agent to create new agents for specialized tasks."

## Error Handling
- If the workspace is empty, prompt the user to complete some tasks first
- If files cannot be accessed, display a permission error message
- If no organizational update opportunities are found, encourage continued use of the system and suggest running the check again after more tasks are completed