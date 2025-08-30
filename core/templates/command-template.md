---
allowed-tools: List of tools the command can use. Example: Bash(git add:*), Bash(git status:*), Bash(git commit:*) Default: Inherits from the conversation
argument-hint: The arguments expected for the slash command. Example: argument-hint: add [tagId] | remove [tagId] | list. This hint is shown to the user when auto-completing the slash command. Default: None
description: Brief description of the command. Default: Uses the first line from the prompt.
model: claude-3-5-haiku-20241022. Default: Inherits from the conversation
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
