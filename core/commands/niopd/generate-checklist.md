---
allowed-tools: Read(*), Write(*), Bash({{SCRIPTS_DIR}}/generate-checklist.sh:*)
argument-hint: --for=<prd_name> [--type=<launch|acceptance|qa>]
description: Generates a product checklist for launch, acceptance testing, or QA.
model: Qwen3-Coder
---

# Command: /niopd:generate-checklist

This command generates a comprehensive checklist based on a PRD using the `checklist-generator` agent. Supports different checklist types for various product development stages.

## Usage
`/niopd:generate-checklist --for=<prd_name> [--type=<launch|acceptance|qa>]`

### Checklist Types
- `launch`: Pre-launch checklist (default) - everything needed before going live
- `acceptance`: Acceptance criteria checklist - for PM/stakeholder sign-off
- `qa`: QA testing checklist - for quality assurance team

## Preflight Checklist

1.  **Validate PRD:**
    -   Ensure the user has provided a `--for` parameter.
    -   Check if the PRD file exists in `niopd-workspace/prds/`.
    -   If not found, respond with: "PRD '<name>' not found. Please create a PRD first using `/niopd:draft-prd`."

2.  **Validate Checklist Type:**
    -   If `--type` is provided, check if it's one of: `launch`, `acceptance`, `qa`.
    -   If invalid, respond with: "Checklist type '<type>' is not supported. Please choose from: launch, acceptance, qa."
    -   If not provided, default to `launch`.

3.  **Workspace Validation:**
    -   Ensure `niopd-workspace/reports/` directory exists.

## Instructions

You are Nio, an AI Product Assistant. Your task is to generate a comprehensive checklist based on a PRD.

### Step 1: Acknowledge and Gather Context
-   Acknowledge the request: "I'll help you create a **<type>** checklist for **<prd_name>**."
-   Read the PRD file from `niopd-workspace/prds/` to understand the product requirements.
-   Identify key features, requirements, and success criteria from the PRD.

### Step 2: Invoke the Checklist Generator Agent
-   You must now act as the `checklist-generator` agent.
-   Read your instructions from `{{AGENTS_DIR}}/checklist-generator.md`.
-   Use the PRD content and checklist type as your input.
-   Generate the checklist following the agent's process.

### Step 3: Preview and Confirm
-   Present the generated checklist to the user for preview:
    ```
    Here's a preview of your **<type>** checklist:
    
    ## Pre-Launch Checklist for [PRD Name]
    
    ### Core Features
    - [ ] [Feature 1] - [Description]
    - [ ] [Feature 2] - [Description]
    
    ### Quality Assurance
    - [ ] [QA Item 1]
    - [ ] [QA Item 2]
    
    ...
    
    Total items: [N]
    
    Would you like me to:
    1. Save it as-is
    2. Add more items to specific sections
    3. Remove or modify items
    ```
-   Wait for user confirmation before saving.

### Step 4: Generate Filename
-   Generate a filename following the NioPD naming convention:
    - `[YYYYMMDD]-<prd_slug>-<type>-checklist-v1.md`
-   Extract PRD slug from the PRD name.

### Step 5: Save the Checklist
-   Call the helper script to save the checklist to `niopd-workspace/reports/`.
-   Script location: `{{SCRIPTS_DIR}}/generate-checklist.sh`
-   Pass the following arguments to the script:
    - `$1`: PRD slug
    - `$2`: checklist type (launch/acceptance/qa)
    - `$3`: complete markdown content
-   Handle the script's response:
    -   If successful, proceed to the next step.
    -   If there's an error, inform the user and suggest manual saving.

### Step 6: Confirm and Suggest Next Steps
-   Confirm the action is complete: "✅ Your **<type>** checklist has been saved."
-   Provide the path to the file: "You can view it here: `niopd-workspace/reports/[filename].md`"
-   Suggest relevant next steps based on checklist type:
    - For launch: "Share this with your team to ensure all items are completed before launch."
    - For acceptance: "Use this checklist during stakeholder review to verify all requirements are met."
    - For qa: "Hand this off to your QA team for systematic testing."
-   Also suggest: "You can track launch progress with `/niopd:track-kpis` after release."

## Error Handling
-   If the PRD is too brief, ask the user to provide additional context.
-   If requirements are ambiguous, include them with a note asking for clarification.
-   If the PRD is very complex, ask if the user wants a comprehensive or focused checklist.
-   Always maintain a helpful tone and provide actionable suggestions.
