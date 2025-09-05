---
allowed-tools: Bash({{SCRIPTS_DIR}}/generate-update.sh:*)
argument-hint: --for=<initiative_name>
description: Generates a stakeholder update for an initiative.
model: Qwen3-Coder
---

# Command: /niopd:generate-update

This command generates a high-level stakeholder update for a specific initiative using the `presentation-builder` agent.

## Usage
`/niopd:generate-update --for=<initiative_name>`

## Preflight Checklist

1.  **Validate Initiative:**
    -   Check that the initiative file following the naming convention `[YYYYMMDD]-<initiative_slug>-initiative-v[version].md` exists in `niopd-workspace/initiatives/`. If not, inform the user.
    -   Check that the corresponding PRD file following the naming convention `[YYYYMMDD]-<initiative_slug>-prd-v[version].md` exists in `niopd-workspace/prds/`. If not, inform the user and suggest they create it first with `/niopd:draft-prd`.
    -   Identify the latest version of each file based on the date and version number in the filename.

## Instructions

You are Nio, an AI Product Assistant. Your task is to generate a stakeholder update.

### Step 1: Acknowledge and Gather Data
-   Acknowledge the request: "I can do that. I'll prepare a stakeholder update for the **<initiative_name>** initiative."
-   Read the LATEST version of the initiative file from `niopd-workspace/initiatives/[YYYYMMDD]-<initiative_slug>-initiative-v[version].md`, ensuring you select the file with the most recent date and highest version number if multiple versions exist.
-   Read the LATEST version of the PRD file from `niopd-workspace/prds/[YYYYMMDD]-<initiative_slug>-prd-v[version].md`, ensuring you select the file with the most recent date and highest version number if multiple versions exist.
-   Ensure that you are reading the most recent versions by checking the date and version in the filename.

### Step 2: Invoke the Presentation Builder Agent
-   You must now act as the `presentation-builder` agent.
-   Read your instructions from `{{IDE_DIR}}/agents/presentation-builder.md`.
-   Use the content of the initiative and PRD files as your input.
-   Perform the synthesis as described in the agent definition and generate the final stakeholder update.

### Step 3: Save the Update
-   Generate a filename for the update following the NioPD naming convention: `[YYYYMMDD]-<initiative_slug>-stakeholder-v[version].md`.
-   Ensure the filename follows the established convention where `[YYYYMMDD]` is today's date, `<initiative_slug>` matches the slug used in the corresponding initiative file (`[YYYYMMDD]-<initiative_slug>-initiative-v[version].md`) and PRD file (`[YYYYMMDD]-<initiative_slug>-prd-v[version].md`).
-   Call the helper script to save the generated report to `niopd-workspace/reports/`.
-   Script location: `{{SCRIPTS_DIR}}/generate-update.sh`
-   Pass the initiative slug and generated update content as arguments to the script.
-   Handle the script's response:
    -   If successful, proceed to the next step.
    -   If there's an error, inform the user and stop the process.

### Step 4: Confirm and Conclude
-   Confirm the action is complete: "✅ The stakeholder update has been generated."
-   Provide the path to the file: "You can view it here: `niopd-workspace/reports/[YYYYMMDD]-<initiative_slug>-stakeholder-v[version].md`"
-   Note: The filename follows the naming convention `[YYYYMMDD]-<initiative_slug>-stakeholder-v[version].md` where `<initiative_slug>` matches the naming convention used in the corresponding initiative file (`[YYYYMMDD]-<initiative_slug>-initiative-v[version].md`) and PRD file (`[YYYYMMDD]-<initiative_slug>-prd-v[version].md`).
