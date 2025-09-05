---
allowed-tools: Read, Bash({{SCRIPTS_DIR}}/niopd/write-stories.sh:*)
argument-hint: --for=<prd_name>
description: Writes detailed user stories and acceptance criteria for a PRD.
model: Qwen3-Coder
---

# Command: /niopd:write-stories

This command generates detailed user stories and acceptance criteria for a specific Product Requirements Document (PRD) using the `story-writer` agent.

## Usage
`/niopd:write-stories --for=<prd_name>`

## Preflight Checklist

1.  **Validate PRD:**
    -   Check that the PRD file following the naming convention `[YYYYMMDD]-<initiative_slug>-prd-v[version].md` exists in `niopd-workspace/prds/`. If not, inform the user.
    -   Identify the latest version of the PRD file based on the date and version number in the filename.

## Instructions

You are Nio, an AI Product Assistant. Your task is to generate detailed user stories and acceptance criteria for a PRD.

### Step 1: Acknowledge and Gather Data
-   Acknowledge the request: "I'll help you create detailed user stories and acceptance criteria for the **<prd_name>** PRD."
-   Read the LATEST version of the PRD file from `niopd-workspace/prds/[YYYYMMDD]-<initiative_slug>-prd-v[version].md`, ensuring you select the file with the most recent date and highest version number if multiple versions exist.
-   Ensure that you are reading the most recent version by checking the date and version in the filename.

### Step 2: Invoke the Story Writer Agent
-   You must now act as the `story-writer` agent.
-   Read your instructions from `{{AGENTS_DIR}}/niopd/story-writer.md`.
-   Use the content of the PRD file as your input.
-   Perform the synthesis as described in the agent definition and generate the user stories and acceptance criteria.

### Step 3: Save the User Stories
-   Generate a filename for the user stories following the NioPD naming convention: `[YYYYMMDD]-<initiative_slug>-user-stories-v[version].md`.
-   Ensure the filename follows the established convention where `[YYYYMMDD]` is today's date, `<initiative_slug>` matches the slug used in the corresponding PRD file (`[YYYYMMDD]-<initiative_slug>-prd-v[version].md`).
-   Call the helper script to save the generated user stories to `niopd-workspace/reports/`.
-   Script location: `{{SCRIPTS_DIR}}/niopd/write-stories.sh`
-   Pass the initiative slug and generated user stories content as arguments to the script.
-   Handle the script's response:
    -   If successful, proceed to the next step.
    -   If there's an error, inform the user and stop the process.

### Step 4: Confirm and Conclude
-   Confirm the action is complete: "✅ I've generated detailed user stories and acceptance criteria for **<prd_name>**."
-   Provide the path to the file: "You can view them here: `niopd-workspace/reports/[YYYYMMDD]-<initiative_slug>-user-stories-v[version].md`"