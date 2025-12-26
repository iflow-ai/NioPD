# NioPD Commands

This document is a complete reference for all commands available in the NioPD system.

## Table of Contents

- [System Initialization](#system-initialization)
- [Core Workflow Commands](#core-workflow-commands)
- [Advanced Discovery Commands](#advanced-discovery-commands)
- [Advanced Planning Commands](#advanced-planning-commands)
- [Advanced Launch Commands](#advanced-launch-commands)

---

## System Initialization

### `/niopd:init`
- **Purpose**: Initialize the NioPD system by creating the necessary directory structure.
- **Usage**: `/niopd:init`
- **Output**: Creates the required data directories in `niopd-workspace/`.

### `/niopd:help`
- **Purpose**: Display help information about the NioPD system and its commands.
- **Usage**: `/niopd:help`
- **Output**: Displays a help message with command usage information.

### `/niopd:hi`
- **Purpose**: Initiates a conversation with Nio, your product management supervisor.
- **Usage**: `/niopd:hi`
- **Output**: A continuous, interactive conversation with the Nio agent.

---

## Core Workflow Commands

These are the fundamental commands for moving from an idea to a plan.

### `/niopd:new-initiative`
- **Purpose**: Start a new high-level product initiative.
- **Usage**: `/niopd:new-initiative "<initiative_name>"`
- **Output**: A new initiative file in `niopd-workspace/initiatives/`.

### `/niopd:summarize-feedback`
- **Purpose**: Analyze a feedback file and create a summary report.
- **Usage**: `/niopd:summarize-feedback --from=<file> --for=<initiative>`
- **Output**: A summary report in `niopd-workspace/reports/`.

### `/niopd:draft-prd`
- **Purpose**: Automatically generate a PRD draft from an initiative and feedback.
- **Usage**: `/niopd:draft-prd --for=<initiative>`
- **Output**: A new PRD file in `niopd-workspace/prds/`.

### `/niopd:update-roadmap`
- **Purpose**: Generate or update the product roadmap from all initiatives.
- **Usage**: `/niopd:update-roadmap`
- **Output**: A roadmap file in `niopd-workspace/roadmaps/`.

---

## Advanced Discovery Commands

Commands to help with research, discovery, and understanding the market and users.

### `/niopd:analyze-competitor`
- **Purpose**: Analyzes a competitor's website for key features and positioning.
- **Usage**: `/niopd:analyze-competitor --url=<url>`
- **Output**: A competitor analysis report.

### `/niopd:summarize-interview`
- **Purpose**: Summarizes a user interview transcript, extracting key themes and quotes.
- **Usage**: `/niopd:summarize-interview --file=<path>`
- **Output**: An interview summary report.

### `/niopd:analyze-data`
- **Purpose**: Answers a natural language question about a structured data file (e.g., CSV).
- **Usage**: `/niopd:analyze-data --file=<path> --query="..."`
- **Output**: A data analysis report with the answer and methodology.

### `/niopd:generate-personas`
- **Purpose**: Creates user personas from a feedback summary.
- **Usage**: `/niopd:generate-personas --from=<summary_file>`
- **Output**: A document containing 2-3 user personas.

### `/niopd:user-journey`
- **Purpose**: Generates a user journey map for an initiative or feature.
- **Usage**: `/niopd:user-journey --for=<initiative_name> [--persona=<persona_name>]`
- **Output**: A user journey map with stages, touchpoints, emotions, and opportunities in `niopd-workspace/reports/`.

### `/niopd:research-trends`
- **Purpose**: Researches and summarizes market trends on a given topic using web search.
- **Usage**: `/niopd:research-trends --topic="..."`
- **Output**: A market trend report with key findings and sources.

---

## Advanced Planning Commands

Commands to assist with the details of planning and defining features.

### `/niopd:draw-diagram`
- **Purpose**: Creates a Mermaid diagram from a text description.
- **Usage**: `/niopd:draw-diagram --type=<type> --desc="..." [--for=<initiative>]`
- **Supported Types**: flowchart, sequence, class, er, mindmap, gantt
- **Output**: A diagram document in `niopd-workspace/reports/`.

*Note: The following advanced planning commands are planned for future implementation and are not yet available.*

### `/niopd:assess-feasibility` *(Coming Soon)*
- **Purpose**: Flags technically complex or risky requirements in a PRD.
- **Usage**: `/niopd:assess-feasibility --for=<prd_name>`
- **Output**: An assessment report.

### `/niopd:write-stories`
- **Purpose**: Writes detailed user stories and acceptance criteria for a PRD.
- **Usage**: `/niopd:write-stories --for=<prd_name>`
- **Output**: An updated PRD or a separate user story document.

### `/niopd:identify-risks` *(Coming Soon)*
- **Purpose**: Identifies potential market, technical, or dependency risks for an initiative.
- **Usage**: `/niopd:identify-risks --for=<initiative_name>`
- **Output**: A risk assessment report.

---

## Organizational Update Commands

Commands to help with organizational self-evolution and optimization.

### `/niopd:org-update-check`
- **Purpose**: Check organizational update opportunities including new commands, personal habits, and new agents.
- **Usage**: `/niopd:org-update-check`
- **Output**: A report of organizational update opportunities based on current workspace analysis.

### `/niopd:org-update-new-command`
- **Purpose**: Create a new user-defined command based on recent task context.
- **Usage**: `/niopd:org-update-new-command [task description]`
- **Output**: A new command structure and implementation guidance.

### `/niopd:org-update-new-agent`
- **Purpose**: Create a new agent based on task requirements.
- **Usage**: `/niopd:org-update-new-agent [agent description]`
- **Output**: A new agent structure and implementation guidance.

### `/niopd:org-update-new-memory`
- **Purpose**: Identify, record and manage personal work habits.
- **Usage**: `/niopd:org-update-new-memory [habit description]`
- **Output**: Personal work habits documentation in the IDE configuration file.

---

## Advanced Launch Commands

Commands to help with the go-to-market and launch process.

### `/niopd:generate-update`
- **Purpose**: Create a concise stakeholder update report for an initiative.
- **Usage**: `/niopd:generate-update --for=<initiative_name>`
- **Output**: A stakeholder update report.

### `/niopd:track-kpis`
- **Purpose**: Get a status report on an initiative's KPIs.
- **Usage**: `/niopd:track-kpis --for=<initiative_name>`
- **Output**: A KPI status report.

*Note: The following advanced launch commands are planned for future implementation and are not yet available.*

### `/niopd:draft-release-notes` *(Coming Soon)*
- **Purpose**: Generates draft release notes for a feature based on its PRD.
- **Usage**: `/niopd:draft-release-notes --for=<prd_name>`
- **Output**: A draft of release notes.

### `/niopd:generate-faq`
- **Purpose**: Creates a list of FAQs for a new feature.
- **Usage**: `/niopd:generate-faq --for=<prd_name>`
- **Output**: A FAQ document.

### `/niopd:generate-checklist`
- **Purpose**: Generates a product checklist for launch, acceptance testing, or QA.
- **Usage**: `/niopd:generate-checklist --for=<prd_name> [--type=<launch|acceptance|qa>]`
- **Supported Types**: launch (default), acceptance, qa
- **Output**: A checklist document in `niopd-workspace/reports/`.

### `/niopd:simplify-update` *(Coming Soon)*
- **Purpose**: Tailors a stakeholder update for a specific audience.
- **Usage**: `/niopd:simplify-update --for=<initiative_name> --audience=...`
- **Output**: A rewritten, audience-specific update.

### `/niopd:brainstorm-names` *(Coming Soon)*
- **Purpose**: Brainstorms creative names for a new feature.
- **Usage**: `/niopd:brainstorm-names --desc="..."`
- **Output**: A list of potential names.