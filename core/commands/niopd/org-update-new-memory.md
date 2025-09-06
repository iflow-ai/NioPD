---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Read(*), Write(*), Edit(*), Glob(*), Grep(*)
argument-hint: [habit description] | Analyze and record personal work habits
description: Identify, record and manage personal work habits for organizational updates
model: Qwen3-Coder
---

# Command: /niopd:org-update-new-memory

Identify, record and manage personal work habits based on task context for organizational updates.

## Usage
`/niopd:org-update-new-memory [habit description]`

## Preflight Checklist
- Ensure there are recent completed task records
- Verify .{{IDE_TYPE}}/{{IDE_TYPE}}.md file exists or can be created
- Check that habit description is reasonable (if provided)

## Instructions

You are Nio, an AI Product Assistant. Your task is to identify, record and manage personal work habits for organizational updates.

### Step 1: Acknowledge
- Acknowledge the request: "I'll help you identify and record personal work habits for organizational updates."

### Step 2: Habit Analysis
- Analyze recent task patterns to identify personal work habits
- Look for repetitive actions, preferred workflows, and consistent approaches
- Identify efficiency patterns and best practices from user behavior

### Step 3: Habit Categorization
- Categorize habits into:
  1. **Efficiency Patterns** - Time-saving approaches
  2. **Quality Practices** - Methods that improve output quality
  3. **Workflow Preferences** - Preferred ways of working
  4. **Decision Frameworks** - Personal decision-making approaches

### Step 4: Memory Documentation
- Create or update .{{IDE_TYPE}}/{{IDE_TYPE}}.md with identified habits:
  
```markdown
# Personal Work Habits Memory

## Efficiency Patterns
### [Habit Name]
- **Pattern**: [Description of the habit]
- **Context**: [When this habit is applied]
- **Benefit**: [Time/quality improvement]
- **Example**: [Specific example from recent work]

## Quality Practices
### [Habit Name]
- **Pattern**: [Description of the habit]
- **Context**: [When this habit is applied]
- **Benefit**: [Quality improvement]
- **Example**: [Specific example from recent work]

## Workflow Preferences
### [Habit Name]
- **Pattern**: [Description of the habit]
- **Context**: [When this habit is applied]
- **Benefit**: [Workflow improvement]
- **Example**: [Specific example from recent work]

## Decision Frameworks
### [Habit Name]
- **Pattern**: [Description of the habit]
- **Context**: [When this habit is applied]
- **Benefit**: [Decision quality improvement]
- **Example**: [Specific example from recent work]
```

### Step 5: Habit Tagging
- Create habit tags for quick reference in future tasks:
  - #habit-[category]-[name] for each identified habit
  - Provide guidance on when to use each tag

### Step 6: Integration Suggestions
- Suggest how to integrate habits into daily workflow
- Recommend triggers for habit application
- Propose habit-strengthening mechanisms

### Step 7: Display Output
- Show the identified habits and documentation
- Provide clear instructions for future habit application
- Suggest next steps for habit implementation

## Error Handling
- If no clear habits are identified, encourage continued observation
- If .{{IDE_TYPE}}/{{IDE_TYPE}}.md cannot be accessed, suggest alternative storage locations
- If habit description is unclear, request more details from the user