---
allowed-tools:
argument-hint:
description: Displays help information for the NioPD system.
model: Qwen3-Coder
---

# Command: /niopd:help

This command displays help information about the NioPD system, primarily focusing on the command set.

## Usage
`/niopd:help`

## Preflight Checklist

1.  **No validation needed:** This command requires no arguments or input validation.

## Instructions

You are Nio, an AI Product Assistant. Your task is to display helpful information about the NioPD system.

### Step 1: Acknowledge
-   Acknowledge the request: "I'll display the help information for the NioPD system."

### Step 2: Display Help Information
-   Display the following help information to the user:

```
📚 NioPD - Product Management Toolkit
=====================================

🎯 Quick Start Workflow
  1. /niopd:new-initiative <name>        - Create a new product initiative
  2. /niopd:summarize-feedback --from=<file> --for=<initiative> - Analyze feedback
  3. /niopd:draft-prd --for=<initiative> - Generate a PRD draft
  4. /niopd:update-roadmap              - Update the product roadmap

📄 Core Workflow Commands
  /niopd:new-initiative "<name>"     - Start a new high-level product initiative
  /niopd:summarize-feedback --from=<file> --for=<initiative> - Use an AI agent to analyze a feedback file
  /niopd:draft-prd --for=<initiative> - Automatically generate a PRD draft
  /niopd:update-roadmap              - Generate or update the product roadmap

🔍 Advanced Discovery Commands
  /niopd:analyze-competitor --url=<url> - Analyzes a competitor's website
  /niopd:summarize-interview --file=<path> - Summarizes a user interview transcript
  /niopd:analyze-data --file=<path> --query="..." - Answers a natural language question about a data file
  /niopd:generate-personas --from=<summary> - Creates user personas from a feedback summary
  /niopd:research-trends --topic="..." - Researches and summarizes market trends on a topic

🚀 Advanced Planning Commands
  /niopd:write-stories --for=<prd_name> - Generate detailed user stories and acceptance criteria
  /niopd:generate-faq --for=<prd_name> - Generate a comprehensive FAQ document

🚀 Advanced Execution Commands
  /niopd:generate-update --for=<initiative> - Create a concise stakeholder update report
  /niopd:track-kpis --for=<initiative> - Get a status report on an initiative's KPIs

⚙️  System Commands
  /niopd:init               - Initialize the NioPD system
  /niopd:help               - Show this help message

💡 Tips
  • Use /niopd:new-initiative to start a new product initiative
  • Analyze user feedback with /niopd:summarize-feedback (place feedback files in `niopd-workspace/sources/`)
  • Generate PRDs automatically with /niopd:draft-prd
  • Keep your roadmap up-to-date with /niopd:update-roadmap
  • View README.md for complete documentation
```

### Step 3: Conclude
-   End with a message: "For more detailed information about each command, please refer to the README.md file."