# NioPD Commands

This document is a complete reference for all commands available in the NioPD system.

## Table of Contents

- [Core Workflow Commands](#core-workflow-commands)
- [Advanced Discovery Commands](#advanced-discovery-commands)
- [Advanced Planning Commands](#advanced-planning-commands)
- [Advanced Launch Commands](#advanced-launch-commands)

---

## Core Workflow Commands

These are the fundamental commands for moving from an idea to a plan.

### `/pd:new-initiative`
- **Purpose**: Start a new high-level product initiative.
- **Usage**: `/pd:new-initiative "<initiative_name>"`
- **Output**: A new initiative file in `.iflow/data/initiatives/`.

### `/pd:import-feedback`
- **Purpose**: Import a file of user feedback.
- **Usage**: `/pd:import-feedback --from=<path> --for=<initiative>`
- **Output**: A copy of the feedback file in `.iflow/data/feedback-sources/`.

### `/pd:summarize-feedback`
- **Purpose**: Analyze a feedback file and create a summary report.
- **Usage**: `/pd:summarize-feedback --from=<file> --for=<initiative>`
- **Output**: A summary report in `.iflow/data/reports/`.

### `/pd:draft-prd`
- **Purpose**: Automatically generate a PRD draft from an initiative and feedback.
- **Usage**: `/pd:draft-prd --for=<initiative>`
- **Output**: A new PRD file in `.iflow/data/prds/`.

### `/pd:edit-prd`
- **Purpose**: Get instructions to manually edit a PRD.
- **Usage**: `/pd:edit-prd <prd_name>`
- **Output**: A message with the file path and instructions.

### `/pd:update-roadmap`
- **Purpose**: Generate or update the product roadmap from all initiatives.
- **Usage**: `/pd:update-roadmap`
- **Output**: A roadmap file in `.iflow/data/roadmaps/`.

---

## Advanced Discovery Commands

Commands to help with research, discovery, and understanding the market and users.

### `/pd:analyze-competitor`
- **Purpose**: Analyzes a competitor's website for key features and positioning.
- **Usage**: `/pd:analyze-competitor --url=<url>`
- **Output**: A competitor analysis report.

### `/pd:summarize-interview`
- **Purpose**: Summarizes a user interview transcript, extracting key themes and quotes.
- **Usage**: `/pd:summarize-interview --file=<path>`
- **Output**: An interview summary report.

### `/pd:analyze-data`
- **Purpose**: Answers a natural language question about a structured data file (e.g., CSV).
- **Usage**: `/pd:analyze-data --file=<path> --query="..."`
- **Output**: A data analysis report with the answer and methodology.

### `/pd:generate-personas`
- **Purpose**: Creates user personas from a feedback summary.
- **Usage**: `/pd:generate-personas --from=<summary_file>`
- **Output**: A document containing 2-3 user personas.

### `/pd:research-trends`
- **Purpose**: Researches and summarizes market trends on a given topic using web search.
- **Usage**: `/pd:research-trends --topic="..."`
- **Output**: A market trend report with key findings and sources.

---

## Advanced Planning Commands

Commands to assist with the details of planning and defining features.

### `/pd:draw-diagram`
- **Purpose**: Creates a PlantUML or Mermaid diagram from a text description.
- **Usage**: `/pd:draw-diagram --type=<type> --desc="..."`
- **Output**: A markdown file containing the diagram code.

### `/pd:assess-feasibility`
- **Purpose**: Flags technically complex or risky requirements in a PRD.
- **Usage**: `/pd:assess-feasibility --for=<prd_name>`
- **Output**: An assessment report.

### `/pd:write-stories`
- **Purpose**: Writes detailed user stories and acceptance criteria for a PRD.
- **Usage**: `/pd:write-stories --for=<prd_name>`
- **Output**: An updated PRD or a separate user story document.

### `/pd:identify-risks`
- **Purpose**: Identifies potential market, technical, or dependency risks for an initiative.
- **Usage**: `/pd:identify-risks --for=<initiative_name>`
- **Output**: A risk assessment report.

---

## Advanced Launch Commands

Commands to help with the go-to-market and launch process.

### `/pd:generate-update`
- **Purpose**: Create a concise stakeholder update report for an initiative.
- **Usage**: `/pd:generate-update --for=<initiative_name>`
- **Output**: A stakeholder update report.

### `/pd:track-kpis`
- **Purpose**: Get a status report on an initiative's KPIs.
- **Usage**: `/pd:track-kpis --for=<initiative_name>`
- **Output**: A KPI status report.

### `/pd:draft-release-notes`
- **Purpose**: Generates draft release notes for a feature based on its PRD.
- **Usage**: `/pd:draft-release-notes --for=<prd_name>`
- **Output**: A draft of release notes.

### `/pd:generate-faq`
- **Purpose**: Creates a list of FAQs for a new feature.
- **Usage**: `/pd:generate-faq --for=<prd_name>`
- **Output**: A FAQ document.

### `/pd:simplify-update`
- **Purpose**: Tailors a stakeholder update for a specific audience.
- **Usage**: `/pd:simplify-update --for=<initiative_name> --audience=...`
- **Output**: A rewritten, audience-specific update.

### `/pd:brainstorm-names`
- **Purpose**: Brainstorms creative names for a new feature.
- **Usage**: `/pd:brainstorm-names --desc="..."`
- **Output**: A list of potential names.
