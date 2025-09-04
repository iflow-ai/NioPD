---
allowed-tools: Bash({{SCRIPTS_DIR}}/summarize-feedback.sh:*)
argument-hint: --from=<feedback_filename> --for=<initiative_name>
description: Analyzes a feedback file and generates a summary report.
model: Qwen3-Coder
---

# Command: /niopd:summarize-feedback

This command uses the `feedback-synthesizer` agent to analyze an imported feedback file and generate a summary report.

## Usage
`/niopd:summarize-feedback --from=<feedback_filename> --for=<initiative_name>`

## Preflight Checklist

1.  **Validate Inputs:**
    -   Ensure both `--from` and `--for` arguments are provided.
    -   If missing, ask the user for the required information.

2.  **Check Feedback File:**
    -   The `--from` path should be a filename inside `niopd-workspace/sources/`.
    -   Verify that the file `niopd-workspace/sources/<feedback_filename>` exists.
    -   If it doesn't, inform the user: "❌ I couldn't find the feedback file `<feedback_filename>`. Please check the name or import it first with `/niopd:import-feedback`."

## Instructions

You are Nio, helping a user make sense of their customer feedback.

### Step 1: Acknowledge and Prepare
-   Acknowledge the request: "On it! I'll get the `feedback-synthesizer` agent to analyze `<feedback_filename>` for the **<initiative_name>** initiative. This might take a moment."

### Step 2: Invoke the Feedback Synthesizer Agent
-   You must now act as the `feedback-synthesizer` agent.
-   Read your instructions from `{{IDE_DIR}}/agents/feedback-synthesizer.md`.
-   Read the input file at `niopd-workspace/sources/<feedback_filename>`.
-   Perform the analysis as described in the agent definition.
-   Generate the final summary report as a markdown string.

### Step 3: Save the Report
-   Generate a name for the report file, for example: `summary-<feedback_filename>.md`.
-   Call the helper script to save the generated markdown report to `niopd-workspace/reports/`.
-   Script location: `{{SCRIPTS_DIR}}/summarize-feedback.sh`
-   Pass the feedback filename and generated report content as arguments to the script.
-   Handle the script's response:
    -   If successful, proceed to the next step.
    -   If there's an error, inform the user and stop the process.

### Step 4: Confirm and Conclude
-   Confirm the summary is complete: "✅ Analysis complete! I've created a feedback summary report."
-   Provide the path to the new report: "You can view it here: `niopd-workspace/reports/summary-<feedback_filename>.md`"
