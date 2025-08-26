# NioPD Commands Directory

This directory contains all the command definitions for the NioPD system. Commands are organized in the NioPD subdirectory to provide namespace isolation.

## Command Structure

Each command file follows a consistent structure:

```
---
allowed-tools: [List of tools the command is allowed to use]
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

All NioPD commands are located in the [NioPD](NioPD/) subdirectory:

### Core Workflow Commands
- [new-initiative.md](NioPD/new-initiative.md) - Start a new high-level product initiative
- [import-feedback.md](NioPD/import-feedback.md) - Import a file of user feedback
- [summarize-feedback.md](NioPD/summarize-feedback.md) - Analyze a feedback file and create a summary report
- [draft-prd.md](NioPD/draft-prd.md) - Automatically generate a PRD draft from an initiative and feedback
- [edit-prd.md](NioPD/edit-prd.md) - Get instructions to manually edit a PRD
- [update-roadmap.md](NioPD/update-roadmap.md) - Generate or update the product roadmap from all initiatives
- [help.md](NioPD/help.md) - Display help information about the NioPD system

### Advanced Discovery Commands
- [analyze-competitor.md](NioPD/analyze-competitor.md) - Analyzes a competitor's website for key features and positioning
- [summarize-interview.md](NioPD/summarize-interview.md) - Summarizes a user interview transcript
- [analyze-data.md](NioPD/analyze-data.md) - Answers a natural language question about a structured data file
- [generate-personas.md](NioPD/generate-personas.md) - Creates user personas from a feedback summary
- [research-trends.md](NioPD/research-trends.md) - Researches and summarizes market trends on a given topic

### Advanced Launch Commands
- [generate-update.md](NioPD/generate-update.md) - Create a concise stakeholder update report
- [track-kpis.md](NioPD/track-kpis.md) - Get a status report on an initiative's KPIs

## Creating New Commands

To create a new command:

1. Create a new markdown file in the [NioPD](NioPD/) subdirectory
2. Follow the structure outlined above
3. Use the naming convention `[command-name].md`
4. Define clear usage instructions and arguments
5. Include preflight validation steps
6. Provide detailed step-by-step execution instructions
7. Add error handling guidance
8. Update the main [COMMANDS.md](../../COMMANDS.md) documentation

## Best Practices

1. **Clear Naming**: Use descriptive command names that clearly indicate their function
2. **Consistent Structure**: Follow the standard command structure for all commands
3. **Validation First**: Always include preflight validation steps
4. **Detailed Instructions**: Provide clear, step-by-step instructions
5. **Error Handling**: Include guidance for handling common error scenarios
6. **Tool Usage**: Specify only the tools that are necessary for the command's execution