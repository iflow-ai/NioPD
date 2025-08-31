# AGENTS.md for the NioPD System

This document provides guidance for AI agents working with the NioPD system.

## 1. System Overview

NioPD is an AI-powered assistant system for Product Managers. It is designed to automate and assist with the core PM workflow, from defining high-level initiatives to tracking success metrics.

The system is file-based and command-driven. All data is stored in markdown files within the `niopd-workspace/` directory, and the AI's behavior is guided by a series of command prompts and agent definitions.

## 2. Core Philosophy: Agent-Driven Synthesis

NioPD relies on specialized agents to perform complex synthesis tasks. Unlike a general-purpose chatbot, NioPD uses agents to transform one type of document into another (e.g., turning feedback into a PRD, or turning initiatives into a roadmap).

Your primary role as an agent is to follow the instructions defined in the `commands/niopd/` and `agents/niopd/` directories to execute these transformations accurately.

## 3. Available Agents

### 🤖 `competitor-analyzer`
- **Purpose:** To analyze a competitor's website and produce a structured summary of their product, pricing, and positioning.
- **Input:** A single URL for a competitor's homepage.
- **Output:** A structured markdown competitor analysis report with core value proposition, features, target audience, and pricing model.

### 🤖 `data-analyst`
- **Purpose:** To analyze structured data from a file (like CSV) and answer natural language questions about that data.
- **Input:** A file containing structured data and a natural language query.
- **Output:** A markdown data analysis report with direct answers and supporting methodology.

### 🤖 `feedback-synthesizer`
- **Purpose:** To process raw user feedback and identify key themes, pain points, and feature requests.
- **Input:** A file containing user feedback.
- **Output:** A structured markdown summary of the feedback with themes, pain points, and user quotes.

### 🤖 `interview-summarizer`
- **Purpose:** To read user interview transcripts and extract critical insights, including user needs, pain points, and direct quotes.
- **Input:** A text file containing the full transcript of a user interview.
- **Output:** A markdown interview summary with key takeaways, core themes, and verbatim quotes.

### 🤖 `kpi-tracker`
- **Purpose:** To report on the status of an initiative's Key Performance Indicators (KPIs).
- **Input:** A single initiative file.
- **Output:** A status report listing each KPI, its target, and its current value.

### 🤖 `market-researcher`
- **Purpose:** To use web search to find and summarize recent articles and reports about a specific topic, identifying key market trends.
- **Input:** A string representing the research topic.
- **Output:** A markdown market trend report with key trends, summary, and sources.

### 🤖 `persona-generator`
- **Purpose:** To read a summary of user feedback and create a set of rich, detailed user personas.
- **Input:** A feedback summary report file (output of the feedback-synthesizer agent).
- **Output:** A markdown report with 2-3 detailed user personas including goals, pain points, and quotes.

### 🤖 `presentation-builder`
- **Purpose:** To create concise, high-level project updates for business stakeholders.
- **Input:** An initiative file and its corresponding PRD file.
- **Output:** A scannable markdown report summarizing the project's status, goals, and key deliverables.

### 🤖 `roadmap-generator`
- **Purpose:** To create a visual, high-level product roadmap from all active initiatives.
- **Input:** All files in the `niopd-workspace/initiatives/` directory.
- **Output:** A markdown file containing a Mermaid Gantt chart.

### 🤖 `Nio`
- **Purpose:** To act as a senior product manager supervisor and mentor. It guides the user through product design challenges using Socratic questioning and provides advice only when explicitly requested. It also silently archives the conversation.
- **Input:** Initiated by the `/niopd:hi` command. The input is the ongoing conversation with the user.
- **Output:** A guided conversation, and archived files (summaries, research, PRDs) in the `niopd-workspace` directory.

## 4. The Command Workflow

The entire NioPD system is operated through a series of `/niopd:` commands. Each command has a corresponding definition file in `.claude/commands/niopd/`.

When a user runs a command (e.g., `/niopd:draft-prd`), you must:
1.  Read the corresponding command file (e.g., `.claude/commands/niopd/draft-prd.md`).
2.  Follow the **Preflight Checklist** to validate inputs.
3.  Follow the **Instructions** step-by-step. This may involve invoking one of the agents listed above.
4.  Produce the output file in the location specified by the command.

## 5. Development and Testing Instructions

### How to Extend NioPD
- **Adding a new command:** Create a new `.md` file in `.claude/commands/niopd/`.
- **Adding a new agent:** Create a new agent definition in `.claude/agents/niopd/`. The new agent should have a single, clear purpose.
- **Adding a new template:** Add a new template file to `.claude/templates/`.

### Testing
- The current implementation of NioPD is file-based and designed for simulation.
- To test any workflow, you must first create the necessary prerequisite files in the `niopd-workspace/` subdirectories (e.g., create an initiative file before you can test drafting a PRD).
- After running a test, always verify the content of the output file to ensure the agent and command worked as expected.
- **Crucially, always clean up test artifacts** by deleting the files you created in the `niopd-workspace/` directories before submitting your work.