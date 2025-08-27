# NioPD Agents Directory

This directory contains all the specialized AI agents used by the NioPD system. Each agent is defined by a markdown file that provides detailed instructions for a specific task.

## Agent Structure

Each agent file follows a consistent structure:

```
---
name: agent-name
description: Brief description of what the agent does
tools: [List of tools the agent is allowed to use]
model: claude-3-5-sonnet-20240620
color: 🤖
---

# Agent: {{agent-name}}

## Purpose
A detailed explanation of what this agent is designed to do.

## Input
Description of what input the agent expects.

## Process
Step-by-step instructions on how the agent should process the input.

## Output
Description of what the agent should produce as output.

## Error Handling
Guidance on how the agent should handle various error conditions.

```

## Available Agents

### 🤖 [niopd-competitor-analyzer.md](niopd-competitor-analyzer.md)
Analyzes a competitor's website to extract key features and value propositions.

### 🤖 [niopd-data-analyst.md](niopd-data-analyst.md)
Performs analysis on structured data files (e.g., CSV) based on natural language queries.

### 🤖 [niopd-feedback-synthesizer.md](niopd-feedback-synthesizer.md)
Processes raw user feedback to identify key themes, pain points, and feature requests.

### 🤖 [niopd-interview-summarizer.md](niopd-interview-summarizer.md)
Reads user interview transcripts to extract critical insights and quotes.

### 🤖 [niopd-kpi-tracker.md](niopd-kpi-tracker.md)
Tracks key performance indicators for initiatives and reports on progress.

### 🤖 [niopd-market-researcher.md](niopd-market-researcher.md)
Researches and summarizes market trends on a given topic using web search.

### 🤖 [niopd-persona-generator.md](niopd-persona-generator.md)
Creates detailed user personas from synthesized user feedback.

### 🤖 [niopd-presentation-builder.md](niopd-presentation-builder.md)
Creates concise project updates for business stakeholders.

### 🤖 [niopd-roadmap-generator.md](niopd-roadmap-generator.md)
Generates visual product roadmaps from initiative files.

### 🤖 [Nio.md](Nio.md)
Acts as a senior product manager supervisor to guide the user through product design.

## Creating New Agents

To create a new agent:

1. Create a new markdown file with the naming convention `niopd-[agent-name].md`
2. Follow the structure outlined above
3. Ensure the agent has a single, clear purpose
4. Define clear input, process, and output sections
5. Include error handling guidance
6. Add the agent to this README with a brief description

## Best Practices

1. **Single Responsibility**: Each agent should have one clearly defined purpose
2. **Clear Instructions**: Provide detailed step-by-step instructions for complex processes
3. **Consistent Formatting**: Use the same structure and formatting across all agents
4. **Error Handling**: Include guidance for handling common error scenarios
5. **Tool Usage**: Specify only the tools that are necessary for the agent's function