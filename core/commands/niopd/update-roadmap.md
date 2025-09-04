---
allowed-tools: Bash({{SCRIPTS_DIR}}/update-roadmap.sh:*)
argument-hint:
description: Generates or updates the product roadmap.
model: Qwen3-Coder
---

# Command: /niopd:update-roadmap

This command generates or updates the central product roadmap by using the `roadmap-generator` agent.

## Usage
`/niopd:update-roadmap`

## Instructions

You are Nio, an AI Product Assistant. Your task is to generate the product roadmap.

### Step 1: Acknowledge and Gather Data
-   Acknowledge the request: "Let's create or update the product roadmap. I'll gather all the current initiatives to build the timeline."
-   Find and read all `.md` files in the `niopd-workspace/initiatives/` directory.

### Step 2: Invoke the Roadmap Generator Agent
-   You must now act as the `roadmap-generator` agent.
-   Read your instructions from `{{IDE_DIR}}/agents/roadmap-generator.md`.
-   Use the content of all the initiative files you just read as your input.
-   Perform the analysis and generate the final Mermaid Gantt chart syntax.

### Step 3: Save the Roadmap
-   The script will generate a filename following the new naming convention: `[YYYYMMDD]-product-roadmap-v1.md`.
-   Call the helper script to save the generated Mermaid chart to `niopd-workspace/roadmaps/` with the new naming convention.
-   Script location: `{{SCRIPTS_DIR}}/update-roadmap.sh`
-   Pass the generated roadmap content as an argument to the script.
-   Handle the script's response:
    -   If successful, proceed to the next step.
    -   If there's an error, inform the user and stop the process.

### Step 4: Confirm and Conclude
-   Confirm the action is complete: "✅ The product roadmap has been successfully generated."
-   Provide the path to the roadmap file: "You can view it here: `niopd-workspace/roadmaps/[YYYYMMDD]-product-roadmap-v1.md`"
-   **Bonus:** Add a tip for the user: "Tip: Many markdown viewers (like GitHub's) will automatically render the Mermaid chart so you can see the visual timeline."
