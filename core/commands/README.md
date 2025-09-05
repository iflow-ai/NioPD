# NioPD Commands Directory

This directory contains all the command definitions for the NioPD system. Commands are organized in the NioPD subdirectory to provide namespace isolation.

## Command Structure

Each command file follows a consistent structure:

```
---
allowed-tools: List of tools the command can use. Example: Bash(git add:*), Bash(git status:*), Bash(git commit:*) Default: Inherits from the conversation
argument-hint: The arguments expected for the slash command. Example: argument-hint: add [tagId] | remove [tagId] | list. This hint is shown to the user when auto-completing the slash command. Default: None
description: Brief description of the command. Default: Uses the first line from the prompt.
model: Qwen3-Coder. Default: Inherits from the conversation
---

# Command: /niopd:command-name

Brief description of what the command does.

## Usage
`/niopd:command-name [arguments]`

## Preflight Checklist
- Validation steps to perform before executing the command

## Instructions
Step-by-step instructions for executing the command:

1. First step
2. Second step
3. ...

## Error Handling
Guidance on how to handle various error conditions.
```

## Available Commands

All NioPD commands are located in the [NioPD](niopd/) subdirectory:

### Core Workflow Commands
- [hi.md](niopd/hi.md) - Initiates a conversation with Nio, your product management supervisor
- [new-initiative.md](niopd/new-initiative.md) - Start a new high-level product initiative
- [import-feedback.md](NiniopdoPD/import-feedback.md) - Import a file of user feedback
- [summarize-feedback.md](niopd/summarize-feedback.md) - Analyze a feedback file and create a summary report
- [draft-prd.md](niopd/draft-prd.md) - Automatically generate a PRD draft from an initiative and feedback
- [edit-prd.md](niopd/edit-prd.md) - Get instructions to manually edit a PRD
- [update-roadmap.md](niopd/update-roadmap.md) - Generate or update the product roadmap from all initiatives
- [help.md](niopd/help.md) - Display help information about the NioPD system

### Advanced Discovery Commands
- [analyze-competitor.md](NiniopdoPD/analyze-competitor.md) - Analyzes a competitor's website for key features and positioning
- [summarize-interview.md](niopd/summarize-interview.md) - Summarizes a user interview transcript
- [analyze-data.md](niopd/analyze-data.md) - Answers a natural language question about a structured data file
- [generate-personas.md](niopd/generate-personas.md) - Creates user personas from a feedback summary
- [research-trends.md](niopd/research-trends.md) - Researches and summarizes market trends on a given topic

### Advanced Launch Commands
- [generate-update.md](niopd/generate-update.md) - Create a concise stakeholder update report
- [track-kpis.md](niopd/track-kpis.md) - Get a status report on an initiative's KPIs
- [write-stories.md](niopd/write-stories.md) - Writes detailed user stories and acceptance criteria for a PRD
- [generate-faq.md](niopd/generate-faq.md) - Generates a FAQ document for a PRD

## Creating New Commands

To create a new command:

1. Create a new markdown file in the [NioPD](niopd/) subdirectory
2. Follow the structure outlined above
3. Use the naming convention `[command-name].md`
4. Define clear usage instructions and arguments
5. Include preflight validation steps
6. Provide detailed step-by-step execution instructions
7. Add error handling guidance
8. Update the main [COMMANDS.md](../../COMMANDS.md) documentation

**Example of create a new command:**
```
Add New Commands: `/niopd:draft-prd "Feature Name"`, This command automatically generates a Product Requirements Document (PRD) for the specified feature based on historical data and existing initiatives.
```

## Best Practices

1. **Clear Naming**: Use descriptive command names that clearly indicate their function
2. **Consistent Structure**: Follow the standard command structure for all commands
3. **Validation First**: Always include preflight validation steps
4. **Detailed Instructions**: Provide clear, step-by-step instructions
5. **Error Handling**: Include guidance for handling common error scenarios
6. **Tool Usage**: Specify only the tools that are necessary for the command's execution
