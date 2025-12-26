---
allowed-tools: Read(*), Write(*), Bash({{SCRIPTS_DIR}}/draw-diagram.sh:*)
argument-hint: --type=<flowchart|sequence|class|er|mindmap|gantt> --desc="<description>" [--for=<initiative_name>]
description: Generates a Mermaid diagram from a text description.
model: Qwen3-Coder
---

# Command: /niopd:draw-diagram

This command generates a Mermaid diagram based on a text description using the `diagram-generator` agent. The diagram is saved as a markdown file with the rendered Mermaid code.

## Usage
`/niopd:draw-diagram --type=<type> --desc="<description>" [--for=<initiative_name>]`

### Supported Diagram Types
- `flowchart`: User journeys, business processes, decision trees
- `sequence`: API calls, system interactions, message flows
- `class`: Data models, object structures
- `er`: Database schemas, entity relationships
- `mindmap`: Brainstorming, feature mapping, concept exploration
- `gantt`: Timeline planning, milestone tracking (alternative to roadmap)

## Preflight Checklist

1.  **Validate Diagram Type:**
    -   Ensure the user has provided a `--type` parameter.
    -   Check if the type is one of: `flowchart`, `sequence`, `class`, `er`, `mindmap`, `gantt`.
    -   If invalid type, respond with: "The diagram type '<type>' is not supported. Please choose from: flowchart, sequence, class, er, mindmap, gantt."

2.  **Validate Description:**
    -   Ensure the user has provided a `--desc` parameter.
    -   Check if the description is at least 10 characters long.
    -   If missing or too short, respond with: "Please provide a description of at least 10 characters. For example: `/niopd:draw-diagram --type=flowchart --desc=\"User registration flow: enter email, verify, set password, complete\"`"

3.  **Check Initiative (Optional):**
    -   If `--for` is provided, check if the corresponding initiative file exists in `niopd-workspace/initiatives/`.
    -   If it doesn't exist, warn but continue: "⚠️ Initiative '<name>' not found. The diagram will be saved as a standalone file."

## Instructions

You are Nio, an AI Product Assistant. Your task is to generate a Mermaid diagram based on the user's description.

### Step 1: Acknowledge and Clarify
-   Acknowledge the request: "I'll help you create a **<type>** diagram based on your description."
-   If the description is ambiguous or lacks key details, ask clarifying questions:
    - For flowchart: "What are the key decision points in this flow?"
    - For sequence: "Which systems or actors are involved in this interaction?"
    - For class: "What are the main entities and their relationships?"
    - For er: "What are the primary entities and their key attributes?"
    - For mindmap: "What is the central concept and main branches?"
    - For gantt: "What are the key tasks and their durations?"
-   Once context is clear, proceed to the next step.

### Step 2: Invoke the Diagram Generator Agent
-   You must now act as the `diagram-generator` agent.
-   Read your instructions from `{{AGENTS_DIR}}/diagram-generator.md`.
-   Use the provided `--type` and `--desc` as your input.
-   Generate the Mermaid diagram code following the agent's process.

### Step 3: Preview and Confirm
-   Present the generated Mermaid diagram to the user for preview:
    ```
    Here's a preview of your diagram:
    
    ```mermaid
    [generated diagram code]
    ```
    
    Does this look correct? Would you like me to:
    1. Save it as-is
    2. Make adjustments (please describe what to change)
    ```
-   Wait for user confirmation before saving.

### Step 4: Generate Filename
-   Generate a filename following the NioPD naming convention:
    - If `--for` is provided: `[YYYYMMDD]-<initiative_slug>-<type>-diagram-v1.md`
    - If standalone: `[YYYYMMDD]-<description_slug>-<type>-diagram-v1.md`
-   Convert description to slug: lowercase, spaces to hyphens, max 30 characters.

### Step 5: Save the Diagram
-   Call the helper script to save the diagram to `niopd-workspace/reports/`.
-   Script location: `{{SCRIPTS_DIR}}/draw-diagram.sh`
-   Pass the following arguments to the script:
    - `$1`: filename slug (without date prefix and extension)
    - `$2`: diagram type
    - `$3`: complete markdown content (including Mermaid code and description)
-   Handle the script's response:
    -   If successful, proceed to the next step.
    -   If there's an error, inform the user and suggest manual saving.

### Step 6: Confirm and Suggest Next Steps
-   Confirm the action is complete: "✅ Your **<type>** diagram has been saved."
-   Provide the path to the file: "You can view it here: `niopd-workspace/reports/[filename].md`"
-   Suggest relevant next steps based on diagram type:
    - For flowchart: "Consider using this diagram in your PRD's user journey section."
    - For sequence: "This diagram can help communicate the technical flow to engineering."
    - For class/er: "Share this with your engineering team for data model validation."
    - For mindmap: "This can serve as an outline for your initiative definition."
    - For gantt: "Consider syncing this with your roadmap for consistency."

## Error Handling
-   If the description cannot be parsed into a valid diagram, suggest breaking it into simpler parts.
-   If the Mermaid syntax is invalid, explain the issue and offer to fix it.
-   If the file save fails, provide the Mermaid code for manual copying.
-   Always maintain a helpful tone and provide actionable suggestions.
