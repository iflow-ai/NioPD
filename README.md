# NioPD: The AI-Powered Product Management Assistant

NioPD is a collection of **Claude Code workflows**, designed specifically to streamline the product management lifecycle. As an AI-powered system, it helps Product Managers turn raw ideas, messy feedback, and complex data into structured, actionable plans, freeing them up to focus on strategy and users.

---

## Table of Contents

- [The Challenge for PMs](#the-challenge-for-pms)
- [The NioPD Workflow](#the-niopd-workflow)
- [What Makes NioPD Different?](#what-makes-niopd-different)
- [Get Started Now](#get-started-now)
- [System Architecture](#system-architecture)
- [Command Reference](#command-reference)
- [Example Flow](#example-flow)

---

## The Challenge for PMs

Product Managers today are drowning in data and administrative work:
- **Unstructured Feedback:** Juggling notes from Slack, Intercom, surveys, and user interviews.
- **Constant Research:** Manually tracking competitors, market trends, and data insights.
- **Endless Documentation:** Constantly writing and updating PRDs, roadmaps, and stakeholder reports.

NioPD is designed to automate this "work about work" so you can focus on what matters.

## The NioPD Workflow

NioPD guides you through a structured, repeatable process to take ideas from concept to a well-defined and launched feature.

```mermaid
graph TD
    A[1. Discovery & Research] --> B[2. Planning & Definition]
    B --> C[3. Reporting & Launch Prep]
```

## What Makes NioPD Different?

| Traditional PM Tooling | NioPD |
|------------------------|----------------------|
| Manual data synthesis | **AI-powered feedback & data analysis** |
| Manual market research | **Automated competitor & trend reports** |
| Writing docs from scratch | **Automated PRD & report drafting** |
| Static, hard-to-update roadmaps | **Dynamic roadmaps from your plans** |

## Get Started Now

NioPD is a file-based system that runs within a local clone of its repository.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/8421bit/NioPD.git
    cd NioPD
    ```

2.  **Explore the system**:
    The core of the NioPD system is contained within the `NioPD/.iflow` directory. You can interact with the system by issuing `/pd:` commands to a compatible AI agent (like me).

3.  **Start your first initiative**:
    ```
    /pd:new-initiative "My First Feature"
    ```

## System Architecture

NioPD is a self-contained system. The user-facing documentation lives in the `NioPD/` directory, while the core system logic lives inside `NioPD/.iflow/`.

```
NioPD/
├── README.md          # This file
├── AGENTS.md          # Guide for how NioPD's AI agents work
└── .iflow/            # Core system implementation
    ├── agents/        # Definitions for specialized PM agents
    ├── commands/      # Definitions for all /pd: commands
    ├── data/          # Your product data lives here
    └── templates/     # Reusable templates for PRDs, etc.
```

## Command Reference

### Core Workflow
- `/pd:new-initiative "<name>"`: Start a new high-level product initiative.
- `/pd:import-feedback --from=<path> --for=<initiative>`: Import a file of user feedback.
- `/pd:summarize-feedback --from=<file> --for=<initiative>`: Use an AI agent to analyze a feedback file.
- `/pd:draft-prd --for=<initiative>`: Automatically generate a PRD draft.
- `/pd:edit-prd <prd_name>`: Get instructions to manually edit a PRD.
- `/pd:update-roadmap`: Generate or update the product roadmap.

### Advanced: Strategy & Discovery
- `/pd:analyze-competitor --url=<url>`: Analyzes a competitor's website.
- `/pd:summarize-interview --file=<path>`: Summarizes a user interview transcript.
- `/pd:analyze-data --file=<path> --query="..."`: Answers a natural language question about a data file.
- `/pd:generate-personas --from=<summary>`: Creates user personas from a feedback summary.
- `/pd:research-trends --topic="..."`: Researches and summarizes market trends on a topic.

### Advanced: Planning & Definition
- `/pd:draw-diagram --type=<type> --desc="..."`: Creates a PlantUML or Mermaid diagram from a description.
- `/pd:assess-feasibility --for=<prd>`: Flags technically complex requirements in a PRD.
- `/pd:write-stories --for=<prd>`: Writes detailed user stories and acceptance criteria for a PRD.
- `/pd:identify-risks --for=<prd>`: Identifies potential risks for an initiative.

### Advanced: Execution & Launch
- `/pd:generate-update --for=<initiative>`: Create a concise stakeholder update report.
- `/pd:track-kpis --for=<initiative>`: Get a status report on an initiative's KPIs.
- `/pd:draft-release-notes --for=<prd>`: Generates draft release notes for a feature.
- `/pd:generate-faq --for=<prd>`: Creates a list of FAQs for a new feature.
- `/pd:simplify-update --for=<initiative> --audience=...`: Tailors a stakeholder update for a specific audience.
- `/pd:brainstorm-names --desc="..."`: Brainstorms names for a new feature.

## Example Flow

Here's how you might use NioPD to research and plan a new feature:

1.  **Research the market:**
    `/pd:research-trends --topic="AI-powered data analysis tools"`

2.  **Analyze a competitor:**
    `/pd:analyze-competitor --url="https://www.competitor.com"`

3.  **Define the initiative:**
    `/pd:new-initiative "Intelligent Analysis Feature"`

4.  **Draft the PRD automatically:**
    `/pd:draft-prd --for="Intelligent Analysis Feature"`

5.  **Create a flowchart for the user experience:**
    `/pd:draw-diagram --type="flowchart" --desc="User uploads data, selects analysis type, then views results"`

---
This README provides a comprehensive overview for any Product Manager looking to use the NioPD system.

## Acknowledgments

NioPD was inspired by the innovative work done in the [Claude Code PM](https://github.com/automazeio/ccpm) project. We extend our gratitude to the creators and contributors of that project for their pioneering approach to AI-powered product management workflows.

While NioPD has evolved in its own direction with unique features and capabilities, the foundational concepts and vision from Claude Code PM have been instrumental in shaping this system.
