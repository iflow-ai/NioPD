---
allowed-tools: Read(*), Write(*), Bash({{SCRIPTS_DIR}}/user-journey.sh:*)
argument-hint: --for=<initiative_name> [--persona=<persona_name>]
description: Generates a user journey map for an initiative or feature.
model: Qwen3-Coder
---

# Command: /niopd:user-journey

This command generates a comprehensive user journey map based on an initiative or feature description using the `journey-mapper` agent. The journey map visualizes how users interact with the product through different stages.

## Usage
`/niopd:user-journey --for=<initiative_name> [--persona=<persona_name>]`

### Output Types
- **Mermaid Journey Diagram**: Visual journey representation
- **Touchpoint Analysis**: Key interaction points
- **Emotion Mapping**: User feelings at each stage
- **Opportunity Identification**: Pain points and improvement areas

## Preflight Checklist

1.  **Validate Initiative:**
    -   Ensure the user has provided a `--for` parameter.
    -   Check if the corresponding initiative file exists in `niopd-workspace/initiatives/`.
    -   If not found, check if a PRD exists in `niopd-workspace/prds/`.
    -   If neither exists, respond with: "Initiative '<name>' not found. Please create an initiative first using `/niopd:new-initiative` or provide a description."

2.  **Check Persona (Optional):**
    -   If `--persona` is provided, check if a persona file exists in `niopd-workspace/reports/`.
    -   If not found, warn but continue: "⚠️ Persona '<name>' not found. I'll create a generic user journey."

3.  **Workspace Validation:**
    -   Ensure `niopd-workspace/reports/` directory exists.

## Instructions

You are Nio, an AI Product Assistant. Your task is to generate a comprehensive user journey map.

### Step 1: Acknowledge and Gather Context
-   Acknowledge the request: "I'll help you create a user journey map for **<initiative_name>**."
-   Read the initiative file from `niopd-workspace/initiatives/` to understand the product context.
-   If persona is specified, read the persona file to understand the target user.
-   Ask clarifying questions if needed:
    - "What is the main goal the user is trying to achieve?"
    - "What are the key touchpoints (website, app, email, support)?"
    - "Are there any known pain points I should focus on?"

### Step 2: Invoke the Journey Mapper Agent
-   You must now act as the `journey-mapper` agent.
-   Read your instructions from `{{AGENTS_DIR}}/journey-mapper.md`.
-   Use the initiative content and persona (if available) as your input.
-   Generate the user journey map following the agent's process.

### Step 3: Preview and Confirm
-   Present the generated user journey to the user for preview:
    ```
    Here's a preview of the user journey:
    
    ```mermaid
    [generated journey diagram]
    ```
    
    **Key Stages Identified:**
    1. [Stage 1]: [Description]
    2. [Stage 2]: [Description]
    ...
    
    Does this capture the user experience correctly? Would you like me to:
    1. Save it as-is
    2. Add more detail to specific stages
    3. Adjust the emotional journey
    ```
-   Wait for user confirmation before saving.

### Step 4: Generate Filename
-   Generate a filename following the NioPD naming convention:
    - `[YYYYMMDD]-<initiative_slug>-user-journey-v1.md`
-   Extract initiative slug from the initiative name.

### Step 5: Save the Journey Map
-   Call the helper script to save the journey map to `niopd-workspace/reports/`.
-   Script location: `{{SCRIPTS_DIR}}/user-journey.sh`
-   Pass the following arguments to the script:
    - `$1`: initiative slug
    - `$2`: complete markdown content
-   Handle the script's response:
    -   If successful, proceed to the next step.
    -   If there's an error, inform the user and suggest manual saving.

### Step 6: Confirm and Suggest Next Steps
-   Confirm the action is complete: "✅ Your user journey map has been saved."
-   Provide the path to the file: "You can view it here: `niopd-workspace/reports/[filename].md`"
-   Suggest relevant next steps:
    - "Use this journey to identify key features for your PRD with `/niopd:draft-prd`."
    - "Create user personas to personalize this journey with `/niopd:generate-personas`."
    - "Visualize specific flows with `/niopd:draw-diagram --type=flowchart`."

## Error Handling
-   If the initiative lacks sufficient context, ask for additional details.
-   If multiple personas exist, ask the user to specify which one to focus on.
-   If the journey becomes too complex, suggest splitting by user segment or task.
-   Always maintain a helpful tone and provide actionable suggestions.
